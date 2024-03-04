import { Label, Input, Textarea } from "../CarDetailsForm/CarDetailsForm.style";

interface FieldProps {
  label: string;
  type: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const Field: React.FC<FieldProps> = ({ label, type, fieldProps }) => {
  return (
    <div>
      <Label htmlFor={fieldProps.name}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={fieldProps.name} {...fieldProps} />
      ) : (
        <Input id={fieldProps.name} type={type} {...fieldProps} />
      )}
    </div>
  );
};

export default Field;
