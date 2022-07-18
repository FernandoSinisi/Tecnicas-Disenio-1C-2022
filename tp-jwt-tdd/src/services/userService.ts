import {RequestHandler} from "express";
import {model} from 'mongoose';
import {User, UserSchema} from '../models/userModel';
import {create} from "./jwt";

const UserModel = model('User', UserSchema);

export const addNewUser = async (user: Omit<User, "created_date">) => {
    const userAlreadyCreated = await getUserWithEmail(user.email);
    if (userAlreadyCreated) {
        throw new Error("user already existing");
    }
    let newUser = new UserModel(user);
    if (newUser.firstName.length + newUser.lastName.length < 4 || newUser.password.length < 8) {
        throw new Error("invalid parameters for creation of user");
    }
    // TODO: Valida business Rules como Pass valida (mas de 8 caracteres), etc nombre sea mayor a 3 y solo caracteres sin nros
    return await newUser.save();
}

export const getUsers = async () => {
    return await UserModel.find({});
}

export const getUserWithID: RequestHandler = (req, res) => {
    UserModel.findById(req.params.userID, null, null, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}

export const getUserWithEmail = async (email: string) => {
    return UserModel.findOne({email});
}

export const login: RequestHandler = (req, res) => {
    const email = req.body.email;
    const pswd = req.body.password;
    if (!email || !pswd) {
        return res.status(400).send('invalid email or password');
    }
    getUserWithEmail(email).then(user => {
        if (!user) {
            return res.status(404).send('user not found');
        }
        if (pswd === user.password) {
            return res.json({token: create({email})});
        }
        return res.status(404).send('Incorrect password');
    })
}

export const updateUser: RequestHandler = (req, res) => {
    UserModel.findOneAndUpdate(
        {_id: req.params.userID},
        req.body,
        {new: true, useFindAndModify: false},
        (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        }
    );
}

export const deleteUser: RequestHandler = (req, res) => {
    UserModel.remove({_id: req.params.userID}, err => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'successfuly deleted user'});
    });
}
