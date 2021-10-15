import  React, { Component } from  'react';
import Service  from  './Service';

const  groupService  =  new  Service('group');

class  GroupCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { match: { params } } =  this.props;
        if(params  &&  params.pk)
        {
            groupService.getById(params.pk).then((c)=>{
                this.refs.name.value  =  c.name;
                this.refs.description.value  =  c.description;
            })
        }
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
        groupService.create(
            {
            "find": 0,
            "name":  this.refs.name.value,
            "description":  this.refs.description.value
            }).then((result)=>{
                    alert("Group created!");
            }).catch((e)=>{
                    alert(e.response.data.name);
            });
    }

    handleUpdate(pk){
        groupService.update(
            {
            "pk":  pk,
            "name":  this.refs.name.value,
            "description":  this.refs.description.value
            }).then((result)=>{
                alert("Group updated!");
            }).catch((e)=>{
                alert(e.response.data.name);
            });
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
}
export default GroupCreateUpdate;