/**
 * Created by Chukwuemeka on 23/08/2018.
 */
import db from '../../db';

class QuestionController {
    home(req, res) {
        res.status(200).render('index.html');
    }

    createQuestion(req, res) {
        const query2 = {
            text: 'INSERT INTO questions (user_id, question_id, title, description, asker, prefered, views) VALUES ($1,$2,$3,$4,$5,$6,$7) returning id, user_id, question_id, title, description, asker, prefered, views',
            values: [
                req.decoded.id, req.body.question_id, req.body.title, req.body.description, req.body.asker, req.body.prefered, req.body.views
            ],
        };
        db.query(query2, (error3, res3) => {
            if (error3) {
                return res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
            } else {
                return res.status(201).json({ success: 'Questions Created successfully', entry: res3.rows });
            }
        });
    }

    // editEntry(req, res) {
    //     const query5 = { text: 'Select * from entries where id = $1', values: [req.params.id], };
    //     db.query(query5, (error5, res5) => {
    //         if (error5) { return res.status(400).json({ error: 'Something went wrong with the process, Please try later' }); };
    //         if (res5.rows.length) {
    //             const query2 = {
    //                 text: 'Select * from entries where id = $1 AND user_id = $2 LIMIT 1', values: [req.params.id, req.decoded.id],
    //             };
    //             db.query(query2, (error2, res2) => {
    //                 if (error2) {
    //                     return res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
    //                 } else {
    //                     if (!res2.rows.length) { return res.status(403).json({ error: 'Entry to modify does not belong to you' }); } else {
    //                         const query3 = {
    //                             text: `UPDATE entries SET  title = $1, category = $2, sub_category = $3, content = $4 WHERE id = $5 returning id, title, category, sub_category, content`,
    //                             values: [
    //                                 req.body.title, req.body.category, req.body.subCategory,
    //                                 req.body.content, req.params.id,
    //                             ],
    //                         };
    //                         db.query(query3, (error3, res3) => {
    //                             if (error3) {
    //                                 return res.status(400).json({ error: 'Update was not successful at this time, Try Again' });
    //                             }
    //                             return res.status(200).json({ success: 'Entry was updated successfully', entry: res3.rows });
    //                         });
    //                     }
    //                 }
    //             });
    //         } else { 
    //             return res.status(404).json({ error: 'Entry not found' }); 
    //         };
    //     });
    // }

    getQuestion(req, res) {
        const query2 = {
            text: 'Select * from questions where id = $1 AND user_id = $2 LIMIT 1',
            values: [req.params.id, req.decoded.id],
        };
        db.query(query2, (error2, res2) => {
            if (error2) {
                return res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
            } else {
                if (res2.rows.length) {
                    return res.status(200).json({ success: 'Success', entry: res2.rows });
                } else {
                    return res.status(404).json({ error: 'The question must have been deleted' });
                }
            }
        });
    }

    getAllQuestions(req, res) {
        const query2 = {
            text: 'Select * from questions where user_id = $1',
            values: [req.decoded.id],
        };
        db.query(query2, (error2, res2) => {
            if (error2) {
                return res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
            } else {
                if (res2.rows.length > 0) {
                    return res.status(200).json({ success: 'Success', entries: res2.rows });
                } else {
                    return res.status(200).json({ success: 'Success', message: 'You are yet to post a diary entry' });
                }
            }
        });
    }

    deleteQuestion(req, res) {
        const query2 = { text: 'SELECT from questions where id = $1 LIMIT 1', values: [req.params.id], };
        db.query(query2, (error2, res2) => {
            if (error2) {
                return res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
            } else {
                if (res2.rows.length) {
                    const query5 = { text: 'SELECT from questions where id = $1 AND user_id = $2 LIMIT 1', values: [req.params.id, req.decoded.id] };
                    db.query(query5, (error5, res5) => {
                        if (error5) {
                            return res.status(400).json({ error: 'Something went wrong with the process, Please try later' });
                        } else {
                            if (res5.rows.length) {
                                const query3 = { text: 'DELETE from questions where id = $1', values: [req.params.id] };
                                db.query(query3, (error3, res3) => {
                                    return res.status(200).json({ success: 'Entry Successfully deleted' });
                                });
                            } else {
                                return res.status(403).json({ error: 'Entry does not belong to you' });
                            }
                        }
                    });
                } else { 
                    return res.status(404).json({ error: 'Entry not found' }); 
                }
            }
        });
    }
}
export default new QuestionController();







































































































