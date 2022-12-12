import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Create the Server Application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get the PORT from the `.env` file
const port = process.env.PORT;

// Serve the static files from the built client-side code
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

// Turns on the Server to listen at the given port
app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});