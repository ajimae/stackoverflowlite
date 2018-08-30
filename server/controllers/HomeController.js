export default class HomeController {

    home = (req, res) => {
        res.status(200).json({
            Message: 'Welcome to StackoverFlowLite',
            Instruction: "See link for API Documentation",
            Url: 'https://ajimae.herokuapp.com/api/v1/docs',
        });
    }
}
