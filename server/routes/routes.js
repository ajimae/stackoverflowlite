import questionController from '../controllers/QuestionController';
import homeController from '../controllers/HomeController';


const Routes = (server) => {
    // Home route
    server.get('/', homeController.home);


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
