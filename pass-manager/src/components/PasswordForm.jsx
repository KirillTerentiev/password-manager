import React, {Component} from "react";
import {merge, map} from "lodash"
import { object, string, bool, number } from "prop-types";

export default class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      showPassword: false,
      data: {
        namePass: null,
        login: '',
        password: null,
        id: null
      }
    }
  }

  submitPass = (e) => {
    e.preventDefault();
    let nameLogin = e.target.nameLogin.value;
    let namePassword = e.target.namePassword.value;
    let passwordTitle = e.target.passwordTitle.value;
    let user = JSON.parse(localStorage.getItem('user'));
    let dataPass = {
      credentials: {
        ["" + passwordTitle]:
          {
            id: Math.floor(Math.random() * 1000),
            passwordTitle,
            nameLogin,
            namePassword
          }
      }
    };
    let updateUser = merge(user, dataPass);
    localStorage.setItem('user', JSON.stringify(updateUser));
    this.setState({
      updated: true
    });
    this.props.updateData(this.state.updated);
  };

  checkPasswordData = () => {
    let id = this.props.id;
    let user = JSON.parse(localStorage.getItem('user'));
    map(user.credentials, (elem) => {
      if (elem.id === id) {
        this.setState({
          data: {
            namePass: elem.passwordTitle,
            login: elem.nameLogin,
            password: elem.namePassword,
            id
          }
        });
      }
    });
  };

  componentDidMount() {
    this.checkPasswordData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.checkPasswordData();
    }
  }

  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  };
  handleCheckBoxChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      showPassword: value
    });
  };

  render() {
    const { data, showPassword  } = this.state;
    const { id  } = this.props;
    return (
      <div>
        <form onSubmit={this.submitPass}>
          <input
            type="text"
            name="passwordTitle"
            placeholder="Account name"
            defaultValue={id ? data.namePass : null}
          />
          <br/>
          <input
            type="text"
            name="nameLogin"
            placeholder="Account login"
            defaultValue={id ? data.login : null}
          />
          <br/>
          <input
            type={showPassword ? "text" : "password"}
            name="namePassword"
            placeholder="Account password"
            defaultValue={id ? data.password : null}
          />
          <p>
            <label htmlFor="switchMask">
              Show password
            </label>
            <input
              id="switchMask"
              type="checkbox"
              checked={showPassword}
              onChange={this.handleCheckBoxChange}
              defaultValue="Show Password"
            />
          </p>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  };
}
PasswordForm.propTypes ={
  data: object,
  updated: bool,
  showPassword: bool,
  namePass: string,
  login: string,
  password: string,
  id: number,
};