import answerController from '../controllers/AnswerController';
import questionController from '../controllers/QuestionController';
import homeController from '../controllers/HomeController';


const Routes = (server) => {
    // Home route
    server.get('/', homeController.home);

/**
 * Answers route section
 */
    // Post an answers
    server.post('/api/v1/:questionId/answers', answerController.createAnswer);

  
 /**
 * Questions route section
 */

    // Post a question
    server.post('/api/v1/questions', questionController.createQuestion);
  
    // Get a single question
    server.get('/api/v1/questions/:questionId', questionController.getQuestion);
  
    // Get all questions
    server.get('/api/v1/questions', questionController.getAllQuestions);


};

export default Routes;
