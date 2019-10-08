import { body, check } from 'express-validator';

const traineeValidator = {
  firstnameValidator: [
    body('firstname')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Firstname is required.')
      .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
      .withMessage('Invalid firstname.')
      .isLength({ min: 3, max: 10 })
      .withMessage('Firstname must be between 3 and 10 characters.'),
  ],
  lastnameValidator: [
    body('lastname')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Lastname is required.')
      .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
      .withMessage('Invalid lastname.')
      .isLength({ min: 3, max: 10 })
      .withMessage('Lastname must be between 3 and 10 characters.'),
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
  stackValidator: [
    body('stack')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Username is required.')
      .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
      .withMessage('Invalid username.')
      .isLength({ min: 3, max: 10 })
      .withMessage('Username must be between 3 and 10 characters.'),
  ],
};

export default traineeValidator;
