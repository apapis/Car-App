import React, { useState } from "react";
import { Title, Form, Label, Input, Button, Container } from "./App.style"; // Ensure this path is correct
import CarDetailsForm from "./Components/CarDetailsForm/CarDetailsForm";
import "./App.css";
import agent from "./api/agent";
import { Car } from "./Models/Car";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [car, setCar] = useState<Car | null>(null); // Określ lepszy typ niż 'any', jeśli możliwe

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents page refresh on form submit
    agent.Cars.getCarDetails(inputValue).then((data) => setCar(data));
  };

  return (
    <Container>
      <Title>Dodaj samochód</Title>
      {car ? (
        <CarDetailsForm carDetails={car} />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="inputField">Wpisz URL:</Label>
          <Input
            type="text"
            id="inputField"
            value={inputValue}
            onChange={handleChange}
          />
          <Button type="submit">Pobierz dane samochodu</Button>
        </Form>
      )}
    </Container>
  );
}

export default App;
