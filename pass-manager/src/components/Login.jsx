import React from "react";
import { withAuth } from "./Auth";
import { Redirect } from "react-router-dom"
import "./style.scss"

export default withAuth(({ isAuthorized, authorize, validate, clearErrors, logOut, state }) => {

  let checkAuth = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let password = e.target.password.value;
    let user = JSON.parse(localStorage.getItem('user'));
    if(user === null){
      validate(user);
      return null
    }
    else if(user.name === name && user.password === password) {
      authorize();
    }
    validate(name, password, user.name, user.password);
  };

  return(
    isAuthorized ? (<Redirect to="/public"/>) : (
      <div className="form">
        <h1>Авторизация пользоватлея</h1>
        <form
          onSubmit={checkAuth}
          onFocus={clearErrors}
        >
          <span>Имя</span>
          <input type="text" name="name" />
          {
            state.errorName && <div className="error">Wrong name</div>
          }
          <span>Пароль</span>
          <input type="password" name="password"/>
          {
            state.errorPassword && <div className="error">Wrong password.</div>
          }
          <button type="submit">Авторизироваться</button>
        </form>
      </div>
    )
  )
});
