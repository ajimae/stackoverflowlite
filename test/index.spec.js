import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';


// const expect = chai.expect;
// const server_app = server();

const should = chai.should();
chai.use(chaiHttp);


// Home route controller
describe('Home route controller', () => {
	it('Should return the home route at /', (done) => {
		chai.request(server)
		.get('/')
		.end((req, res) => {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('Object');
			done();
		});
	});
});


// Questions controller
describe('Question route controller', () => {
	it('should return 201 for POST /questions', (done) => {
		const values = {
			id: 1,
			title: 'What is 4.5! (i.e. 4.5 factorial)',
			description: 'How do I find the factorial of a decimal or fractional number',
			answers: 8,
			asker: 'Meeky',
			votes: 0,
			views: 12,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago',
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(values)
		.end((err, res) => {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('Object');
			res.body.message.should.be.a('string');
			done();
		});
	});
	it('Should return 400 for POST /questions with incomplete parameters', (done) => {
		const values = {
			id: 1,
			title: 'What is 4.5! (i.e. 4.5 factorial)',
			description: '',
			answers: 8,
			asker: 'Meeky',
			votes: 0,
			views: 12,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago'
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(values)
		.end((err, res) => {
			res.should.have.status(400);
			res.should.be.json;
			done();
		});
	});
	it('should return 201 for POST /questions with no ID value', (done) => {
		const values = {
			//id: 1,
			title: 'What is 4.5! (i.e. 4.5 factorial)',
			description: 'How do I find the factorial of a decimal or fractional number',
			answers: 8,
			asker: 'Meeky',
			votes: 0,
			views: 12,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago',
		};
		
		chai.request(server)
		.post('/api/v1/questions')
		.send(values)
		.end((err, res) => {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('Object');
			res.body.message.should.be.a('string');
			done();
		});
	});
	it('should return 200 for GET /questions', (done) => {	
		chai.request(server)
		.get('/api/v1/questions')
		.end((err, res) => {
			res.should.have.status(200);
			res.should.be.a.json;
			res.should.be.a('Object');
			res.body.should.be.an("Array");
			done();
		});
	});
	it('should return 404 for GET /questions/:questionId with an invalid ID', (done) => {
		chai.request(server)
		.get('/api/v1/questions/a')
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			res.should.be.json;
			done();
		})
	});
	it('should return 404 for GET /questions/:questionId with an unknown ID', (done) => {
		chai.request(server)
		.get('/api/v1/questions/100')
		.end((err, res) => {
			res.should.have.status(404);
			res.body.should.be.a('object');
			res.should.be.json;
			done();
		});
	});
});


/**
 * Post Answers route
 */

it('Should return 400 for POST /answers with no answer body', (done) => {
	const values = {
		id: 1,
        questionId: 1,
        //answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
        upvotes: 8,
        downvotes: 0,
        respondent: 'Miranda',
        views: 122,
        tags: 'javascript, node.js, json',
        timestamp: 'asked 2hrs ago'
	};
	chai.request(server)
	.post('/api/v1/questions/1/answers')
	.send(values)
	.end((err, res) => {
		res.should.have.status(406);
		res.should.be.json;
		done();
	});
});
it('should return 400 for POST /answers with an invalid questionId', (done) => {
	const values = {
		id: 1,
        questionId: 1,
        answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
        upvotes: 8,
        downvotes: 0,
        respondent: 'Miranda',
        views: 122,
        tags: 'javascript, node.js, json',
        timestamp: 'asked 2hrs ago'
	};
	chai.request(server)
	.post('/api/v1/questions/a/answers')
	.send(values)
	.end((err, res) => {
		res.should.have.status(400);
		res.should.be.json;
		res.body.should.be.a('Object');
		res.body.message.should.be.a('string');
		done();
	});
});

