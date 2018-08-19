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


        var x = 0;
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