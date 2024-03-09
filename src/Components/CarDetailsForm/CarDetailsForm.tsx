import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FieldsContainer } from "./CarDetailsForm.style";
import agent from "../../api/agent";
import AddAttribute from "../AddAttribute/AddAttribute";
import Field from "../Field/Field";
import { Car } from "../../Models/Car";
import LoadingOverlay from "../Loading/LoadingOverlay";

interface CarDetails {
  details: { [key: string]: string };
  description: string;
  name: string;
  url: string;
}

interface CarDetailsFormProps {
  carDetails: CarDetails;
}

interface FormData {
  [key: string]: string; // Dla dynamicznych kluczy
  description: string; // Możesz dodać więcej znanych pól, jeśli są
  name: string;
}

const CarDetailsForm: React.FC<CarDetailsFormProps> = ({ carDetails }) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      ...carDetails.details,
      description: carDetails.description || "",
      name: carDetails.name || "",
    },
  });

  const [carAdded, setCarAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formFields, setFormFields] = useState<string[]>(
    Object.keys(carDetails.details)
  );

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
      setFormFields([...formFields, key]);
    }
  };

  const handleRemoveAttribute = (key: string) => {
    setValue(key, "");
    setFormFields(formFields.filter((field) => field !== key));
  };

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { newAttributeKey: _, newAttributeValue: __, ...details } = data;
    const formData = new FormData();

    formData.append("url", carDetails.url);
    formData.append("name", data.name);
    formData.append("description", data.description);

    Object.entries(details).forEach(([key, value]) => {
      formData.append(`details[${key}]`, value);
    });

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    setIsLoading(true);
    console.log(formData);
    agent.Cars.addCar(formData as unknown as Car)
      .then(() => {
        setCarAdded(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      {console.log(carDetails)}
      {isLoading && <LoadingOverlay />}
      {carAdded ? (
        <div>
          <h3>Car added successfully!</h3>
          <button type="button" onClick={() => window.location.reload()}>
            Add another car
          </button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Edytuj szczegóły samochodu:</h3>
          <FieldsContainer>
            <Field
              label="Nazwa"
              type="text"
              fieldProps={{ ...register("name") }}
            />
            {formFields.map((key) => (
              <Field
                key={key}
                label={key}
                type="text"
                fieldProps={{ ...register(key) }}
                onRemove={() => handleRemoveAttribute(key)}
              />
            ))}
            <AddAttribute onAdd={handleAddAttribute} />
          </FieldsContainer>
          <Field
            label="Opis"
            type="textarea"
            fieldProps={{ ...register("description") }}
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
          />
          <button type="submit">Zapisz zmiany</button>
        </Form>
      )}
    </>
  );
};

export default CarDetailsForm;
