import Answers from '../data/answer.structure';
import Questions from '../data/question.structures';
import { parse } from 'querystring';

class AnswerController {
    getAllAnswers = (req, res) => {
        return res.status(200).json(Answers); // Ok
    }

    getAnswer = (req, res) => {
        const _id = req.params.answerId;
        if(!_id || isNaN(_id)) {
            return res.status(400).json({   // Not found
                message: "The specified answer ID is invalid"
            });
        }else {
            // Answers.map((value, index, answerArray) => {
            //     if(value.id == _id) {
            //         return res.status(200).json(answerArray[index]);
            //     }
            // });

            for(let value of Answers) {
                if(value.id == _id) {
                    return res.status(200).json(value);
                }
            }

            return res.status(404).json({   // Not found
                message: "The specified answer ID was not found on this server"
            });
        }
    }

    createAnswer = (req, res) => {
        const _questionId = req.params.questionId;
        if(!req.body.answer) {
            return res.status(406).json({   // Not Acceptable
                message: "The \'question ID\'  and/or \'question body\' both cannot be blanck."
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

    deleteAnswer = (req, res) => {
        const _id = parseInt(req.params.answerId); // Validate
        if(!_id || isNaN(_id)) {    //Invalid id
            return res.status(400).json({
                message: "The specified answer ID is invalid",
            });
        }

        Answers.map((value, index, answerArray) => {
            if(value.id == _id) {
                answerArray.splice(index, 1);
                return res.status(200).json({
                    message: "Answer was successfully deleted"
                });
            }
        });

        // When all fails
        return res.status(404).json({   // Not found
            message: "The answer could not be deleted, the specified answer ID not found on this server"
        });
    }

    markPrefered = (req, res) => {
        const q_id = parseInt(req.params.questionId);
        const a_id = parseInt(req.params.answerId);

        
    }
}

export default new AnswerController();