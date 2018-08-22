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

};

export default Routes;
