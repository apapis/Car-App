
# Car Listing App - In Progress 

This project is a car listing application built with React, TypeScript, and Vite. It allows users to easily create and manage car listings for their automotive business.

Key Features:
- Intuitive interface for adding car listings
- Integration with an external API (repository link: [provide the link to your API repository])
- Automatic retrieval of car information from the popular Polish automotive website, Otomoto (https://www.otomoto.pl/)
- Seamless data population for car listings based on the retrieved information

This application was developed as a custom solution for a client who found the process of adding car listings on their WordPress website too cumbersome and unintuitive. By leveraging the power of React and TypeScript, along with the fast development setup provided by Vite, this app streamlines the car listing process and enhances the user experience.

The app integrates with a separate API (housed in another repository) to handle data management and communication with the backend. It also includes a special feature that allows users to fetch car details directly from Otomoto, a leading automotive classified website in Poland. By simply providing a link to a car listing on Otomoto, the app automatically extracts relevant information and pre-fills the corresponding fields in the car listing form.


## Instalation
To run this project locally, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project's directory.
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit: `http://localhost:3000`

Note: Make sure to also set up and run the accompanying API project https://github.com/apapis/Car-App-API to enable full functionality.

If you want to try out the Otomoto integration feature, simply choose a car listing from https://www.otomoto.pl/ and provide its URL in the designated input field within the app.
