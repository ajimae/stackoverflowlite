import db from '../../db';

class QuestionController {
  createQuestion = (req, res) => {
    //const user = db.query(`select * from users where username = ${req.session.username}`, (err, result) => {return result.rows[0].username});
    console.log(req.session.username);
    const query2 = {
      text: 'INSERT INTO questions (user_id, title, description, respondent) VALUES ($1, $2, $3, $4) returning id, user_id, title, description, respondent',
      values: [
        req.decoded.id, req.body.title, req.body.description, req.session.username
      ]
    };
    db.query(query2, (error3, res3) => {
      if (error3) {
        return res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
      } else {
        return res.status(201).json({ success: 'Question Created successfully', Question: res3.rows });
      }
    });
  }

  //
  getAllQuestions(req, res) {
    const query2 = {
      text: 'Select * from questions',
      //values: [req.decoded.id],
    };
    db.query(query2, (error2, res2) => {
      if (error2) {
        return res.status(400).json({ error: 'Something went wrong with the process1, Please try later' });
      } else {
        if (res2.rows.length > 0) {
          return res.status(200).json({ success: 'Success', Questions: res2.rows });
        } else {
          return res.status(200).json({ success: 'Success', message: 'No questions have been posted' });
        }
      }
    });
  }
}

export default new QuestionController();






