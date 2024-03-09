import React, { useState } from "react";
import {
  Title,
  Form,
  Label,
  Input,
  Button,
  Container,
  ButtonContainer,
} from "./App.style";
import CarDetailsForm from "./Components/CarDetailsForm/CarDetailsForm";
import "./App.css";
import agent from "./api/agent";
import { Car } from "./Models/Car";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [car, setCar] = useState<Car | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    agent.Cars.getCarDetails(inputValue).then((data) => setCar(data));
  };

  const handleManualAdd = () => {
    const manualCar: Car = {
      url: "",
      details: {
        "Oferta od": "",
        "Pokaż oferty z numerem VIN": "",
        "Ma numer rejestracyjny": "",
        "Marka pojazdu": "",
        "Model pojazdu": "",
        Wersja: "",
        Generacja: "",
        "Rok produkcji": "",
        Przebieg: "",
        "Pojemność skokowa": "",
        "Rodzaj paliwa": "",
        Moc: "",
        "Skrzynia biegów": "",
        Napęd: "",
        "Spalanie Poza Miastem": "",
        "Spalanie W Mieście": "",
        "Typ nadwozia": "",
        "Emisja CO2": "",
        "Liczba drzwi": "",
        Kolor: "",
        "Kraj pochodzenia": "",
        "Serwisowany w ASO": "",
        Stan: "",
      },
      description: "",
      image: [],
    };
    setCar(manualCar);
  };

  return (
    <Container>
      <Title>Dodaj samochód</Title>
      {car ? (
        <CarDetailsForm carDetails={car} />
      ) : (
        <>
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
          <ButtonContainer>
            <Button type="button" onClick={handleManualAdd}>
              Dodaj samochód ręcznie
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

export default App;
