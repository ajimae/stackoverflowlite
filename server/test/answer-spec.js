import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const should = chai.should();
chai.use(chaiHttp);


let token = '';

describe('Answers Route Controller', () => {
    it('should Create New User, when all parameters are complete', (done) => {
        const values = {
            name: 'jane doe',
            email: 'janedoe500@mail.com',
            username: 'jane500',
            password: 123,
            confirmPass: 123
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(values)
          .end((err, res) => {
            token = res.body.token;
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('user');
            res.body.should.have.property('token');
            done();
          });
      });
    setTimeout(() => {
        it('should return 200 (OK) for POST /answers with a valid token', (done) => {
            const values = {
                answer: 'You are jane doe',
            };
            chai.request(server)
                .post('/api/v1/questions/1/answers')
                .set('x-access-token', token)
                .send(values)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.should.be.json;
                    done();
                });
        });
    }, 2000);
    it('should return 500 (Internal Server Error) for Any POST /answers endpoint with an invalid token', (done) => {
        const values = {
            answer: "You are jane doe"
        };
        chai.request(server)
            .post('/api/v1/questions/1/answers')
            .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
            .send(values)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.not.have.property('entry');
                done();
            });
    });
    it('should return 400 for POST /answers with incomplete parameters', (done) => {
        const values = {
            answer: ""
        };
        chai.request(server)
            .post('/api/v1/questions/1/answers')
            .set('x-access-token', token)
            .send(values)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.not.have.property('entry');
                done();
            });
    });
    it('Should return 401 (Unauthorized) for POST /answers  without a token', (done) => {
        const values = {
            answer: "You are jane doe"
        }
        chai.request(server)
            .post('/api/v1/questions/1/answers')
            .set('x-access-token', '')
            .send(values)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.not.have.property('entries');
                done();
            });
    });
    setTimeout(() => {
        it('should return 201 (Created) POST /:questionId/answers/ with a valid token and known questionId', (done) => {
            const values = {
                answer: "You are jane doe"
            }
            chai.request(server)
                .post('/api/v1/questions/1/answers')
                .set('x-access-token', token)
                .send(values)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.should.not.have.property('error');
                    done();
                });
        });
    }, 2000);
    it('should return 400 for POST /answers with an invalid questionId', (done) => {
        	const values = {
        		answer: "You are jane doe"
        	};
        	chai.request(server)
        	.post('/api/v1/questions/a/answers')
            .set('x-access-token', token)
            .send(values)
        	.end((err, res) => {
        		res.should.have.status(400);
        		res.should.be.json;
        		res.body.should.be.a('Object');
        		res.body.message.should.be.a('string');
        		done();
        	});
        });
        it('should return 404 for POST /answers with an unknow questionId', (done) => {
            	const values = {
                    answer: "You are jane doe"
            	};
            	chai.request(server)
                .post('/api/v1/questions/-100/answers')
                .set('x-access-token', token)
            	.send(values)
            	.end((err, res) => {
            		res.should.have.status(404);
            		res.should.be.json;
            		res.body.should.be.a('Object');
            		res.body.message.should.be.a('string');
            		done();
            	});
            });
});







































































































































































































































































































// // describe('Home route controller', () => {
// // 	it('Should return the home route at /', (done) => {
// // 		chai.request(server)
// // 		.get('/')
// // 		.end((req, res) => {
// // 			res.should.have.status(200);
// // 			res.should.be.json;
// // 			res.body.should.be.a('Object');
// // 			done();
// // 		});
// // 	});
// // });


// // describe('Question route controller', () => {
// // 	it('should return 201 for POST /questions', (done) => {
// // 		const values = {
// // 			id: 1,
// // 			title: 'What is 4.5! (i.e. 4.5 factorial)',
// // 			description: 'How do I find the factorial of a decimal or fractional number',
// // 			answers: 8,
// // 			asker: 'Meeky',
// // 			votes: 0,
// // 			views: 12,
// // 			tags: 'javascript, node.js, json',
// // 			timestamp: 'asked 2hrs ago',
// // 		};
// // 		chai.request(server)
// // 		.post('/api/v1/questions')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			res.should.have.status(201);
// // 			res.should.be.json;
// // 			res.body.should.be.a('Object');
// // 			res.body.message.should.be.a('string');
// // 			done();
// // 		});
// // 	});
// // 	it('Should return 400 for POST /questions with incomplete parameters', (done) => {
// // 		const values = {
// // 			id: 1,
// // 			title: 'What is 4.5! (i.e. 4.5 factorial)',
// // 			description: '',
// // 			answers: 8,
// // 			asker: 'Meeky',
// // 			votes: 0,
// // 			views: 12,
// // 			tags: 'javascript, node.js, json',
// // 			timestamp: 'asked 2hrs ago'
// // 		};
// // 		chai.request(server)
// // 		.post('/api/v1/questions')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			res.should.have.status(400);
// // 			res.should.be.json;
// // 			done();
// // 		});
// // 	});
// // 	it('should return 201 for POST /questions with no ID value', (done) => {
// // 		const values = {
// // 			title: 'What is 4.5! (i.e. 4.5 factorial)',
// // 			description: 'How do I find the factorial of a decimal or fractional number',
// // 			answers: 8,
// // 			asker: 'Meeky',
// // 			votes: 0,
// // 			views: 12,
// // 			tags: 'javascript, node.js, json',
// // 			timestamp: 'asked 2hrs ago',
// // 		};

