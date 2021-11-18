// let express = require('express')
import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken';
import { Connection, createConnection } from "typeorm";
import { Note } from "./entity/Note";
import * as cors from "cors";
import { User } from "./entity/User";
const jwts = require('../src/middleware/auth.js');
//let jwt =  require('jsonwebtoken')


createConnection().then(async connection => {
    const userRepository = connection.getRepository(Note);
    let userRepositorySignin = connection.getRepository(User);
    // create and setup express app
    const app = express();
    dotenv.config();

    app.use(express.json());
    app.use(cors())

    app.use(express.json());
    app.get("/todos", jwts.verifyToken, async function (req: Request, res: Response) {
        const todos = await userRepository.find();
        res.send(todos);
    });

    app.post("/todo/add", async function (req: Request, res: Response) {
        const results = await userRepository.save(req.body);
    });

    app.delete("/todo/delete/:id", async function (req: Request, res: Response) {
        const results = await userRepository.delete(req.params.id);
    });

    app.put("/todo/edit", async function (req: Request, res: Response) {
        const note = {
            id: parseInt(req.body.id, 10),
            note: req.body.note
        };
        const note_find = await userRepository.findOne(note.id);
        userRepository.merge(note_find, note);
        const results = await userRepository.save(note_find);
        //console.log(note)
    });
    app.post("/todo/signin", async function (req: Request, res: Response) {
        const user = {
            id: 0,
            username: req.body.username,
            password: req.body.password,
            level: 0
        };
        const find = await userRepositorySignin.findOne({ where: { username: user.username, password: user.password } })
        if (find == null) {
            const data = [];
            res.send(data);
        }
        if (find != null) {
            const data = find;
            const dataS = {
                id: data.id,
                username: data.username,
                password: data.password,
                level: data.level
            }
            const accessToken = jwt.sign(dataS, process.env.ACCESS_TOKEN_SECRET)
            res.json([{ accessToken }]);
        }

    });



    // function authenToken(req: Request, res: Response, next) {
    //     const authorizationHeader = req.headers['authorization'];
    //     console.log(authorizationHeader)
    //     const token = authorizationHeader.split(' ')[1];
    //     if (!token) {
    //         res.sendStatus(401);
    //     }
    //     else {
    //         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    //             console.log(err, data);
    //             if (err) {
    //                 res.sendStatus(403);
    //             }
    //             next();
    //         })
    //     }
    // }

    app.post("/todo/signup", async function (req: Request, res: Response) {
        const user = {
            id: null,
            username: req.body.username,
            password: req.body.password,
            level: 0
        };
        const find = await userRepositorySignin.find({
            username: user.username,
        });
        if (find.length == 0) {
            const data = [];
            res.send(data);
            const results = await userRepositorySignin.save(user);

        }
        if (find.length != 0) {
            const data = [find]
            res.send(data);

        }
    });
    // start express server
    app.listen(3006);


}).catch(error => console.log(error));


