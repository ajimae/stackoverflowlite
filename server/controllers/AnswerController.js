import db from '../../db';

class AnswerController {
    createAnswer = (req, res) => {
        const _questionId = parseInt(req.params.questionId);
        if (!req.body.answer) {
            return res.status(406).json({   // Not Acceptable
                message: "Please specify a valid answer."
            });
        }

        if (!_questionId || isNaN(_questionId)) {
            return res.status(400).json({
                message: "The specified answer ID is invalid",
            });
        }

        const query4 = { text: 'select * from questions where id = $1 LIMIT 1', values: [req.params.questionId] };
        //console.log(query4);
        db.query(query4, (error4, res4) => {
            if (error4) {
                return res.status(400).json({ error: 'Something went wrong with the process, Please try again later'});
            } else {
                if (res4.rows.length > 0) {
                    const query5 = {
                        text: 'insert into answers (user_id, answer, question_id) VALUES ($1, $2, $3) returning id, user_id, answer, question_id',
                        values: [
                            req.decoded.id, req.body.answer, _questionId
                        ]
                    }
                    console.log(query5);
                    db.query(query5, (error5, res5) => {
                        if (error5) {
                            return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
                        } else {
                            return res.status(201).json({ success: 'Success', Answer: res5.rows });
                        }
                    });
                } else {
                    return res.status(404).json({ message: 'The question ID didn\'t match any question in our database' });
                }
            }
        });
    }
}

export default new AnswerController();