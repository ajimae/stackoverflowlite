import questionController from '../controllers/QuestionController';
import userController from '../controllers/UserController';
import answerController from '../controllers/AnswerController';
import homeController from '../controllers/HomeController';
import auth from '../middlewares/auth';
import validate from '../middlewares/Validation';
import validateUser from '../middlewares/UserValidation';
import validateUser2 from '../middlewares/LoginValidation';


const Routes = (server) => {
    server.get('/', homeController.home);
    server.post('/api/v1/auth/signup', validateUser, userController.createUser); //
    server.post('/api/v1/auth/login', validateUser2, userController.loginUser);  //
    server.post('/api/v1/questions', auth.verifyUserToken, validate.validateQuestions, questionController.createQuestion);
    server.get('/api/v1/questions', auth.verifyUserToken, questionController.getAllQuestions);
    server.get('/api/v1/questions/:questionId', auth.verifyUserToken, questionController.getQuestion);
    server.delete('/api/v1/questions/:questionId', auth.verifyUserToken, questionController.deleteQuestion);
    server.post('/api/v1/:questionId/answers', auth.verifyUserToken, validate.validateAnswers, answerController.createAnswer);
    //server.put('/api/v1/questions/:questionId/answers/:answerId', auth.verifyUserToken, validate.validateAnswers, answerController.markPrefered);
};
  
export default Routes;