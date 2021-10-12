import  React, { Component } from  'react';
import  GroupService  from  './GroupService';

const  groupService  =  new  GroupService();

class  GroupCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit} href = "/group/">
          <div className="form-group">
            <label>
              Group name:</label>
              <input className="form-control" type="text" ref='name' />

            <label>
              Description:</label>
              <input className="form-control" type="text" ref='description'/>

              <input className="btn btn-primary mt-4"  type="submit" value="Submit" />

            </div>
          </form>
        );
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

    handleCreate(){
        groupService.createGroup(
            {
            "name":  this.refs.name.value,
            "description":  this.refs.description.value
            }).then((result)=>{
                    alert("Group created!");
            }).catch((e)=>{
                    alert(e);//'There was an error! Please re-check your form.');
            });
    }

    handleUpdate(pk){
        groupService.updateGroup(
            {
            "pk":  pk,
            "name":  this.refs.name.value,
            "description":  this.refs.description.value
            }
            ).then((result)=>{
        
                alert("Group updated!");
            }).catch(()=>{
                alert('There was an error! Please re-check your form.');
            });
        }

        componentDidMount(){
            const { match: { params } } =  this.props;
            if(params  &&  params.pk)
            {
                groupService.getGroup(params.pk).then((c)=>{
                    this.refs.name.value  =  c.name;
                    this.refs.description.value  =  c.description;
                })
            }
        }
}
export default GroupCreateUpdate;