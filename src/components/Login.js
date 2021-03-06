import React, { useState } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import { localURL } from '../config';

export default function Login({
  history,
  setIsLoggedIn,
  setIsAdmin,
}) {
  const [loginState, setLoginState] = useState('init');
  const handleSubmint = async (e) => {
    e.preventDefault();
    const { data } = await Axios.post(
      `${localURL}/auth/login`,
      {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    );
    if (!data.result) {
      setLoginState('failed');
    } else {
      const { exp } = JSON.parse(atob(data.token.split('.')[1])); // base64 Decoding
      const expires = new Date(exp * 1000).toUTCString();
      document.cookie = `Authorization = JWT ${data.token};expires=${expires}`;
      setIsAdmin(data.admin);
      setIsLoggedIn(true);
      setLoginState('success');
    }
  };
  return (
    <>
      {loginState === 'success' ? (<Redirect to="/" />) : null}
      <form onSubmit={handleSubmint}>
        <small>{loginState === 'failed' && '이메일 혹은 비밀번호를 확인하세요.'}</small>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => history.push('/join')}>회원가입</button>
      </form>
    </>
  );
}
