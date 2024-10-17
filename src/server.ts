import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/router';
import * as dotenv from 'dotenv';
dotenv.config();



const client = express();

client.use(cors({
  credentials: true,
}));

client.use(compression());
client.use(cookieParser());
client.use(bodyParser.json());

//create the server
const server = http.createServer(client);

server.listen(8080,() =>{
  console.log('Server on http://localhost:8080/')
})

//Connecting database
const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.DATABASEPASSWORD}@cluster0.rzl08.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.Promise = Promise;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL); // Connect to MongoDB
    console.log('Successfully connected to MongoDB'); // Log success message
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); // Log error if connection fails
    process.exit(1); // Exit process on failure
  }
};

// Listen for events on the mongoose connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established successfully');
});

mongoose.connection.on('error', (error: Error) => {
  console.error('Error connecting to database:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

// Call the connection function
connectToDatabase();

client.use('/', router);
