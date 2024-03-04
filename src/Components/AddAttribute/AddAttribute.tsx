// AddAttribute.js
import { useState } from "react";
import { Input, Button } from "../CarDetailsForm/CarDetailsForm.style";

interface AddAttributeProps {
  onAdd: (key: string, value: string) => void;
}

const AddAttribute: React.FC<AddAttributeProps> = ({ onAdd }) => {
  const [newAttributeKey, setNewAttributeKey] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");

  const handleAddClick = () => {
    if (newAttributeKey && newAttributeValue) {
      onAdd(newAttributeKey, newAttributeValue);
      setNewAttributeKey("");
      setNewAttributeValue("");
    }
  };

  return (
    <div>
      <Input
        placeholder="Nazwa atrybutu"
        value={newAttributeKey}
        onChange={(e) => setNewAttributeKey(e.target.value)}
      />
      <Input
        placeholder="Wartość atrybutu"
        value={newAttributeValue}
        onChange={(e) => setNewAttributeValue(e.target.value)}
      />
      <Button type="button" onClick={handleAddClick}>
        Dodaj nowy atrybut
      </Button>
    </div>
  );
};

export default AddAttribute;
