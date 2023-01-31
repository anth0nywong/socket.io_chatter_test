import express from 'express';
import { getUserList } from '../controller';
const router = express.Router();

router.get('/getUser', getUserList);

export default router;