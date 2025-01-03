import { Router } from 'express';
import { login, register } from '../controllers/authentication'; // Ensure path is correct

// Register routes on the provided router instance
export default (router: Router): void => {
  router.post('/auth/register', register); // Register the /auth/register route
  router.post('/auth/login', login); // Register the /auth/login route
};