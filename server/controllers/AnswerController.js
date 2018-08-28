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
        db.query(query4, (error4, res4) => {
            if (error4) {
                return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
            } else {
                if (res4.rows.length > 0) {
                    const query5 = {
                        text: 'insert into answers (user_id, username, answer, question_id) VALUES ($1, $2, $3, $4) returning id, user_id, username, answer, question_id',
                        values: [
                            req.decoded.id, req.session.username, req.body.answer, _questionId
                        ]
                    }
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

    is_Prefered = (req, res) => {
        if (!req.params.answerId || isNaN(req.params.answerId)) {
            return res.status(400).json({
                message: "The specified answer ID is invalid",
            });
        }

        if (!req.params.questionId || isNaN(req.params.questionId)) {
            return res.status(400).json({
                message: "The specified answer ID is invalid",
            });
        }
        const query8 = {
            text: `select * from answers where user_id = $1 AND question_id = $2`,
            values: [
                req.decoded.id, parseInt(req.params.questionId)
            ]
        }
        db.query(query8, (error, result) => {
            if (error) {
                return res.status(400).json({
                    error: 'Something went wrong with the process, Please try again later'
                });
            } else {
                const query5 = { text: 'select * from questions where id = $1 AND user_id = $2 LIMIT 1', values: [req.params.questionId, req.decoded.id] };
                db.query(query5, (error5, res5) => {
                    //
                    if (result.rows.length > 0 || res5.rows.length > 0) {
                        const query0 = {
                            text: `update answers SET answer = $1, is_Prefered = $2, updated_at = $3 WHERE question_id = $4 returning id, answer, is_Prefered, updated_at`,
                            values: [                                  //Adapted from stackoverflow url: https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
                                req.body.answer, req.body.is_Prefered, new Date().toISOString().slice(0, 10),
                                req.params.questionId,
                            ],
                        }
                        db.query(query0, (error0, res0) => {
                            if (error0) {
                                return res.status(400).json({ error: '2Something went wrong with the process, Please try again later' });
                            } else {
                                return res.status(200).json({ Success: 'Record updated successfully', Updated: res0.rows[0] });
                            }
                        });
                    } else {
                        return res.status(200).json({ message: 'The answer you are trying to update either does not exists or doesn\'t belong to you' });
                    }
                });
            }
        });
    }
}

export default new AnswerController();