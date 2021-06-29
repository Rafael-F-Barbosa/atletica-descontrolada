import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Spinner from '../../components/UI/Spinner/Spinner';
import Card from '../../components/UI/Card/Card';

import classes from './Users.module.css';
import axios from 'axios';


class Users extends Component {
  state = {
    users: [],
    loading: false,
    addProduct: false
  };
  componentDidMount() {
    const url = process.env.REACT_APP_BASE_URL + '/user/list'
    axios.get(url)
      .then((response) => {
        const users = [...response.data.users]
        this.setState({
          users: [...users]
        })
      }).catch(error => {
        console.log(error)
      })
  }
  render() {
    console.log(this.state.users)
    return (
      <div className={classes.Users}>
        <ul className={classes.UsersUl}>
          {this.state.users.map(user => {
            return (
              <li className={classes.User}>
                <img src={user.imageUrl} />
                <h3 className={classes.Title}>{user.name}</h3>
                <p>{user.email}</p>
                <p>Cargo: {user.role}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )

  }
}

export default Users