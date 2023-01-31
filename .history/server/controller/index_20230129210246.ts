import express from 'express';

export async function getUserList(req: express.Request, res: express.Response, next: express.NextFunction){
    res.json({success: true});
}