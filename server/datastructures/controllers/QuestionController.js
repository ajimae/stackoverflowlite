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

    createQuestion = (req, res) => {
        if(!req.body.title || !req.body.description) {
            return res.status(400).json({   // Bad request
                message: "All fields are mandatory."
            });
        }
        
        let x = 0;
        const newQuestion = {
            id: x = (Questions.length == 0) ? 1 : parseInt(Questions[Questions.length - 1].id + 1),
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
        const _id = parseInt(req.params.questionId);
        if(!req.body.title || !req.body.description) {
            return res.status(400).json({   // Bad Request
                message: "The title and/or description cannot be empty."
            });
        }

        if(isNaN(_id) || _id <= 0) {
            return res.status(400).json({   // Bad request
                message: "The requested update was not successful, the specified question ID is not valid",
            });
        }else {
        }

        if(_id != '' && !isNaN(_id) && _id > 0) {
             for(let value of Questions) {
                if(_id == value.id) {
                    const updatedQuestion = Questions[(_id) - 1] = req.body;
                    updatedQuestion.id = _id;
                    updatedQuestion.timestamp = `Updated ${req.body.timestamp}mins ago`;
                    return res.status(200).json({
                        message: "Question successfully updated."
                    });
                }
            }

            return res.status(400).json({   // Bad request found
                message: "The requested update was not successful, the specified question ID was not found on this server",
            });
        }
    }
    

    deleteQuestion = (req, res) => {
        const index = parseInt(req.params.questionId);
        if(index <= 0) {
            return res.status(404).json({   // Not found
                message: "The question could not be deleted, the specified question ID was not found on this server",
            });
        }
        if(isNaN(index)) {
            return res.status(404).json({   // Not found
                message: "Invalid question ID",
            });
        }

        for(let value of Questions) {
            if(value.id == index) {
                let needle = Questions.indexOf(value);
                const result = Questions.splice(needle, 1);  // Write a code to delete the associated answers
                if(!result) {
                    return res.status(501).json({   // Not implemented
                        message: "Question could not be deleted at this time, please try again later."
                    });
                }
            }
        }
        
        return res.status(200).json({
            message: "The question was successfully deleted."
        });
    }
}

export default new QuestionController;