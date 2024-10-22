import { Request, Response } from 'express';
import { random, authentication } from '../helper/authHelp';
import { getUserByEmail, createUser } from '../db/user';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400); // Bad Request
      return;
    }
    const user = await getUserByEmail(email);
    if (!user){
      res.sendStatus(400); // Bad Request
      return;
    }

    if (!user || !user.authentication || !user.authentication.salt) {
      res.sendStatus(400); // Bad Request: User or authentication details missing
      return;
    }
    
    const expectedHash = authentication(user.authentication.salt, password);


  } catch (error) {
    console.error('Error in login:', error);
    res.sendStatus(400); // Bad Request
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400); // Bad Request
      return; 
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.sendStatus(400); // User already exists
      return;
    }

    const salt = random();
    const user = await createUser({
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(201).json(user); // Send the response
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500); // Internal Server Error
  }
};
