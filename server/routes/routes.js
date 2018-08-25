import questionController from '../controllers/QuestionController';
import userController from '../controllers/UserController';
import answerController from '../controllers/AnswerController';
import homeController from '../controllers/HomeController';


const Routes = (server) => {
    // Home route
    server.get('/', homeController.home);

/**
 * Users Controller section
 */

    // Get all user
    server.get('/api/v1/users', userController.getAllUsers);

    // User sign in
    server.post('/api/v1/users/login', userController.loginUser);

    // User sign up
    server.post('/api/v1/users/signup', userController.createUser);

 /**
 * Questions route section
 */

    // Get all questions
    server.get('/api/v1/questions', questionController.getAllQuestions);

    // Get a single question
    server.get('/api/v1/questions/:questionId', questionController.getQuestion);

    // Post a question
    server.post('/api/v1/questions', questionController.createQuestion);

    // Edit a question
    server.put('/api/v1/questions/:questionId', questionController.editQuestion);

    // Delete a question
    server.delete('/api/v1/questions/:questionId', questionController.deleteQuestion);


/**
 * Answers route section
 */
    // Get all answers
    server.get('/api/v1/answers', answerController.getAllAnswers);

    // Get an answers
    server.get('/api/v1/answers/:answerId', answerController.getAnswer);

    // Post an answers
    server.post('/api/v1/questions/:questionId/answers', answerController.createAnswer);

    // Edit an answers
    // server.put('/api/v1/answers/:answerId', answerController.editAnswer);

    // Delete an answers
    server.delete('/api/v1/answers/:answerId', answerController.deleteAnswer);
};

export default Routes;
