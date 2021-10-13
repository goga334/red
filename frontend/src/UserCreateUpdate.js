import React, { Component } from 'react';
import UserService  from  './UserService';
import  GroupService  from  './GroupService';

const  userService  =  new  UserService();
const  groupService  =  new  GroupService();

class  UserCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            groups: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    nextPage(){
        var  self  =  this;
        groupService.getGroupByURL(this.state.nextPageURL).then((result) => {
            self.setState({ groups:  result.data, nextPageURL:  result.nextlink})
        });
    }

    componentDidMount(){
        var  self  =  this;

        var visited = [];
        var next = '';

        groupService.getGroups().then(function (result) {
            self.setState({ groups:  result.data, nextPageURL:  result.nextlink})
            next = self.state.nextPageURL
            let i = 0;
            while(!visited.includes(next) && i < 5){
            visited.push(next)
            groupService.getGroupByURL(self.state.nextPageURL).then((result) => {
                self.setState({ groups:  result.data, nextPageURL:  result.nextlink})
                groupService.getGroups().then(function (result) {
                    var sel=document.getElementById("mySelect");
            
                        for (let i=0; i<self.state.groups.length; i++){
                            var option = document.createElement('option');
                            option.value = self.state.groups[i].name;
                            option.text = self.state.groups[i].name;
                            sel.appendChild(option);
                        }
                    });
                next = self.state.nextPageURL;
                self.nextPage();
            });

                i+=1;

            }
        });

        groupService.getGroups().then(function (result) {
        var sel=document.getElementById("mySelect");

            for (let i=0; i<result.data.length; i++){
                var option = document.createElement('option');
                option.value = result.data[i].name;
                option.text = result.data[i].name;
                sel.appendChild(option);
            }
        });

        const { match: { params } } =  this.props;
        if(params  &&  params.pk)
        {
            userService.getUser(params.pk).then((c)=>{
                this.refs.username.value  =  c.username;
                this.refs.group.value  =  c.group;
            })
        }
    }

    handleCreate(){
        userService.createUser(
            {
            "username":  this.refs.username.value,
            "group":  this.refs.group.value
            }).then((result)=>{
                    alert("User created!");
            }).catch(()=>{
                    alert('There was an error! Please re-check your form.');
            });
    }

    handleUpdate(pk){
        userService.updateUser(
            {
            "pk":  pk,
            "username":  this.refs.username.value,
            "group":  this.refs.group.value
            }
            ).then((result)=>{
        
                alert("User updated!");
            }).catch(()=>{
                alert('There was an error! Please re-check your form.');
            })
        ;
    }

    handleSubmit(event) {
        const { match: { params } } =  this.props;
        if(params  &&  params.pk){
            this.handleUpdate(params.pk);
        }
        else
        {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {

        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Username:</label>
              <input className="form-control" type="text" ref='username' />

            <label>
              Group:</label><br></br>
              
                    
              <select id="mySelect"  class="form-select form-select-lg mb-3" size="1" ref='group'>   
              </select><br></br>

              <a className="btn btn-primary mt-4" onClick=  {this.handleSubmit} href="/user/" >Submit</a>

            </div>
          </form>
        );
        
    }
}
export default UserCreateUpdate;