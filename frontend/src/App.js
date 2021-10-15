import  React, { Component } from  'react';
import { BrowserRouter } from  'react-router-dom'
import { Route } from  'react-router-dom'
import  UserList  from  './UserList'
import  UserCreateUpdate  from  './UserCreateUpdate'
import  GroupList  from  './GroupList'
import  GroupCreateUpdate  from  './GroupCreateUpdate'
import  './App.css';


const BaseLayout = () => (
  
  <div className="container-fluid">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/user">Test task with django and react</a>
  <div className=" navbar" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/user">Users</a>
      <a className="nav-item nav-link" href="/group">Groups</a>

    </div>
  </div>
</nav>

    <div className="content">
      <Route path="/user" exact component={UserList} />
      <Route path="/user_add/:pk"  component={UserCreateUpdate} />
      <Route path="/user_add/" exact component={UserCreateUpdate} />
      <Route path="/group" exact component={GroupList} />
      <Route path="/group_add/:pk"  component={GroupCreateUpdate} />
      <Route path="/group_add/" exact component={GroupCreateUpdate} />

    </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;