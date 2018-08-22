import answerController from '../controllers/AnswerController';
import homeController from '../controllers/HomeController';


const Routes = (server) => {
    // Home route
    server.get('/', homeController.home);


/**
 * Answers route section
 */
    // Post an answers
    server.post('/api/v1/:questionId/answers', answerController.createAnswer);
};

export default Routes;
