import React, { Component } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import axios from 'axios';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get('https://api.github.com/users');
  //   this.setState({ users: res.data, loading: false });
  // }

  searchUsers = async text => {
    this.setState({ loading: true, alert: null });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({ users: res.data.items, loading: false });
  }

  clearUsers = () => this.setState({ users: [], loading: false })
  
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type}});

    setTimeout(() => this.setState({ alert: null }), 3500);
  }

  render() {
    const { users, loading, alert } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true: false}
            setAlert={this.setAlert}
            />
          <Users loading={loading} users={users}/>
        </div>
      </div>
    )
  }
} 

export default App;
