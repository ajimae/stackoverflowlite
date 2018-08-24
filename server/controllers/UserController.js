<<<<<<< HEAD
import Users from '../data/user.structure';

class UserController {
    
    // Get all users
    getAllUsers = (req, res) => {
        if(Users.length === undefined || Users.length == 0) {
            return res.status(404).json({
                message: "No registered user"
            })
        }
        return res.status(200).json(Users);
    }

    // User login
    loginUser = (req, res) => {
        if(Users.length == 0 || Users.length == undefined) {
            
            return res.status(404).json({
                message: "No registered user"
            });
        }
        
        if(!req.body.email || !req.body.password) { 
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if(req.body.email != '' && req.body.password != '') {
            for(let value of Users) {
                if(value.email == req.body.email && value.password == req.body.password) {
                    return res.status(200).json({
                        message: "User login successful"
                    });
                }
            }
        }
        // return res.status(401).json({   // Unauthorized
        //     message: "Wrong email or password"
        // });
    }

    // User creation
    createUser = (req, res) => {
        if(!req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).json({   //Bad request
                message: "All fields are required."
            });
        }

        for(let value of Users) {
            if(value.email == req.body.email) {
                return res.status(406).json({ // Not accepted
                    message: "The email address already exists."
                });
            }
        }


        let x = 0;
        const newUser = {
            id: x = (Users.length == 0) ? 1 : parseInt(Users[Users.length - 1].id + 1),
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        console.log(newUser.id);
        Users.push(newUser);
        return res.status(201).json({
            message: "New user created successfully."
        });
    }
}

export default new UserController();
=======
/**
 * Created by Chukwuemeka on 23/08/2018.
 */
import bcrypt from 'bcrypt';
import auth from '../middlewares/auth';
import db from '../../db';


class UserController {
   createUser (req, res) {
    const check = `SELECT * FROM users where email = '${req.body.email}'`;
    db.connect((error1, client) => {
        console.log(error1);
      if (error1) {
          res.status(400).json({ error: 'Something went wrong with the process, Please try later1' });
      } else {
          return client.query(check, (error2, res2) => {
              if (error2) {
                   res.status(400).json({ error: 'Something went wrong with the process, Please try later2' });
              }else{
                  if (res2.rows.length) {
                       res.status(409).json({ error: `Email ${req.body.email} already exists` });
                  } else {
                      const hash = bcrypt.hashSync(req.body.password, 10);
                      const query = { text: `insert into users (name, email, username, password) values ($1, $2, $3, $4) returning id, name, email, username`,
                          values: [ req.body.name, req.body.email, req.body.username, hash],
                      };
                      return client.query(query, (error3, res3) => {
                          if (error3) {
                               res.status(400).json({ error: 'Something went wrong with the process, Please try later3'});
                          } else {
                              const createdUser = res3.rows[0];
                              console.log(res3.rows[0]);
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

   loginUser (req, res) {
    const query = {
      text: 'select id, name, password from users where email = $1 LIMIT 1',
      values: [req.body.email ],
    };
    db.query(query, (error1, response) => {
      if (error1) {
          res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
      }else{
          const user = response.rows[0];
          if (!response.rows.length) {
              return res.status(401).send({ error: 'Invalid Email or Password' });
          }else{
              const check = bcrypt.compareSync(req.body.password, user.password);
              if (check) {
                  const token = auth.authenticate(user);
                  delete user.password;
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
>>>>>>> server
