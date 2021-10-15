import React, { Component } from 'react';
import Service  from  './Service';

const  userService  =  new  Service();
const  groupService  =  new  Service();

class  UserCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.dest = 'user'
        this.state  = {
            groups: [],
            nextPageURL:  '',
            numPages: 0
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount(){
        var  self  =  this;

        var gr = [];

        await groupService.getAll('group').then((result) => {
            self.setState({ groups:  result.data, 
                            nextPageURL:  result.nextlink, 
                            numPages: result.numpages})
            gr.push.apply(gr, result.data)
        });
        
        for (let i=1; i<self.state.numPages; i++){
            await groupService.getByURL(this.state.nextPageURL, this.dest).then((result) => {
                    self.setState({ groups:  result.data, nextPageURL:  result.nextlink})
                    gr.push.apply(gr, result.data)
                    });
        }

        var sel=document.getElementById("mySelect");
            for (let i=0; i<gr.length; i++){
                var option = document.createElement('option');
                option.value = gr[i].name;
                option.text = gr[i].name;
                sel.appendChild(option);
            }


        const { match: { params } } =  this.props;
        if(params  &&  params.pk)
        {
            userService.getById(params.pk, this.dest).then((c)=>{
                this.refs.username.value  =  c.username;
                this.refs.group.value  =  c.group;
            })
        }
    }

    handleCreate(){
        userService.create(
            {
            "find": 0,
            "username":  this.refs.username.value,
            "group":  this.refs.group.value
            },
            this.dest).then((result)=>{
                    alert("User created!");
            }).catch((e)=>{
                    alert(e.response.data.username);
            });
    }

    handleUpdate(pk){
        userService.update(
            {
            "pk":  pk,
            "username":  this.refs.username.value,
            "group":  this.refs.group.value
            },
            this.dest).then((result)=>{
        
                alert("User updated!");
            }).catch((e)=>{
                alert(e.response.data.username);
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