import Answers from '../data/answer.structure';
import Questions from '../data/question.structures';

class AnswerController {
    createAnswer = (req, res) => {
        const _questionId = req.params.questionId;
        if(!req.body.answer) {
            return res.status(406).json({   // Not Acceptable
                message: "The \'question body\' both cannot be blanck."
            });
        }

        if(!_questionId || isNaN(_questionId)) {
            return res.status(400).json({
                message: "The specified answer ID is invalid",
            });
        }

        Questions.map((value) => {
            if(value.id == _questionId) {
                const newAnswer = {
                    id: `${parseInt(Answers[Answers.length - 1].id) + 1}`,
                    questionId: req.params.questionId,
                    answer: req.body.answer,
                    upvotes: `${parseInt(req.body.upvotes)}`,
                    downvotes: `${parseInt(req.body.downvotes)}`,
                    respondent: req.body.respondent,
                    views: `${parseInt(req.body.views)}`,
                    tags: req.body.tags, 
                    timestamp: `answered ${req.body.timestamp}min ago`
                }
                
                Answers.push(newAnswer);
                    return res.status(201).json({
                    message: "New answer successfully posted."
                });
            }
        });

        return res.status(404).json({   // Not found
            message: `The answer could not be posted, the specified question ID ${_questionId} was not found on this server`
        });
    }
}

export default new AnswerController();