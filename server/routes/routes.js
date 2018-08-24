import questionController from '../controllers/QuestionController';
import userController from '../controllers/UserController';
import answerController from '../controllers/AnswerController';
import homeController from '../controllers/HomeController';
<<<<<<< HEAD
import auth from '../middleware/auth';
=======
import auth from '../middlewares/auth';
>>>>>>> server
import validateEntry from '../middlewares/Validation';
import validateUser from '../middlewares/UserValidation';
import validateUser2 from '../middlewares/LoginValidation';


// const Routes = (server) => {
//     // Home route
//     server.get('/', homeController.home);

const Routes = (server) => {
    server.get('/', homeController.home);
    server.get('/api/v1/questions/:id', auth.verifyUserToken, questionController.getQuestion);
    server.post('/api/v1/auth/signup', validateUser, userController.createUser); //
    server.post('/api/v1/auth/login', validateUser2, userController.loginUser);  //
    server.get('/api/v1/questions', auth.verifyUserToken, questionController.getAllQuestions);
    server.post('/api/v1/questions', auth.verifyUserToken, validateEntry.validate, questionController.createQuestion);
<<<<<<< HEAD
    server.post('/api/v1/:questionId/answers', auth.verifyUserToken, validateEntry.validate, answerController.createAnswer);
    server.put('/api/v1/questions/:questionId/answers/:answerId', auth.verifyUserToken, validateEntry.validate, answerController.markPrefered);
=======
    //server.post('/api/v1/:questionId/answers', auth.verifyUserToken, validateEntry.validate, answerController.createAnswer);
    //server.put('/api/v1/questions/:questionId/answers/:answerId', auth.verifyUserToken, validateEntry.validate, answerController.markPrefered);
>>>>>>> server
    server.delete('/api/v1/questions/:id', auth.verifyUserToken, questionController.deleteQuestion);
  };
  
  export default Routes;