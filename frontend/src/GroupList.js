import  React, { Component } from  'react';
import Service  from  './Service';

const  userService  =  new  Service('user');
const  groupService  =  new  Service('group');

class  GroupList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            groups: [],
            nextPageURL:  '',
            numPages: 0
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        groupService.getAll().then(function (result) {
            self.setState({ groups:  result.data, 
                            nextPageURL:  result.nextlink,
                            numPages: result.numpages})
        });
    }

    async handleDelete(e,groupToDelete){

        var  self  =  this;
        var groupHasUsers = false;

        await userService.getAll().then((result) => {
            this.nextPageURL = result.nextlink
            result.data.map(function(c) { 
                if (c.group === groupToDelete.name){ 
                groupHasUsers = true;
                }
            }) 
        });
        
        if (!groupHasUsers){
            for (let i=1; i<self.state.numPages; i++){
                await userService.getByURL(this.nextPageURL).then((result) => {
                    this.nextPageURL = result.nextlink
                    if (result.data.includes(groupToDelete)){
                        groupHasUsers = true;
                    }
                });
            }
        }
            
        if (groupHasUsers == false) {
            groupService.delete({pk :  groupToDelete.pk}, self.dest).then(()=>{
                var newArr  =  self.state.groups.filter(function(obj) {
                    return  obj.pk  !==  groupToDelete.pk;
                });
            self.setState({groups:  newArr})
            });
        }
        else{alert("Cannot delete a group that has users!")}

        this.componentDidMount()
    }

    nextPage(){
        var  self  =  this;
        groupService.getByURL(this.state.nextPageURL).then((result) => {
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

