import  React, { Component } from  'react';
import UserService  from  './UserService';
import  GroupService  from  './GroupService';

const  userService  =  new  UserService();
const  groupService  =  new  GroupService();

class  GroupList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            groups: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        groupService.getGroups().then(function (result) {
            self.setState({ groups:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,groupToDelete){
        var  self  =  this;
        var usersInGroups = [];
        userService.getUsers().then(function (result) {
            result.data.map(c => usersInGroups.push(c.group))
            if (!usersInGroups.includes(groupToDelete.name)){
                groupService.deleteGroup({pk :  groupToDelete.pk}).then(()=>{
                    var  newArr  =  self.state.groups.filter(function(obj) {
                        return  obj.pk  !==  groupToDelete.pk;
                    });
                    self.setState({groups:  newArr})
                });
            }
            else{alert("Cannot delete a group that has users!")}
        });
    }

    nextPage(){
        var  self  =  this;
        groupService.getGroupByURL(this.state.nextPageURL).then((result) => {
            self.setState({ groups:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (

        <div  className="group--list">

            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.groups.map( c  =>
                    <tr  key={c.pk}>
                        <td>{c.pk}  </td>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td>
                        <button className="btn btn-outline-danger mr-4" onClick={(e)=>  this.handleDelete(e,c) }> Delete</button>
                        <a  className="btn btn-outline-success" href={"/group_add/" + c.pk}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary mr-4 mb-4"  onClick=  {  this.nextPage  }>Next page</button>
            <a className="btn btn-primary mb-4" href="/group_add/">Add group</a>
            
        </div>
        );
    }
}

export  default  GroupList;

