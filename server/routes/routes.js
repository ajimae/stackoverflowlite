import questionController from '../controllers/QuestionController';
import homeController from '../controllers/HomeController';


const Routes = (server) => {
    // Home route
    server.get('/', homeController.home);

 /**
 * Questions route section
 */

    // Get a single question
    server.get('/api/v1/questions/:questionId', questionController.getQuestion);
};

export default Routes;
