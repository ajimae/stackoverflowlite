import questionController from '../controllers/QuestionController';
import homeController from '../controllers/HomeController';


const Routes = (server) => {
    // Home route
    server.get('/', homeController.home);


 /**
 * Questions route section
 */

    // Get all questions
    server.get('/api/v1/questions', questionController.getAllQuestions);

};

export default Routes;
