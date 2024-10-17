import express, { Router } from 'express';
import authentication from './authentication'; // Ensure path is correct

const router: Router = express.Router();

// Call the authentication function to register routes
authentication(router);

export default router; // Export the configured router instance
