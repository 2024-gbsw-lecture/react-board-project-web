import styled from 'styled-components';

const SubmitButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

const Button = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor || '#2c2c2c'};
  color: white;
`;

export default SubmitButton;
