import questionController from '../controllers/QuestionController';
import userController from '../controllers/UserController';
import answerController from '../controllers/AnswerController';
import homeController from '../controllers/HomeController';



const Routes = (server) => {
    // Home route
    server.get('/', homeController.home);
}

export default Routes;