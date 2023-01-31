import express from 'express';
import { connectedUsers } from '../socketManager';

export async function getUserList(req: express.Request, res: express.Response, next: express.NextFunction){
    res.json({success: true, user: connectedUsers});
}