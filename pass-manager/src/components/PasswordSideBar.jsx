import React, {Component} from "react";
import PasswordForm from "./PasswordForm"
import { map } from "lodash";
import {bool, number, object} from "prop-types";
import "./style.scss"

export default class PasswordSideBar extends Component {
  constructor(props){
    super(props);
    this.state={
      openForm: false,
      credentials: null,
      updateList: false,
      accountId: null
    }
  }

  createPassword = (id) => {
    if (typeof id === typeof NaN){
      this.setState({
        openForm: true,
        accountId: id
      });
    }else{
      this.setState({
        openForm: !this.state.openForm,
        accountId: null,
      });
    }
  };

  renderPasswords = () => {
    let passwordList = JSON.parse(localStorage.getItem('user'));
    return map(passwordList.credentials, (elem) => {
      return (
        <div key={elem.id}>
          <li
            id={elem.id}
            onClick={() => this.createPassword(elem.id)}
          >
            <span>Account:</span>
            <h3>{elem.passwordTitle}</h3>
            <br/>
            <p>Login:</p>
            <span>{elem.nameLogin}</span>
          </li>
          <button onClick={() => this.deletePassword(elem.id)}>Delete</button>
        </div>
      )
    })
  };
  deletePassword = (id) => {
    let passwordList = JSON.parse(localStorage.getItem('user'));
    map(passwordList.credentials, (elem, key) => {
      if(elem.id === id){
        delete passwordList.credentials[key]
      }
    });
    localStorage.setItem('user', JSON.stringify(passwordList));
    this.setState({
      updateList: !this.state.updateList,
      openForm: !this.state.openForm,
      accountId: null,
    })
  };


  updateData = (value) => {
    this.setState({ updateList: value })
  };

  render(){
    const { credentials } = this.state;
    return (
      <div className="password_manager">
        <div className="password_manager-list">
          <button className="password_manager-list-create" onClick={this.createPassword}>Create Password</button>
          {
            !credentials
            &&
            <ul className="side_bar">
              {this.renderPasswords()}
            </ul>
          }
        </div>
        <div className="password_manager-main">
          {
            this.state.openForm
            &&
            <PasswordForm updateData={this.updateData} id={this.state.accountId} />
          }
        </div>
      </div>
    );
  }
}

PasswordSideBar.propTypes ={
  openForm: bool,
  credentials: object,
  updateList: bool,
  accountId: number,
};