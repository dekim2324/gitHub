import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import User from './component/users/User';
import axios from 'axios';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';
import About from './component/pages/About';


class App extends Component {
  state = {
    users: [],
    user: {},
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

  //Get single user
  getUser = async username => {
    this.setState({ loading: true, alert: null });

    const res = await axios.get(`https://api.github.com/users/${username}`);
    this.setState({ user: res.data, loading: false });
  }

  clearUsers = () => this.setState({ users: [], loading: false })
  
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type}});

    setTimeout(() => this.setState({ alert: null }), 3500);
  }

  render() {
    const { users, user, loading, alert } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>

            <Switch>

              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true: false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users}/> 
                </Fragment>
              )}/>

              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User 
                  {...props} 
                  getUser={this.getUser} 
                  user={user} 
                  loading={loading}
                />
              )} />
            </Switch>

          </div>
        </div>
      </Router>
    )
  }
} 

export default App;
