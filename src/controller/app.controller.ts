import { Request, Response } from "express";
import "reflect-metadata";
import * as jwt from 'jsonwebtoken';
import { createConnection} from "typeorm";
import { Note } from "../entity/Note";
import { User } from "../entity/User";

createConnection().then(connection => {
    //Create repnsetory
    const userRepository_Note = connection.getRepository(Note);
    const userRepository_User = connection.getRepository(User);


    exports.get_all_Todos = async function (req: Request, res: Response) {
        const todos = await userRepository_Note.find();
        res.send(todos);
    }


    exports.post_Todo = async function (req: Request, res: Response) {
        const results = await userRepository_Note.save(req.body);
    }


    exports.delete_Todo = async function (req: Request, res: Response) {
        const results = await userRepository_Note.delete(req.params.id);
    }



    exports.update_Todo = async function (req: Request, res: Response) {
        const note = {
            id: parseInt(req.body.id, 10),
            note: req.body.note
        };
        const note_find = await userRepository_Note.findOne(note.id);
        userRepository_Note.merge(note_find, note);
        const results = await userRepository_Note.save(note_find);
    }




    exports.signin_Todo = async function (req: Request, res: Response) {
        const user_find = await userRepository_User.findOne({ where: { username: req.body.username, password: req.body.password } })
        if (user_find == null) {
            const data = [];
            res.send(data);
        }
        if (user_find != null) {
            const data = user_find;
            const dataS = {
                id: data.id,
                username: data.username,
                password: data.password,
                level: data.level
            }
            //Create access token
            const accessToken = jwt.sign(dataS, process.env.ACCESS_TOKEN_SECRET)
            res.json([{ accessToken }]);
        }
    }



    exports.signup_Todo = async function (req: Request, res: Response) {
        const user = {
            id: null,
            username: req.body.username,
            password: req.body.password,
            level: 0
        };
        const find = await userRepository_User.find({
            username: user.username,
        });
        if (find.length == 0) {
            const data = [];
            res.send(data);
            const results = await userRepository_User.save(user);

        }
        if (find.length != 0) {
            const data = [find]
            res.send(data);

        }
    }

})


