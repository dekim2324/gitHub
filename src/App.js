import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import User from './component/users/User';
import axios from 'axios';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';
import About from './component/pages/About';


const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null
  // }

  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    setUsers(res.data.items);
    setLoading(false);
  }

  //Get single user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  }

  //Get user repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }
  
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 3500);
  }

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
                    searchUsers={searchUsers} 
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true: false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users}/> 
                </Fragment>
              )}/>

              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User 
                  {...props} 
                  getUser={getUser} 
                  getUserRepos={getUserRepos}
                  user={user} 
                  repos={repos}
                  loading={loading}
                />
              )} />
            </Switch>

          </div>
        </div>
      </Router>
    )
} 

export default App;
