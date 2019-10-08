import express from 'express';
import traineeRoute from './traineeRoute';
import authRoute from './authRoute';


const router = express.Router();

router.use('/api/v1', traineeRoute);
router.use('/api/v1/auth', authRoute);

export default router;
