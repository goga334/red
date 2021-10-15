import  React, { Component } from  'react';
import Service  from  './Service';

const  userService  =  new  Service();
const  groupService  =  new  Service();

class  GroupList  extends  Component {

    constructor(props) {
        super(props);
        this.dest = 'group'
        this.state  = {
            groups: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        groupService.getAll(this.dest).then(function (result) {
            self.setState({ groups:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,groupToDelete){

        var  self  =  this;
        var data = {value: groupToDelete.name,
                    find: 1};
        userService.checkByValue(data, self.dest).then(function(result) {
            console.log(result)
            if (result === '') {
                groupService.delete({pk :  groupToDelete.pk}, self.dest).then(()=>{
                    var newArr  =  self.state.groups.filter(function(obj) {
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
        groupService.getByURL(this.state.nextPageURL, this.dest).then((result) => {
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

