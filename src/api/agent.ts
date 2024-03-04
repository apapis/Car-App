import axios, { AxiosResponse } from "axios";
import { Car } from "../Models/Car"; // Assuming you have a Car model in your Models folder

axios.defaults.baseURL = "https://localhost:7194";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: <T>(url: string, body: T) =>
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(responseBody),
  put: <T>(url: string, body: T) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Cars = {
  getCarDetails: (url: string) =>
    requests.get(`car?url=${encodeURIComponent(url)}`),
  addCar: (car: Car) => requests.post<Car>("car", car),
  editCar: (url: string, car: Partial<Car>) =>
    requests.put<Partial<Car>>(`car?url=${encodeURIComponent(url)}`, car),
};

const agent = {
  Cars,
};

export default agent;
