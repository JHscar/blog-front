import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { localURL } from '../config';

export default function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isEmailChecked, setisEmailChecked] = useState('yet');
  const [isPasswordSame, setisPasswordSame] = useState(false);
  const [joinResult, setJoinResult] = useState(false);

  const checkEmail = async () => {
    const { data } = await axios.get(`${localURL}/auth/email?email=${email}`);
    setisEmailChecked(data.result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailChecked || isEmailChecked === 'yet') {
      alert('이메일 중복 확인 부탁!');
      return;
    }
    if (!isPasswordSame) {
      alert('패스워드 확인 부탁!');
      return;
    }
    if (!e.target.nickname || !email || !password) {
      alert('모든 필드가 필수입니다.');
      return;
    }
    const { data } = await axios.post(`${localURL}/auth/join`, {
      name: e.target.nickname.value,
      email,
      password,
    });
    if (data.result) {
      setJoinResult(true);
    } else {
      alert('회원가입 실패! 관리자에게 문의하세요.');
    }
  };

  return (
    <>
      {joinResult && <Redirect to="/login" />}
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">NickName</label>
          <input type="text" className="form-control" name="nickname" aria-describedby="emailHelp" placeholder="블로그에서 사용할 이름" />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setisEmailChecked('yet');
              setEmail(e.target.value);
            }}
          />
        </div>

        <button type="button" className="btn btn-secondary" onClick={checkEmail}>이메일 중복체크</button>
        <small>{isEmailChecked === 'yet' ? '중복체크를 해주세요' : isEmailChecked ? '이 이메일은 사용가능' : '이거 못씀ㅋ'}</small>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setisPasswordSame(e.target.value === password2);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password-Check</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
              setisPasswordSame(e.target.value === password);
            }}
          />
        </div>

        <small>{isPasswordSame ? '비밀번호 일치' : '비밀번호가 다릅니다!'}</small>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    </>
  );
}
