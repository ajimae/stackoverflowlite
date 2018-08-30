import auth from '../middlewares/auth';
import validate from '../middlewares/validation';
import validateUser from '../middlewares/userValidation';
import UserController from '../controllers/UserController';
import HomeController from '../controllers/HomeController';
import validateUser2 from '../middlewares/loginValidation';
import AnswerController from '../controllers/AnswerController';
import QuestionController from '../controllers/QuestionController';


export default (server) => {
    server.get('/', new HomeController().home);
    server.get('/api', new HomeController().home);
    server.get('/api/v1', new HomeController().home);
    server.get('/api/auth', new HomeController().home);
    server.post('/api/v1/auth/signup', validateUser, new UserController().createUser);
    server.post('/api/v1/auth/login', validateUser2, new UserController().loginUser);
    server.post('/api/v1/questions', auth.verifyUserToken, validate.validateQuestions, new QuestionController().createQuestion);
    server.get('/api/v1/questions', new QuestionController().getAllQuestions);
    server.get('/api/v1/questions/:questionId', new QuestionController().getQuestion);
    server.delete('/api/v1/questions/:questionId', auth.verifyUserToken, new QuestionController().deleteQuestion);
    server.post('/api/v1/:questionId/answers', auth.verifyUserToken, validate.validateAnswers, new AnswerController().createAnswer);
    server.put('/api/v1/questions/:questionId/answers/:answerId', auth.verifyUserToken, validate.validateAnswers, new AnswerController().is_Prefered);
};