import Questions from '../data/question.structures';

class QuestionController {

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

}

export default new QuestionController;