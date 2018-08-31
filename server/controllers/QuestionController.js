import db from '../db';


export default class QuestionController {
  createQuestion(req, res) {
    const query2 = {
      text: 'insert into questions (user_id, title, description, respondent) VALUES ($1, $2, $3, $4) returning id, user_id, title, description, respondent',
      values: [
        req.decoded.id, req.body.title, req.body.description, req.session.username
      ]
    };
    db.query(query2, (error3, res3) => {
      if (error3) {
        return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
      } else {
        return res.status(201).json({ success: 'Question Created successfully', Question: res3.rows });
      }
    });
  }



  getAllQuestions = (req, res) => {
    const query2 = {
      text: 'Select * from questions',
    };
    db.query(query2, (error2, res2) => {
      if (error2) {
        return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
      } else {
        if (res2.rows.length > 0) {
          return res.status(201).json({ success: 'Success', Questions: res2.rows });
        } else {
          return res.status(200).json({ success: 'Success', message: 'No question have been posted' });
        }
      }
    });
  }

  getQuestion(req, res) {
    if(!req.params.questionId || isNaN(req.params.questionId)) {
      return res.status(400).json({ message: 'The specified question ID is invalid' })
    }
    const query2 = {
      text: 'Select * from questions where id = $1 LIMIT 1',
      values: [req.params.questionId],
    };
    const query0 = {
      text: 'select * from answers where question_id = $1',
      values: [req.params.questionId]
    };
    db.query(query2, (error2, res2) => {
      if (error2) {
        return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
      } else {
        db.query(query0, (error0, res0) => {
          if(error0) {
            return res.status(400).json('Something went wrong, please again later')
          }else {
            if (res2.rows.length) {
              res.status(200).json({success: 'Success', Question: res2.rows, Answers: res0.rows});
            } else {
              return res.status(404).json({ error: 'The question couldn\'t be found or must have been deleted' });
            }
          }
        });
      }
    });
  }

  deleteQuestion(req, res) {
    const query2 = { text: 'select * from questions where id = $1 LIMIT 1', values: [req.params.questionId] };
    if (!req.params.questionId || isNaN(req.params.questionId)) {
      return res.status(400).json({ error: 'The specified question ID is invalid' });
    }
    db.query(query2, (error2, res2) => {
      if (error2) {
        return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
      } else {
        if (res2.rows.length) {
          const query5 = { text: 'select * from questions where id = $1 AND user_id = $2 LIMIT 1', values: [req.params.questionId, req.decoded.id] };
          db.query(query5, (error5, res5) => {
            if (error5) {
              return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
            } else {
              if (res5.rows.length) {
                const query3 = { text: 'delete from questions where id = $1', values: [req.params.questionId] };
                db.query(query3, (error3, res3) => {
                  if (error3) return res.status(400).json({ error: 'Something went wrong with the process, Please try again later' });
                  else {
                    db.query(`delete from answers where question_id = ${req.params.questionId}`, (err, result) => { result.rows[0] });
                    return res.status(200).json({ success: 'Question successfully deleted' });
                  }
                });
              } else {
                return res.status(403).json({ error: 'The question you are trying to delete doesn\'t belong to you' });
              }
            }
          });
        } else { return res.status(404).json({ error: 'Question not found matching the specified question id' }); }
      }
    });
  }
}