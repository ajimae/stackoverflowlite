import db from '../../db';
import bcrypt from 'bcrypt';
import auth from '../middlewares/auth';

class UserController {

    // User creation
    createUser(req, res) {
        const check = `SELECT * FROM users where email = '${req.body.email}'`;
        db.connect((error1, client) => {
            if (error1) {
                res.status(400).json({ error: 'Something went wrong with the process, Please try later'});
            } else {
                return client.query(check, (error2, res2) => {
                    if (error2) {
                        res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
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
                                    res.status(400).json({ error: 'Something went wrong with the process, Please try later'});
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
                });
            }
        });
    }
}

export default new UserController();
