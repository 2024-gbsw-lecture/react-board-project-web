import { useState } from 'react';
import authAPI from '../../../api/auth';
import { sha512 } from 'js-sha512';
import { Link, useNavigate } from 'react-router-dom';
import {
  AuthButton,
  AuthButtonWrapper,
  AuthInput,
  FieldsWrapper,
} from '../style';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onLogin = async () => {
    const request = {
      email,
      password: sha512(password),
    };

    try {
      const response = await authAPI.login(request);

      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/');

      alert('로그인 성공');
    } catch (error) {
      alert('아이디 또는 비밀번호가 맞지 않습니다.');
    }
  };

  return (
    <div>
      <h1>로그인</h1>

      <FieldsWrapper>
        <div>
          이메일:{' '}
          <AuthInput
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          비밀번호:{' '}
          <AuthInput
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <AuthButtonWrapper>
          <AuthButton onClick={onLogin}>로그인</AuthButton>

          <Link to='/register'>
            <AuthButton>회원가입으로 돌아가기</AuthButton>
          </Link>
        </AuthButtonWrapper>
      </FieldsWrapper>
    </div>
  );
};

export default Login;
