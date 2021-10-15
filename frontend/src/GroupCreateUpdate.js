import  React, { Component } from  'react';
import Service  from  './Service';

const  groupService  =  new  Service();

class  GroupCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.dest = 'group'
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
        groupService.create(
            {
            "find": 0,
            "obj": "group",
            "name":  this.refs.name.value,
            "description":  this.refs.description.value
            }, 
            this.dest).then((result)=>{
                    alert("Group created!");
            }).catch((e)=>{
                    alert(e.response.data.name);
            });
    }

    handleUpdate(pk){
        groupService.update(
            {
            "pk":  pk,
            "obj": "group",
            "name":  this.refs.name.value,
            "description":  this.refs.description.value
            },
            this.dest).then((result)=>{
                alert("Group updated!");
            }).catch((e)=>{
                alert(e.response.data.name);
            });
        }

        componentDidMount(){
            const { match: { params } } =  this.props;
            if(params  &&  params.pk)
            {
                groupService.getById(params.pk, this.dest).then((c)=>{
                    this.refs.name.value  =  c.name;
                    this.refs.description.value  =  c.description;
                })
            }
        }
}
export default GroupCreateUpdate;