class UserController {
    home(req, res) {
        res.status(200).json({
            Message: 'Welcome to StackoverFlowLite',
        });
    }
}

export default new UserController();
