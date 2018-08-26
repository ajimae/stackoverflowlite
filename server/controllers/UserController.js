import db from '../../db';
import bcrypt from 'bcrypt';
import auth from '../middlewares/auth';

class UserController {

    // User creation
    createUser(req, res) {
        const check = `SELECT * FROM users where email = '${req.body.email}'`;
        const user = `SELECT * FROM users where username = '${req.body.username}'`;
        db.connect((error1, client) => {
            if (error1) {
                res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
            } else {
                return client.query(check, (error2, res2) => {
                    if (error2) {
                        res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
                    } else {
                        return client.query(user, (err, resp) => {
                            if (err) {
                                res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
                            } else {
                                if (resp.rows.length > 0) {
                                    res.status(409).json({ error: `Username ${req.body.username} already exists` });
                                } else {
                                    if (res2.rows.length) {
                                        res.status(409).json({ error: `Email ${req.body.email} already exists` });
                                    } else {
                                        const hash = bcrypt.hashSync(req.body.password, 10);
                                        const query = {
                                            text: `insert into users (name, email, username, password) values ($1, $2, $3, $4) returning id, name, email, username`,
                                            values: [req.body.name, req.body.email, req.body.username, hash],
                                        };
                                        return client.query(query, (error3, res3) => {
                                            if (error3) {
                                                res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
                                            } else {
                                                const createdUser = res3.rows[0];
                                                const userToken = auth.authenticate(createdUser);
                                                return res.status(201).send({
                                                    success: 'success',
                                                    user: createdUser,
                                                    token: userToken,
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    }

    loginUser(req, res) {
        const query = {
            text: 'select id, name, username, password from users where email = $1 LIMIT 1',
            values: [req.body.email],
        };
        db.query(query, (error1, response) => {
            if (error1) {
                res.status(400).json({ error: 'Something went wrong with the process1, Please try later' });
            } else {
                const user = response.rows[0];
                if (!response.rows.length) {
                    return res.status(401).send({ error: 'Invalid Email or Password' });
                } else {
                    const check = bcrypt.compareSync(req.body.password, user.password);
                    if (check) {
                        const token = auth.authenticate(user);
                        delete user.password;
                        req.session.username = user.username;
                        console.log(req.session.username);
                        return res.status(200).send({ success: 'success', user, token });
                    } else {
                        return res.status(401).send({ error: 'Invalid Email or Password' });
                    }
                }
            }
        });
    }
}

export default new UserController();
