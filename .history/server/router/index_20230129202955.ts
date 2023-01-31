import express from 'express';
import { getUserList } from '../controller';
const router = express.Router();

router.post('/getUser', getUserList);

export default router;