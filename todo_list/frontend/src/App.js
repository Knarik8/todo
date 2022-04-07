import React, { Component } from "react";
import axios from "axios";
// import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu";
import ProjectList from "./components/Project.js";
import TodoList from "./components/Todo.js";
import NotFound404 from "./components/NotFound404.js";
import ProjectListUser from "./components/UserProjects.js";
import {HashRouter, Route, BrowserRouter, Switch, Redirect} from "react-router-dom"
// import * as url from "url";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
    }
  }

  componentDidMount() {
    // const users = [
    //   {
    //     'username': 'user1',
    //     'first_name': 'Ivan',
    //     'last_name': 'Ivanov',
    //     'email': 'ivan@ivan.ru'
    //   },
    //   {
    //     'username': 'user2',
    //     'first_name': 'Petr',
    //     'last_name': 'Petrov',
    //     'email': 'petr@petr.ru'
    //   }
    // ]
      axios.get('http://127.0.0.1:8000/api/users').then(response => {
          this.setState(
            {
              'users': response.data
            }
            )}).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/projects').then(response => {
          this.setState(
            {
              'projects': response.data
            }
            )}).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/todos').then(response => {
          this.setState(
            {
              'todos': response.data
            }
            )}).catch(error => console.log(error))
  }

  render() {
    return (
        <div>
            <BrowserRouter>
                <MenuItem/>
                <Footer/>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
                    <Route path='/user/:id'>
                        <ProjectListUser projects={this.state.projects}/>
                    </Route>
                    <Redirect from='/project' to='projects'/>
                    <Route component={NotFound404}/>

                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
