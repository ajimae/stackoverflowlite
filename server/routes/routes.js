import questionController from '../controllers/QuestionController';
import userController from '../controllers/UserController';
import answerController from '../controllers/AnswerController';
import homeController from '../controllers/HomeController';
import auth from '../middlewares/auth';
import validateEntry from '../middlewares/Validation';
import validateUser from '../middlewares/UserValidation';
import validateUser2 from '../middlewares/LoginValidation';


const Routes = (server) => {
    server.get('/', homeController.home);
    server.post('/api/v1/auth/signup', validateUser, userController.createUser); //
    server.post('/api/v1/auth/login', validateUser2, userController.loginUser);  //
    //server.get('/api/v1/questions/:questionid', auth.verifyUserToken, questionController.getQuestion);
    //server.get('/api/v1/questions', auth.verifyUserToken, questionController.getAllQuestions);
    //server.post('/api/v1/questions', auth.verifyUserToken, validateEntry.validate, questionController.createQuestion);
    //server.post('/api/v1/:questionId/answers', auth.verifyUserToken, validateEntry.validate, answerController.createAnswer);
    //server.put('/api/v1/questions/:questionId/answers/:answerId', auth.verifyUserToken, validateEntry.validate, answerController.markPrefered);
    //server.delete('/api/v1/questions/:questionId', auth.verifyUserToken, questionController.deleteQuestion);
};
  
export default Routes;