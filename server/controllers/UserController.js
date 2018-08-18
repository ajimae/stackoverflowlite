import Users from '../data/user.structure';

class UserController {
    
    // Get all users
    getAllUsers = (req, res) => {
        if(!Users || Users.length == 0) {
            return res.status(200).json({
                message: "No registered user"
            })
        }
        return res.status(200).json(Users);
    }

    // User login
    loginUser = (req, res) => {
        if(!req.body.email || !req.body.password) { //more user login validations
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if(req.body.email != "" && req.body.password != "") {
            Users.map((value) => {
                if(value.email == req.body.email && value.password == req.body.password) {
                    return res.status(200).json({
                        message: "User login successful"
                    });
                }
            });
        }else {
            return res.status(401).json({   // Unauthorized
                message: "Wrong email or password"
            });
        }
    }

    // User creation
    createUser = (req, res) => {
        if(!req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).json({   //Bad request
                message: "All fields are required."
            });
        }

        Users.map((value) => {
            if(value.email == req.body.email)
                return res.status(406).json({
                    message: "The email address already exists."
                });
        });

        const newUser = {
            id: req.body.id,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        Users.push(newUser);
        return res.status(201).json({
            message: "New user created successfully."
        });
    }
}

export default new UserController();