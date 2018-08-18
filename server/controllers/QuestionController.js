import Questions from '../data/question.structures';

class QuestionController {
    getAllQuestions = (req, res) => {
        return res.status(200).json(Questions); // Ok
    }

    getQuestion = (req, res) => {
        if(req.params.questionId > Questions.length || req.params.questionId <= 0) {
            return res.status(404).json({   // Not found
                message: "The specified question ID was not found on this server",
            });
        }
        const _id = parseInt(req.params.questionId) - 1;
        return res.status(200).json(Questions[_id]);
    }

    createQuestion = (req, res) => {
        if(!req.body.title || !req.body.description || !req.body.asker || !req.body.votes || !req.body.views || !req.body.tags || !req.body.timestamp) {
            return res.status(400).json({   // Bad request
                message: "All fields are mandatory."
            });
        }
        
        const newQuestion = {
            id: `${parseInt(Questions[Questions.length - 1].id) + 1}`,
            title: req.body.title,
            description: req.body.description,
            asker: req.body.asker,
            votes: `${parseInt(req.body.votes)}`,
            views: `${parseInt(req.body.views)}`,
            tags: req.body.tags,
            timestamp: `asked ${req.body.timestamp}min ago`
        }

        Questions.push(newQuestion);
        return res.status(201).json({
            message: "New question created"
        });
    }

    editQuestion = (req, res) => { //Validate this method
        const _id = parseInt(req.params.questionId) - 1;
        if(!req.body.title || !req.body.description || !req.body.asker || !req.body.votes || !req.body.views || !req.body.tags || !req.body.timestamp) {
            return res.status(400).json({   // Bad Request
                message: "The title and/or body both cannot be blanck."
            });
        }

        if(isNaN(_id) || req.params.questionId <= 0) {
            return res.status(404).json({   // Not found
                message: "The requested update was not successful, the specified question ID was not found on this server",
            });
        }
        Questions.map((value) => {  //Check to see the question ID really exists.
            if(value.id != questionId) {
                return res.status(404).json({   // Not found
                    message: "The requested update was not successful, the specified question ID was not found on this server",
                });
            }
        });

        const updatedQuestion = Questions[_id] = req.body;
        updatedQuestion.id = _id;
        updatedQuestion.timestamp = `Updated ${req.body.timestamp}mins ago`;
        return res.status(200).json({
            message: "Question successfully updated."
        });
    }

    deleteQuestion = (req, res) => {
        const index = parseInt(req.params.questionId) - 1;
        if(isNaN(index) || req.params.questionId > Questions.length || req.params.questionId <= 0) {
            return res.status(404).json({   // Not found
                message: "The question could not be deleted, the specified question ID was not found on this server",
            });
        }else {
            const result = Questions.splice(index, 1);  // Write a code to delete the associated answers
            if(!result) {
                return res.status(501).json({   // Not implemented
                    message: "Question could not be deleted at this time, please try again later."
                });
            }else {
                return res.status(200).json({
                    message: "The question was successfully deleted."
                });
            }
        }
    }
}

export default new QuestionController;