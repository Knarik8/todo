import React, { Component } from "react";
import axios from "axios";
// import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import Footer from "./components/Footer";
// import Menu from "./components/Menu";
import MenuItem from "./components/Menu";
import ProjectList from "./components/Project.js";
import TodoList from "./components/Todo.js";
import NotFound404 from "./components/NotFound404.js";
import ProjectListUser from "./components/UserProjects.js";
import { Route, BrowserRouter, Switch, Redirect, Link} from "react-router-dom"
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";
import ProjectForm from "./components/ProjectForm"
// import * as url from "url";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': '',
    }
  }

  createProject(title, link, users){
      console.log(title, link, users)
      const headers = this.get_headers()
      const data = {title:title, link:link, users:users}
      axios.post(`http://127.0.0.1:8000/api/projects/`, data,{headers}).then(
          response => {
            this.load_data()
          }
        ).catch(error => {
            console.log(error)
            this.setState({projects:[]})
      })
  }

  deleteProject(id){
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response => {
          this.load_data()
        }).catch(error => console.log(error))



  }

  load_data() {
      const headers = this.get_headers()

      axios.get('http://127.0.0.1:8000/api/users', {headers}).then(response => {
          this.setState(
            {
              'users': response.data
            }
            )}).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/projects', {headers}).then(response => {
          this.setState(
            {
              'projects': response.data
            }
            )}).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/todos', {headers}).then(response => {
          this.setState(
            {
              'todos': response.data
            }
            )}).catch(error => console.log(error))
  }

  set_token(token){
      // localStorage.setItem('token', token)
      // let item = localStorage.getItem('login')
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token':token}, ()=>this.load_data())
  }

  get_token(username,password){
      axios.post('http://127.0.0.1:8000/api-token-auth/',
          {'username': username, password: password})
          .then(response => {
                    this.set_token(response.data['token'])
            }).catch(error => alert('Не верный логин или пароль'))
  }

  is_auth() {
      return !!this.state.token

  }

  get_headers(){
      let headers = {
          'Content-Type': 'application/json'
      }

      if(this.is_auth()){
          headers['Authorization'] = `Token ${this.state.token}`
      }

      return headers
  }

  logout(){
      this.set_token('')

  }

  get_token_from_cookies(){
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token':token}, ()=>this.load_data())
  }



  componentDidMount() {
      this.get_token_from_cookies()
  }

  render() {
    return (
        <div>
            <BrowserRouter>
                <MenuItem/>
                <Footer/>
                {this.is_auth()? <button onClick={()=> this.logout()}>Logout</button>:
                <Link to='/login'>Login</Link>}
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                deleteProject={(id) => this.deleteProject(id)}/>}/>
                    <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users}
                        createProject={(title, link, user) => this.createProject(title, link, user)}/>}/>
                    <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
                    <Route path='/user/:id'>
                        <ProjectListUser projects={this.state.projects}/>
                    </Route>

                    <Route exact path='/login' component={()=><LoginForm get_token={(username,password)=>this.get_token(username,password)}/>}/>

                    <Redirect from='/project' to='projects'/>
                    <Route component={NotFound404}/>

                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