// class QuestionController {
//     getAllQuestions = (req, res) => {
//         if(Questions.length == 0 || Questions.length == undefined) {
//             return res.status(404).json({
//                 message: "No questions to display"
//             });
//         }

//         return res.status(200).json(Questions); // Ok
//     }

//     getQuestion = (req, res) => {
//         const _id = parseInt(req.params.questionId)
//         if( _id <= 0) {
//             return res.status(404).json({   // Not found
//                 message: "No question found matching the specified ID",
//             });
//         }

//         if(Questions.length == 0 || Questions.length == undefined) {
//             return res.status(404).json({
//                 message: "No questions to display"
//             });
//         }

//         if(isNaN(_id)) {
//             return res.status(400).json({
//                 message: "Invalid questionID"
//             });
//         }
//         for(let value of Questions) {
//             if(value.id == _id) {
//                 return res.status(200).json(Questions[_id]);
//             }
//         }

//         return res.status(404).json({
//             message: "Question not found matching the specified ID"
//         });
//     }

//     createQuestion = (req, res) => {
//         if(!req.body.title || !req.body.description || !req.body.asker || !req.body.votes || !req.body.views || !req.body.tags || !req.body.timestamp) {
//             return res.status(400).json({   // Bad request
//                 message: "All fields are mandatory."
//             });
//         }

//         let x = 0;
//         const newQuestion = {
//             id: x = (Questions.length == 0) ? 1 : parseInt(Questions[Questions.length - 1].id + 1),
//             title: req.body.title,
//             description: req.body.description,
//             asker: req.body.asker,
//             votes: `${parseInt(req.body.votes)}`,
//             views: `${parseInt(req.body.views)}`,
//             tags: req.body.tags,
//             timestamp: `asked ${req.body.timestamp}min ago`
//         }

//         Questions.push(newQuestion);
//         return res.status(201).json({
//             message: "New question created"
//         });
//     }

//     editQuestion = (req, res) => { //Validate this method
//         const _id = parseInt(req.params.questionId);
//         if(!req.body.title || !req.body.description) {
//             return res.status(400).json({   // Bad Request
//                 message: "The title and/or description cannot be empty."
//             });
//         }

//         if(isNaN(_id) || _id <= 0) {
//             return res.status(400).json({   // Bad request
//                 message: "The requested update was not successful, the specified question ID is not valid",
//             });
//         }else {
//         }

//         if(_id != '' && !isNaN(_id) && _id > 0) {
//              for(let value of Questions) {
//                 if(_id == value.id) {
//                     const updatedQuestion = Questions[(_id) - 1] = req.body;
//                     updatedQuestion.id = _id;
//                     updatedQuestion.timestamp = `Updated ${req.body.timestamp}mins ago`;
//                     return res.status(200).json({
//                         message: "Question successfully updated."
//                     });
//                 }
//             }

//             return res.status(400).json({   // Bad request found
//                 message: "The requested update was not successful, the specified question ID was not found on this server",
//             });
//         }
//     }


//     deleteQuestion = (req, res) => {
//         const index = parseInt(req.params.questionId);
//         if(index <= 0) {
//             return res.status(404).json({   // Not found
//                 message: "The question could not be deleted, the specified question ID was not found on this server",
//             });
//         }
//         if(isNaN(index)) {
//             return res.status(404).json({   // Not found
//                 message: "Invalid question ID",
//             });
//         }

//         for(let value of Questions) {
//             if(value.id == index) {
//                 let needle = Questions.indexOf(value);
//                 const result = Questions.splice(needle, 1);  // Write a code to delete the associated answers
//                 if(!result) {
//                     return res.status(501).json({   // Not implemented
//                         message: "Question could not be deleted at this time, please try again later."
//                     });
//                 }
//             }
//         }

//         return res.status(200).json({
//             message: "The question was successfully deleted."
//         });
//     }
// }

// export default new QuestionController;