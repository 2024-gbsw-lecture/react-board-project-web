import { useState } from 'react';
import { sha512 } from 'js-sha512';
import authAPI from '../../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  AuthButton,
  AuthButtonWrapper,
  AuthInput,
  FieldsWrapper,
} from '../style';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onRegister = async () => {
    if (!name || !email || !password) {
      alert('모든 값을 입력해주세요.');

      return;
    }

    const request = {
      name,
      email,
      password: sha512(password),
    };

    try {
      await authAPI.register(request);

      alert('회원가입이 완료되었습니다.');

      navigate('/login');
    } catch (error) {
      const status = error.response.data.status;

      if (status === 409) {
        alert('이메일이 중복되었습니다.');
      }
    }
  };

  return (
    <div>
      <h1>사용자 회원가입</h1>

      <FieldsWrapper>
        <div>
          이름:{' '}
          <AuthInput
            type='text'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
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
          <AuthButton onClick={onRegister}>가입하기</AuthButton>

          <Link to='/login'>
            <AuthButton>로그인 돌아가기</AuthButton>
          </Link>
        </AuthButtonWrapper>
      </FieldsWrapper>
    </div>
  );
};

export default Register;
