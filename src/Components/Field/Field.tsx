import { Label, Input, Textarea } from "../CarDetailsForm/CarDetailsForm.style";
import styled from "styled-components";

interface FieldProps {
  label: string;
  type: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  onRemove?: () => void;
}

const FieldWrapper = styled.div`
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Field: React.FC<FieldProps> = ({ label, type, fieldProps, onRemove }) => {
  return (
    <FieldWrapper>
      <Label htmlFor={fieldProps.name}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={fieldProps.name} {...fieldProps} />
      ) : (
        <Input id={fieldProps.name} type={type} {...fieldProps} />
      )}
      {onRemove && (
        <RemoveButton type="button" onClick={onRemove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </RemoveButton>
      )}
    </FieldWrapper>
  );
};

export default Field;
