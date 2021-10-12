import React, { Component } from 'react';
import UserService  from  './UserService';

const  userService  =  new  UserService();

class  UserCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
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
              Group:</label>
              <input className="form-control" type="text" ref='group'/>

              <a className="btn btn-primary mt-4" onClick=  {this.handleSubmit} href="/user/" >Submit</a>

            </div>
          </form>
        );
    }
}
export default UserCreateUpdate;