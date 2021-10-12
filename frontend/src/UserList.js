import  React, { Component } from  'react';
import  UserService  from  './UserService';

const  userService  =  new  UserService();

class  UserList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            users: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        userService.getUsers().then(function (result) {
            self.setState({ users:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,pk){
        var  self  =  this;
        userService.deleteUser({pk :  pk}).then(()=>{
            var  newArr  =  self.state.users.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
            self.setState({users:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        userService.getUserByURL(this.state.nextPageURL).then((result) => {
            self.setState({ users:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
        <div  className="user--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Group</th>
                    <th>CreatedAt</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.users.map( c  =>
                    <tr  key={c.pk}>
                        <td>{c.pk}  </td>
                        <td>{c.username}</td>
                        <td>{c.group}</td>
                        <td>{c.createdAt}</td>
                        <td>
                        <button  className="btn btn-outline-danger mr-4" onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                        <a  className="btn btn-outline-success " href={"/user_add/" + c.pk}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary mr-4 mb-4"  onClick=  {  this.nextPage  }>Next</button>
            <a className="btn btn-primary mb-4" href="/user_add/">Add user</a>
        </div>
        );
    }
}

export  default  UserList;

