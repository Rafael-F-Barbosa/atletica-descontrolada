import React, { Component, Fragment } from 'react';
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
    const directors = createRuleList([...this.state.users], "Diretor")
    const members = createRuleList([...this.state.users], "Membro")
    const associates = createRuleList([...this.state.users], "Associado")
    const noRules = createRuleList([...this.state.users], "Nenhum")

    const directorsList = createListUI(directors, "Diretores") || []
    const membersList = createListUI(members, "Membros") || []
    const associatesList = createListUI(associates, "Associados")|| []
    const noRulesList = createListUI(noRules, "Sem cargo")|| []
    return (
      <div className={classes.UsersPage}>
        {directors.length !== 0 && directorsList}
        {members.length !== 0 && membersList}
        {associates.length !== 0 && associatesList}
        {noRules.length !== 0 && noRulesList}
      </div>
    )

  }
}

const createRuleList = (users, role) => {
  const list = users.filter(user => {
    if (user.role === role) {
      return user
    }
  })
  if(list !== undefined){
    return list
  }
  return []
}
const createListUI = (list, ListName) => {
  return (
    <Fragment>
    <h1>{ListName}</h1>
    <ul className={classes.UsersList}>
      {list.map(user => {
        return (
          <li className={classes.User} key={user._id}>
            <img src={user.imageUrl} />
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>Cargo: {user.role}</p>
            </div>
          </li>
        )
      })}
    </ul>
  </Fragment>
  )
}



export default Users