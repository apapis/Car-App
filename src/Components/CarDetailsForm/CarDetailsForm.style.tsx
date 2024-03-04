// StyledCarDetailsForm.js
import styled from 'styled-components';

export const Form = styled.form`
  background-color: ${props => props.theme.secondary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  color: ${props => props.theme.text};
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: calc(100% - 20px); // Adjusted to account for padding
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border};
  box-sizing: border-box;
`;

export const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textSecondary};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block; // Ensure the button is not inline

  &:hover {
    background-color: ${props => props.theme.accent};
  }
`;

export const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) { // Assuming desktop starts at 768px
    grid-template-columns: 1fr 1fr;
  }
`;

export const Textarea = styled.textarea`
  width: 100%; // Makes the textarea full width
  padding: 10px; // Adds some padding inside the textarea for better text readability
  margin-top: 10px; // Adds margin on top for spacing from other elements
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px; // Matches your form inputs' border-radius
  box-sizing: border-box; // Ensures padding does not add to the width
  resize: vertical; // Allows vertical resizing only
  min-height: 200px;
`;