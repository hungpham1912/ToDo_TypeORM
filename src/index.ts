import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import * as dotenv from 'dotenv'
import * as cors from "cors";

//Authenization
const jwt_module = require('../src/middleware/auth.js');

// create and setup express app
const control = require("./controller/app.controller");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())


//GET all item
app.get("/todos",jwt_module.verifyToken ,async function (req: Request, res: Response) {
    control.get_All_Todos(req, res);
});



//CREATE
app.post("/todo/add", async function (req: Request, res: Response) {
    control.post_Todo(req, res);
});


//DELETE
app.delete("/todo/delete/:id", async function (req: Request, res: Response) {
    control.delete_Todo(req, res)
});



//UPDATE
app.put("/todo/edit", async function (req: Request, res: Response) {
    control.update_Todo(req, res)
});


//SIGN IN
app.post("/todo/signin", async function (req: Request, res: Response) {
    control.signin_Todo(req,res)
});



//SIGN UP
app.post("/todo/signup", async function (req: Request, res: Response) {
    control.signup_Todo(req,res)
});


// start express server
app.listen(3007);
