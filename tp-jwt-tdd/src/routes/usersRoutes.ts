import {Application} from 'express';
import {loggerMiddleware} from '../middlewares/loggerMiddleware';
import {addNewUser, deleteUser, getUsers, getUserWithID, login, updateUser} from '../services/userService';
import {continueIfJWTValid} from "../services/jwt";

const routes = (app: Application) => {
    app.route('/users')
        .get(loggerMiddleware,
            async (req, res) => {
                try {
                    const users = await getUsers();
                    res.status(200).send(users);
                } catch (error: any) {
                    res.status(500)
                        .send(error + ' ' + error.stack);
                }
            }
        )

        // Post endpoint
        .post(
            async (req, res) => {
                try {
                    // TODO: Validar los tipos de datos
                    const newUser = {
                        email: req.body.email,
                        password: req.body.password,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    }
                    const user = await addNewUser(newUser);
                    res.status(200).send(user);
                } catch (error: any) {
                    res.status(400)
                        .send(error + ' ' + error.stack);
                }
            }
        );

    app.route('/users/:userID')
        // get a specific user
        .get(getUserWithID)

        // updating a specific user
        .put(updateUser)

        // deleting a specific user
        .delete(deleteUser);

    app.route('/users/login').post(login);
    app.route('/users/login/test').get(continueIfJWTValid, (req, res) => res.json(req.body.jwtPayload));
}

export default routes;