it('should return 400 for POST /answers with an unknow questionId', (done) => {
	const values = {
		id: 1,
        questionId: 1,
        answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
        upvotes: 8,
        downvotes: 0,
        respondent: 'Miranda',
        views: 122,
        tags: 'javascript, node.js, json',
        timestamp: 'asked 2hrs ago'
	};
	chai.request(server)
	.post('/api/v1/questions/100/answers')
	.send(values)
	.end((err, res) => {
		res.should.have.status(404);
		res.should.be.json;
		res.body.should.be.a('Object');
		res.body.message.should.be.a('string');
		done();
	});
});




































































































































































































// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../server/index';


// // const expect = chai.expect;
// // const server_app = server();

// const should = chai.should();
// chai.use(chaiHttp);



// // User route controller
// describe('User Route Controller', () => {
// 	it('Should create new user returning status code 201', (done) => {
// 		const values = {
// 			id: 1,
// 			email: 'me@gmail.com',
// 			username: 'meeky',
// 			password: 'password'
// 		};
// 		chai.request(server)
// 		.post('/api/v1/users/signup')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(201);
// 			res.body.should.be.a('object');
// 			done();
// 		});
// 	});
// 	it('Should return 400 for incomplete user signup info', (done) => {
// 		const values = {
// 			id: 1,
// 			email: 'me@gmail.com',
// 			username: '',
// 			password: 'password'
// 		};
// 		chai.request(server)
// 		.post('/api/v1/users/signup')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.should.be.json;
// 			res.body.should.be.a('Object');
// 			done();
// 		});
// 	});
// 	it('Should return 400 for incomplete user login info', (done) => {
// 		const values = {
// 			email: 'me@gmail.com',
// 			password: '',
// 		};
// 		chai.request(server)
// 		.post('/api/v1/users/login')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.should.be.json;
// 			res.body.should.be.a('Object');
// 			done();
// 		});
// 	});
// 	// it('Should return 404 for empty user list/table', (done) => {
// 	// 	const values = {
// 	// 		email: "johndoe@mail.com",
// 	// 		password: 12345
// 	// 	};
// 	// 	chai.request(server)
// 	// 	.get('/api/v1/users')
// 	// 	.send(values)
// 	// 	.end((err, res) => {
// 	// 		res.should.have.status(404);
// 	// 		res.body.should.be.a('Object');
// 	// 		done();
// 	// 	});
// 	// });
// 	// it('Login an existing user', (done) => {
// 	// 	const values = {
// 	// 		email: "johndoe@mail.com",
// 	// 		password: 12345
// 	// 	};
// 	// 	chai.request(server)
// 	// 	.post('/api/v1/users/login')
// 	// 	.send(values)
// 	// 	.end((err, res) => {
// 	// 		console.log(res.body);
// 	// 		res.should.have.status(200);
// 	// 		res.body.should.be.a('Object');
// 	// 		done();
// 	// 	});
// 	// });
// });














// // Home route controller
// describe('Home route controller', () => {
// 	it('Should return the home route at /', (done) => {
// 		chai.request(server)
// 		.get('/')
// 		.end((req, res) => {
// 			res.should.have.status(200);
// 			res.should.be.json;
// 			res.body.should.be.a('Object');
// 			done();
// 		});
// 	});
// });


