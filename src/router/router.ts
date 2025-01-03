import express, { Router } from 'express';
import authentication from './authentication'; // Ensure path is correct
import { authorizeRole } from '../middleware/authorizeRole';
import { bookRouter } from './bookRouter'; // Adjust the path if necessary


const router: Router = express.Router();

// Call the authentication function to register routes
router.use('/auth', authentication); // Prefix authentication routes with /auth


router.use('/books', authorizeRole('admin'), bookRouter);

export default router;