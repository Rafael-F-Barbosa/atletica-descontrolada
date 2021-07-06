import React from 'react'
import classes from './User.module.css'
import editImg from '../../assets/images/edit-button.png'


const user = (props) => {
    return (
        <div className={classes.User}>
            <img className={classes.ProfileImage} src={props.user.imageUrl} alt={props.user.name} />
            <div>
                <h3>{props.user.name}</h3>
                <p>{props.user.email}</p>
                <p>Cargo: {props.user.role}</p>
            </div>
            {props.isAdmin && <div><img onClick={() => { props.editUser(props.user._id) }} className={classes.EditButton} src={editImg} alt={"edit button"} /></div>}
        </div>
    )
}

export default user