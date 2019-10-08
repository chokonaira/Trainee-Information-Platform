import express from 'express';
import TraineeController from '../controller/TraineeController';
import authenticate from '../middlewares/authentication';
import traineeValidator from '../middlewares/validators/traineeValidator';
import paramsValidator from '../middlewares/validators/paramValidator';
import validate from '../middlewares/validators/validate';


const { addTrainee, 
        getATrainee, 
        getAllTrainee, 
        editATrainee, 
        deleteATrainee } = TraineeController;

const { firstnameValidator, 
        lastnameValidator, 
        emailValidator, 
        stackValidator } = traineeValidator;

const { validateParamsId } = paramsValidator;

const router = express.Router();

router.post('/trainees/add', 
  firstnameValidator,
  lastnameValidator,
  emailValidator,
  stackValidator,
  validate, 
  authenticate,
  addTrainee);

router.get('/trainees/:id', 
  validateParamsId,
  validate, 
  authenticate,
  getATrainee);

router.get('/trainees', 
  authenticate, 
  getAllTrainee);

router.patch('/trainees/edit/:id', 
  validateParamsId,
  validate, 
  authenticate, 
  editATrainee);

router.delete('/trainees/:id', 
  validateParamsId,
  validate, 
  authenticate, 
  deleteATrainee);

export default router;
