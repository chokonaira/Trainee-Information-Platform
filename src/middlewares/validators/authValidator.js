import { body, check } from 'express-validator';

const authValidator = {
  passwordValidator: [
    body('password')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Password is required.')
      .isLength({ min: 6, max: 10 })
      .withMessage('Password must be between 6 to 10 characters long.')
      .isAlphanumeric()
      .withMessage('Password must be alphanumeric.'),
  ],
  emailValidator: [
    check('email')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Email is required.')
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email address.'),
  ],
  usernameValidator: [
    body('username')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Username is required.')
      .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
      .withMessage('Invalid username.')
      .isLength({ min: 5, max: 10 })
      .withMessage('Username must be between 5 and 10 characters.'),
  ],
};

export default authValidator;
