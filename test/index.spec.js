import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';

// const expect = chai.expect;
// const server_app = server();

const should = chai.should();
chai.use(chaiHttp);


// User route controller
describe('User Route Controller', () => {
	it('should Create New User', (done) => {
		const values = {
			id: 1,
			email: 'me@gmail.com',
			username: 'meeky',
			password: 'password'
		};
		chai.request(server)
			.post('/api/v1/users/signup')
			.send(values)
			.end((err, res) => {
				res.should.be.json;
				res.should.have.status(201);
				res.body.should.be.a('object');
				done();
			});
	});
	it('Should return 400 for incomplete user signup info', (done) => {
		const values = {
			id: 1,
			email: 'me@gmail.com',
			username: '',
			password: 'password'
		};
		chai.request(server)
		.post('/api/v1/users/signup')
		.send(values)
		.end((err, res) => {
			res.should.have.status(400);
			res.should.be.json;
			res.body.should.be.a('Object');
			done();
		});
	});
	it('Should return 400 for incomplete user login info', (done) => {
		const values = {
			email: 'me@gmail.com',
			password: ''
		};
		chai.request(server)
		.post('/api/v1/users/login')
		.send(values)
		.end((err, res) => {
			res.should.have.status(400);
			res.should.be.json;
			res.body.should.be.a('Object');
			done();
		});
	});
	it('Login an existing user', (done) => {
		const values = {
			email: 'me@gmail.com',
			password: 'password',
		};
		chai.request(server)
		.post('/api/v1/users/login')
		.send(values)
		.end((err, res) => {
			if (err)
				done(err);
			res.should.have.status(200);
			res.body.should.be.a('Object');
			done();
		});
	});
});














// Home route controller
describe('Home route controller', () => {
	it('Should return a string', (done) => {
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
	it('Should return an array of questions', (done) => {
		chai.request(server)
		.get('/api/v1/questions')
		.end((req, res) => {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('Array');
			res.body[0].id.should.be.a('Number');
			res.body[0].title.should.be.a('String');
			done();
		});
	});
	it('should return 400 for POST /questions with incomplete parameters', (done) => {
		const values = {
			id: 1,
			title: 'What is 4.5! (i.e. 4.5 factorial)',
			description: 'How do I find the factorial of a decimal or fractional number',
			// answers: 8,
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
			res.should.have.status(400);
			res.should.be.json;
			res.body.should.be.a('Object');
			res.body.message.should.be.a('string');
			done();
		  });
	  });
	  it('should return 400 for PUT /questions with incomplete parameters', (done) => {
		const values = {
			id: 1,
			title: 'What is 4.5! (i.e. 4.5 factorial)',
			description: 'How do I find the factorial of a decimal or fractional number',
			// answers: 8,
			asker: 'Meeky',
			votes: 0,
			views: 12,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago',
		};
		chai.request(server)
		.put('/api/v1/questions/1')
		.send(values)
		.end((err, res) => {
			res.should.have.status(400);
			res.should.be.json;
			done();
		});
	});
	//   // it('should return 200 for PUT /entries with complete parameters', (done) => {
	//   //   const values = {
	//   //     title: 'new teacher',
	//   //     category: 'education',
	//   //     subCategory: 'jss1',
	//   //     content: 'i was flogged',
	//   //   };
	//   //   chai.request(server)
	//   //     .put('/api/v1/entries/1')
	//   //     .set('x-access-token', token)
	//   //     .send(values)
	//   //     .end((err, res) => {
	//   //       res.should.have.status(200);
	//   //       res.body.should.be.a('object');
	//   //       res.body.should.have.property('success');
	//   //       res.body.should.have.property('entry');
	//   //       done();
	//   //     });
	//   // });
	//   it('should return 401 for any entry endpoint without a token', (done) => {
	// 	chai.request(server)
	// 	  .get('/api/v1/entries')
	// 	  .end((err, res) => {
	// 		res.should.have.status(401);
	// 		res.body.should.be.a('object');
	// 		res.body.should.have.property('error');
	// 		res.body.should.not.have.property('entries');
	// 		done();
	// 	  });
	//   });
	//   it('should return 200 for GET /entries/:id with a valid token', (done) => {
	// 	chai.request(server)
	// 	  .get('/api/v1/entries/1')
	// 	  .set('x-access-token', token)
	// 	  .end((err, res) => {
	// 		res.should.have.status(200);
	// 		res.body.should.be.a('object');
	// 		res.body.should.have.property('success');
	// 		res.body.should.have.property('entry');
	// 		res.body.should.not.have.property('error');
	// 		done();
	// 	  });
	//   });
	//   it('should return 200 for GET /entries with a valid token', (done) => {
	// 	chai.request(server)
	// 	  .get('/api/v1/entries')
	// 	  .set('x-access-token', token)
	// 	  .end((err, res) => {
	// 		res.should.have.status(200);
	// 		res.body.should.be.a('object');
	// 		res.body.should.have.property('success');
	// 		res.body.should.have.property('entries');
	// 		res.body.should.not.have.property('error');
	// 		done();
	// 	  });
	//   });
	//   it('should return 404 for GET /entries/:id with a valid token and unknown id', (done) => {
	// 	chai.request(server)
	// 	  .get('/api/v1/entries/100')
	// 	  .set('x-access-token', token)
	// 	  .end((err, res) => {
	// 		res.should.have.status(404);
	// 		res.body.should.be.a('object');
	// 		res.body.should.have.property('error');
	// 		res.body.should.not.have.property('success');
	// 		done();
	// 	  });
	//   });
	
});