// // 		chai.request(server)
// // 		.post('/api/v1/questions')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			res.should.have.status(201);
// // 			res.should.be.json;
// // 			res.body.should.be.a('Object');
// // 			res.body.message.should.be.a('string');
// // 			done();
// // 		});
// // 	});
// // 	it('should return 200 for GET /questions', (done) => {	
// // 		chai.request(server)
// // 		.get('/api/v1/questions')
// // 		.end((err, res) => {
// // 			res.should.have.status(200);
// // 			res.should.be.a.json;
// // 			res.should.be.a('Object');
// // 			res.body.should.be.an("Array");
// // 			done();
// // 		});
// // 	});
// // 	it('should return 404 for GET /questions/:questionId with an invalid ID', (done) => {
// // 		chai.request(server)
// // 		.get('/api/v1/questions/a')
// // 		.end((err, res) => {
// // 			res.should.have.status(400);
// // 			res.body.should.be.a('object');
// // 			res.should.be.json;
// // 			done();
// // 		})
// // 	});
// // 	it('should return 404 for GET /questions/:questionId with an unknown ID', (done) => {
// // 		chai.request(server)
// // 		.get('/api/v1/questions/100')
// // 		.end((err, res) => {
// // 			res.should.have.status(404);
// // 			res.body.should.be.a('object');
// // 			res.should.be.json;
// // 			done();
// // 		});
// // 	});
// // });


// // it('Should return 400 for POST /answers with no answer body', (done) => {
// // 	const values = {
// // 		id: 1,
// //         questionId: 1,
// //         answer: '',
// //         upvotes: 8,
// //         downvotes: 0,
// //         respondent: 'Miranda',
// //         views: 122,
// //         tags: 'javascript, node.js, json',
// //         timestamp: 'asked 2hrs ago'
// // 	};
// // 	chai.request(server)
// // 	.post('/api/v1/questions/1/answers')
// // 	.send(values)
// // 	.end((err, res) => {
// // 		res.should.have.status(406);
// // 		res.should.be.json;
// // 		done();
// // 	});
// // });
// it('should return 400 for POST /answers with an invalid questionId', (done) => {
// 	const values = {
// 		id: 1,
//         questionId: 1,
//         answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
//         upvotes: 8,
//         downvotes: 0,
//         respondent: 'Miranda',
//         views: 122,
//         tags: 'javascript, node.js, json',
//         timestamp: 'asked 2hrs ago'
// 	};
// 	chai.request(server)
// 	.post('/api/v1/questions/a/answers')
// 	.send(values)
// 	.end((err, res) => {
// 		res.should.have.status(400);
// 		res.should.be.json;
// 		res.body.should.be.a('Object');
// 		res.body.message.should.be.a('string');
// 		done();
// 	});
// });

// it('should return 400 for POST /answers with an unknow questionId', (done) => {
// 	const values = {
// 		id: 1,
//         questionId: 1,
//         answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
//         upvotes: 8,
//         downvotes: 0,
//         respondent: 'Miranda',
//         views: 122,
//         tags: 'javascript, node.js, json',
//         timestamp: 'asked 2hrs ago'
// 	};
// 	chai.request(server)
// 	.post('/api/v1/questions/100/answers')
// 	.send(values)
// 	.end((err, res) => {
// 		res.should.have.status(404);
// 		res.should.be.json;
// 		res.body.should.be.a('Object');
// 		res.body.message.should.be.a('string');
// 		done();
// 	});
// });


// // describe('User Route Controller', () => {
// // 	it('Should create new user returning status code 201', (done) => {
// // 		const values = {
// // 			id: 1,
// // 			email: 'me@gmail.com',
// // 			username: 'meeky',
// // 			password: 'password'
// // 		};
// // 		chai.request(server)
// // 		.post('/api/v1/users/signup')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			res.should.have.status(201);
// // 			res.body.should.be.a('object');
// // 			done();
// // 		});
// // 	});
// // 	it('Should return 400 for incomplete user signup info', (done) => {
// // 		const values = {
// // 			id: 1,
// // 			email: 'me@gmail.com',
// // 			username: '',
// // 			password: 'password'
// // 		};
// // 		chai.request(server)
// // 		.post('/api/v1/users/signup')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			res.should.have.status(400);
// // 			res.should.be.json;
// // 			res.body.should.be.a('Object');
// // 			done();
// // 		});
// // 	});
// // 	it('Should return 400 for incomplete user login info', (done) => {
// // 		const values = {
// // 			email: 'me@gmail.com',
// // 			password: '',
// // 		};
// // 		chai.request(server)
// // 		.post('/api/v1/users/login')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			res.should.have.status(400);
// // 			res.should.be.json;
// // 			res.body.should.be.a('Object');
// // 			done();
// // 		});
// // 	});
// // 	it('Should return 404 for empty user list/table', (done) => {
// // 		const values = {
// // 			email: "johndoe@mail.com",
// // 			password: 12345
// // 		};
// // 		chai.request(server)
// // 		.get('/api/v1/users')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			res.should.have.status(404);
// // 			res.body.should.be.a('Object');
// // 			done();
// // 		});
// // 	});
// // 	it('Login an existing user', (done) => {
// // 		const values = {
// // 			email: "johndoe@mail.com",
// // 			password: 12345
// // 		};
// // 		chai.request(server)
// // 		.post('/api/v1/users/login')
// // 		.send(values)
// // 		.end((err, res) => {
// // 			console.log(res.body);
// // 			res.should.have.status(200);
// // 			res.body.should.be.a('Object');
// // 			done();
// // 		});
// // 	});
// // });