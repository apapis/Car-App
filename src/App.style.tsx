// StyledApp.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  justify-content: center;
  min-height: 100vh; // Make sure to take up at least the full viewport height
  padding: 20px;
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
