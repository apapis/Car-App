import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FieldsContainer } from "./CarDetailsForm.style";
import agent from "../../api/agent";
import AddAttribute from "../AddAttribute/AddAttribute";
import Field from "../Field/Field";
import { Car } from "../../Models/Car";
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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);
      setSelectedFiles(Array.from(event.target.files));
    }
  };

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

    const formData = new FormData();
    formData.append("url", carDetails.url);
    formData.append("description", data.description);

    Object.entries(details).forEach(([key, value]) => {
      formData.append(`details[${key}]`, value);
    });

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    agent.Cars.addCar(formData as unknown as Car);
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
      <input type="file" name="images" multiple onChange={handleFileChange} />
      <button type="submit">Zapisz zmiany</button>
    </Form>
  );
};

export default CarDetailsForm;
