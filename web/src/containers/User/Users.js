import React, { Component, Fragment } from 'react';
import axios from 'axios';

import classes from './Users.module.css';
import isUserAdmin from '../../utility/isUserAdmin'
import editImg from '../../assets/images/edit-button.png'

import Modal from '../../components/UI/Modal/Modal'
import Input from '../../components/UI/Input/Input'
import Backdrop from '../../components/UI/Backdrop/Backdrop';


class Users extends Component {
  state = {
    users: [],
    loading: false,
    isAdmin: false,
    editUser: false,
    selectedUserId: '',
    selectedRole: "Diretor"
  };
  componentDidMount() {
    this.setState({ loading: true })
    const userId = localStorage.getItem('userId')
    isUserAdmin(userId).then((isUserAdmin) => {
      this.setState({ isAdmin: isUserAdmin })
    })
    const url = process.env.REACT_APP_BASE_URL + '/user/list'
    axios.get(url)
      .then((response) => {
        const users = [...response.data.users]
        this.setState({
          users: [...users],
          loading: false
        })
      }).catch(error => {
        console.log(error)
        this.setState({ loading: false })
      })
  }
  onEditUser = (userId) => {
    this.setState({
      editUser: true,
      selectedUserId: userId
    })
  }
  closeModal = () => {
    this.setState({
      editUser: false,
      selectedUserId: '',
      selectedRole: "Diretor",
      loading: false
    })
  }
  onChangeUserRole = (event) => {
    const newRole = event.target.value
    this.setState({
      selectedRole: newRole
    })
  }
  confirmEditRole = () => {
    this.setState({ loading: true })
    const userId = this.state.selectedUserId
    const selectedRole = this.state.selectedRole
    const url = process.env.REACT_APP_BASE_URL + '/user/update/' + userId
    axios.put(url, {
      selectedRole: selectedRole
    }).then(result => {
      const users = result.data.users
      this.setState({
        users: users
      })
      this.closeModal()
    }).catch((err) => {
      console.log(err);
    }).finally(() => {

      this.closeModal()
    })
  }

  render() {
    const directors = createRuleList([...this.state.users], "Diretor")
    const members = createRuleList([...this.state.users], "Membro")
    const associates = createRuleList([...this.state.users], "Associado")
    const noRules = createRuleList([...this.state.users], "Nenhum")

    const directorsList = createListUI(directors, "Diretores", this.onEditUser, this.state.isAdmin) || []
    const membersList = createListUI(members, "Membros", this.onEditUser, this.state.isAdmin) || []
    const associatesList = createListUI(associates, "Associados", this.onEditUser, this.state.isAdmin) || []
    const noRulesList = createListUI(noRules, "Sem cargo", this.onEditUser, this.state.isAdmin) || []
    return (
      <div className={classes.UsersPage}>
        {directors.length !== 0 && directorsList}
        {members.length !== 0 && membersList}
        {associates.length !== 0 && associatesList}
        {noRules.length !== 0 && noRulesList}
        {
          this.state.editUser && <Modal
            confirmButton
            confirmAction={this.confirmEditRole}
            message={"Selecione novo cargo: "}
            close={this.closeModal}
          >
            <Input
              className={"Thin"}
              inputType={"select"}
              value={this.state.selectedRole}
              changed={(event) => { this.onChangeUserRole(event) }}
              elementConfig={
                {
                  options: [
                    { displayValue: "Diretor", value: "Diretor" },
                    { displayValue: "Membro", value: "Membro" },
                    { displayValue: "Associado", value: "Associado" }
                  ]
                }
              }
            />
          </Modal>
        }
        <Backdrop show={this.state.editUser} clicked={this.closeModal} />
      </div>
    )

  }
}

const createRuleList = (users, role) => {
  const list = users.filter(user => {
    if (user.role === role) {
      return user
    }
    return null
  })
  if (list !== undefined) {
    return list
  }
  return []
}
const createListUI = (list, ListName, editUser, isAdmin) => {
  return (
    <Fragment>
      <h1>{ListName}</h1>
      <ul className={classes.UsersList}>
        {list.map(user => {
          return (
            <li className={classes.User} key={user._id}>
              <img className={classes.ProfileImage} src={user.imageUrl} alt={user.name} />
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>Cargo: {user.role}</p>
              </div>
              {isAdmin && <div><img onClick={() => { editUser(user._id) }} className={classes.EditButton} src={editImg} alt={"edit button"} /></div>}
            </li>
          )
        })}
      </ul>
    </Fragment>
  )
}



export default Users