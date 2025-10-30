import express from 'express'
import { getAllUsers, login, logout, register } from '../Controllers/auth.controller.js';

const authRouter =express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);

authRouter.get("/allusers", getAllUsers);

export default authRouter;  
