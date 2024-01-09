import styled from 'styled-components';

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const AuthInput = styled.input`
  padding: 8px 12px;
  outline: none;
  border: 1px solid #dedede;
  border-radius: 5px;

  &:focus {
    border: 1px solid blue;
  }
`;

export const AuthButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const AuthButton = styled.button`
  outline: none;
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
`;
