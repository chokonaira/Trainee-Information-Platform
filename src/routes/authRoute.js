import express from 'express';
import AuthController from '../controllers/AuthController';
import authValidator from '../middlewares/validators/authValidator';
import validate from '../middlewares/validators/validate';

const { signUp, login } = AuthController;

const { usernameValidator, 
        emailValidator, 
        passwordValidator } = authValidator;


const router = express.Router();

router.post('/signup',
  usernameValidator,
  emailValidator,
  passwordValidator,
  validate,
  signUp);

router.post('/login', 
  emailValidator,
  passwordValidator,
  validate,
  login);



export default router;
