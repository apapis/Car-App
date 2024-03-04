import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FieldsContainer } from "./CarDetailsForm.style";
import agent from "../../api/agent";
import AddAttribute from "../AddAttribute/AddAttribute";
import Field from "../Field/Field";

interface CarDetails {
  details: { [key: string]: string };
  description: string;
  url: string;
}

interface CarDetailsFormProps {
  carDetails: CarDetails;
}

interface FormData {
  [key: string]: string; // Dla dynamicznych kluczy
  description: string; // Możesz dodać więcej znanych pól, jeśli są
}

const CarDetailsForm: React.FC<CarDetailsFormProps> = ({ carDetails }) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      ...carDetails.details,
      description: carDetails.description || "",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    Object.entries(carDetails.details || {}).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [carDetails, setValue]);

  const handleAddAttribute = (key: string, value: string) => {
    if (key && value && !watchedValues[key]) {
      setValue(key, value, { shouldValidate: true });
    }
  };

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { newAttributeKey: _, newAttributeValue: __, ...details } = data;
    const objectCar = {
      url: carDetails.url,
      details,
      description: data.description,
    };

    agent.Cars.addCar(objectCar);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Edytuj szczegóły samochodu:</h3>
      <FieldsContainer>
        {Object.entries(watchedValues).map(([key]) =>
          key !== "description" &&
          key !== "newAttributeKey" &&
          key !== "newAttributeValue" ? (
            <Field
              key={key}
              label={key}
              type="text"
              fieldProps={{ ...register(key) }}
            />
          ) : null
        )}
        <AddAttribute onAdd={handleAddAttribute} />
      </FieldsContainer>
      <Field
        label="Opis"
        type="textarea"
        fieldProps={{ ...register("description") }}
      />
      <button type="submit">Zapisz zmiany</button>
    </Form>
  );
};

export default CarDetailsForm;
