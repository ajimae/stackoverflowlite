import Questions from '../data/question.structures';

class QuestionController {
  
    getAllQuestions = (req, res) => {
        if(Questions.length == 0 || Questions.length == undefined) {
            return res.status(404).json({
                message: "No questions to display"
            });
        }
        return res.status(200).json(Questions); // Ok
    }

    getQuestion = (req, res) => {
        const _id = parseInt(req.params.questionId);
        if(_id <= 0) {
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
        for(let value of Questions) {
            if(value.id == _id) {
                return res.status(200).json(value);
            }
        }

        return res.status(404).json({
            message: "Question not found matching the specified ID"
        });
    }

}

export default new QuestionController;