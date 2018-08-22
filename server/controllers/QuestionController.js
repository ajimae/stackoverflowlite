import Questions from '../data/question.structures';
import { isNumber } from 'util';

class QuestionController {
    getQuestion = (req, res) => {
        const _id = parseInt(req.params.questionId)
        if( _id <= 0) {
            return res.status(404).json({   // Not found
                message: "No question found matching the specified ID",
            });
        }

        if(Questions.length == 0 || Questions.length == undefined) {
            return res.status(404).json({
                message: "No questions to display"
            });
        }

        if(isNaN(_id)) {
            return res.status(400).json({
                message: "Invalid questionID"
            });
        }

        if(req.url != '/api/v1/questions/:questionId' || req.url != '/api/v1/questions/:questionId/') {
            return res.status(404).json({
                message: "Url not found"
            });
        }
        for(let value of Questions) {
            if(value.id == _id) {
                return res.status(200).json(Questions[_id]);
            }
        }

        return res.status(404).json({
            message: "Question not found matching the specified ID"
        });
    }
}

export default new QuestionController;