import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import voucherRouter from './routes/voucher';
import lineItemRouter from './routes/lineItem';

dotenv.config();
// Get the PORT from the `.env` file
const port = process.env.PORT;

// Create the Server Application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve the static files from the built client-side code
app.use(express.static(path.join(__dirname, '../client/build')));

// API Endpoints
// app.use('/api/session', sessionRouter);
// app.use('/api/users', userRouter)
app.post('/api/test', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});
app.use('/api/vouchers', voucherRouter);
app.use('/api/lineItems', lineItemRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

// Turns on the Server to listen at the given port
app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

// Catch all other routes into a meaningful error message
app.all('*', (req, res) => {
  const errorMessage = `
    Cannot find the resource <b>${req.url}</b>
    <br>
    Please use only supported routes below
    <br><br>
    <b>Home Page</b>
    <br>
    GET / -- Go to home page
    <br><br>
    <b>Authentication</b>
    <br>
    POST /api/session -- Login to a user account
    <br>
    DELETE /api/session -- Logout of a user account
    <br><br>
    <b>Users</b>
    <br>
    POST /api/users -- Register a new account
    <br>
    PATCH /api/users -- Update the current user's account information on the server
    <br>
    DELETE /api/users -- Delete the logged in user on the server
    <br><br>
    <b>Officers</b>
    <br>
    GET /api/officers/:id? -- Get data for the officer with ID :id?
    <br>
    GET /api/officers/?badge=VALUE&name=VALUE -- Get data for the officer with badge number or exact name
  `;

  res.status(404).send(errorMessage);
});