// // Questions controller
// describe('Question route controller', () => {
// 	it('Should return all array of questions', (done) => {
// 		chai.request(server)
// 		.get('/api/v1/questions')
// 		.end((req, res) => {
// 			res.should.have.status(200);
// 			res.should.be.json;
// 			res.body.should.be.a('Array');
// 			res.body[0].id.should.be.a('Number');
// 			res.body[0].title.should.be.a('String');
// 			done();
// 		});
// 	});
// 	it('should return 201 for POST /question', (done) => {
// 		const values = {
// 			id: 1,
// 			title: 'What is 4.5! (i.e. 4.5 factorial)',
// 			description: 'How do I find the factorial of a decimal or fractional number',
// 			answers: 8,
// 			asker: 'Meeky',
// 			votes: 0,
// 			views: 12,
// 			tags: 'javascript, node.js, json',
// 			timestamp: 'asked 2hrs ago',
// 		};
// 		chai.request(server)
// 		.post('/api/v1/questions')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(201);
// 			res.should.be.json;
// 			res.body.should.be.a('Object');
// 			res.body.message.should.be.a('string');
// 			done();
// 		});
// 	});
// 	// it('Should return 404 for a an empty or null questions array/array', (done) => {
// 	// 	chai.request(server)
// 	// 	.get('/api/v1/questions')
// 	// 	.end((req, res) => {
// 	// 		res.should.have.status(404);
// 	// 		res.should.be.json;
// 	// 		res.body.should.be.a('Object');
// 	// 		res.body[0].id.should.be.a('Number');
// 	// 		res.body[0].title.should.be.a('String');
// 	// 		done();
// 	// 	});
// 	// });
// 	it('Should return 400 for PUT /questions with incomplete parameters', (done) => {
// 		const values = {
// 			title: 'What is 4.5! (i.e. 4.5 factorial)',
// 			description: '',
// 		};
// 		chai.request(server)
// 		.put('/api/v1/questions/1')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.should.be.json;
// 			done();
// 		});
// 	});
// 	it('Should return 200 for PUT /questions with title and description', (done) => {
// 		const values = {
// 			id: 1,
// 			title: 'What is 4.5! (i.e. 4.5 factorial)',
// 			description: 'How do I find the factorial of a decimal or fractional number',
// 		};
// 		chai.request(server)
// 		.put('/api/v1/questions/1')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(200);
// 			res.should.be.json;
// 			done();
// 		});
// 	});
//     it('should return 200 for PUT /questions/:quesionId with a valid ID', (done) => {
// 		const values = {
// 			title: 'What is 4.5! (i.e. 4.5 factorial)',
// 			description: 'How do I find the factorial of a decimal or fractional number',
// 		};
// 		chai.request(server)
// 		.put('/api/v1/questions/1')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(200);
// 			res.body.should.be.a('object');
// 			res.should.be.json;
// 			done();
// 		});
//     });
// 	it('should return 400 for PUT /question/:questionId with an invalid quesion ID', (done) => {
// 		const values = {
// 			title: 'How do I master Javascript?',
// 			description: 'Use MDN web portal for your reference and tutorials',
// 		};
// 		chai.request(server)
// 		.put('/api/v1/questions/a')
// 		.send(values)
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.body.should.be.a('object');
// 			res.should.be.json;
// 			done();
// 		});
//     });
//     it('should return 404 for PUT /question/questionId for ID that is out of range', (done) => {
//         chai.request(server)
//         .put('/api/v1/questions/-5')
//         .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.be.a('object');
//             res.should.be.json;
//             done();
//         });
//     });
// 	it('should return 404 for GET /questions/:questionId with an invalid ID', (done) => {
// 		chai.request(server)
// 		.get('/api/v1/questions/a')
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.body.should.be.a('object');
// 			res.should.be.json;
// 			done();
// 		});
// 	});
// 	it('should return 404 for GET /questions/:questionId with an unknown ID', (done) => {
// 		chai.request(server)
// 		.get('/api/v1/questions/100')
// 		.end((err, res) => {
// 			res.should.have.status(404);
// 			res.body.should.be.a('object');
// 			res.should.be.json;
// 			done();
// 		});
// 	});
// 	// it('should return 404 for GET /questions when there is empty list or table', (done) => {
// 	// 	chai.request(server)
// 	// 	.get('/api/v1/questions')
// 	// 	.end((err, res) => {
// 	// 		res.should.have.status(404);
// 	// 		res.body.should.be.a('object');
// 	// 		res.should.be.json;
// 	// 		done();
// 	// 	});
// 	// });
// 	// it('should return 404 for GET /questions/:questionId when there is empty list or table', (done) => {
// 	// 	chai.request(server)
// 	// 	.get('/api/v1/questions/1')
// 	// 	.end((err, res) => {
// 	// 		res.should.have.status(404);
// 	// 		res.body.should.be.a('object');
// 	// 		res.should.be.json;
// 	// 		done();
// 	// 	});
// 	// });
	
// });
