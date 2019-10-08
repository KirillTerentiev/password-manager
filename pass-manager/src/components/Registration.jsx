import React from "react";
import './style.scss';

const Registration = () => {
  let handleSubmit = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let password = e.target.password.value;
    let user = {name, password};
    localStorage.setItem('user', JSON.stringify(user));
  };

  return(
    <div className="form">
      <h1>Регистрация пользователя</h1>
      <form onSubmit={handleSubmit}>
        <span>Имя</span>
        <input type="text" name="name" />
        <span>Пароль</span>
        <input type="password" name="password"/>
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  )
};

export default Registration;