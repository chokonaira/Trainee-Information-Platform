import { param } from 'express-validator';

const paramsValidation = {
  validateParamsId:[
    param('id')
    .isString()
    .withMessage('Url Id should be a string')
  ]
};

export default paramsValidation;
