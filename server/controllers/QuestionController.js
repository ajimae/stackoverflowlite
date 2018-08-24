import Questions from '../data/question.structures';
import { isNumber } from 'util';

class QuestionController {

    getAllQuestions = (req, res) => {
        if(Questions.length == 0 || Questions.length == undefined) {
            return res.status(404).json({
                message: "No questions to display"
            });
        }

        if(req.url != "/api/v1/questions" || req.url != "/api/v1/questions") {
            return res.status(404).json({
                message: "Invalid url"
            });
        }

        return res.status(200).json(Questions); // Ok
    }
}

export default new QuestionController;