import React, { Component } from "react";
import axios from "axios";
// import logo from './logo.svg';
import './App.css';
import UserList from "./components/User.js";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu";
// import * as url from "url";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
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
  }

  render() {
    return (
        <div>
            <MenuItem/>
            <UserList users={this.state.users}/>
            <Footer/>
        </div>
    );
  }
}

export default App;
