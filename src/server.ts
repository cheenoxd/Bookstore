import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';


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
const MONGO_URL =  'mongodb+srv://zesanrahim:1wxw8jRhfAfM9Xma@cluster0.rzl08.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error: Error) => console.log("Error"));
