import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';


// const expect = chai.expect;
// const server_app = server();

const should = chai.should();
chai.use(chaiHttp);

// User route controller
describe('User Route Controller', () => {
	it('Should return 201 for POST', (done) => {
		const values = {
			id: 1,
			questionId: 2,
			answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
			upvotes: 8,
			downvotes: 0,
			respondent: 'Miranda',
			views: 122,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago',
		};
		chai.request(server)
		.post('/api/v1/1/answers')
		.send(values)
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			done();
		});
	});
	it('Should return 400 for null answer body', (done) => {
		const values = {
			id: 1,
			questionId: 2,
			answer: '',
			upvotes: 8,
			downvotes: 0,
			respondent: 'Miranda',
			views: 122,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago',
		};
		chai.request(server)
		.post('/api/v1/1/answers')
		.send(values)
		.end((err, res) => {
			res.should.have.status(406);
			res.should.be.json;
			res.body.should.be.a('Object');
			done();
		});
	});
	it('Should return 400 for POST /:questionId with invalid questionId', (done) => {
		const values = {
			id: 1,
			questionId: 2,
			answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
			upvotes: 8,
			downvotes: 0,
			respondent: 'Miranda',
			views: 122,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago',
		};
		chai.request(server)
		.post('/api/v1/s/answers')		//Used an invalid letter 's' instead of a number.
		.send(values)
		.end((err, res) => {
			res.should.have.status(400);
			res.should.be.json;
			res.body.should.be.a('Object');
			done();
		});
	});
	it('Should return 404 for POST /:questionId/answer with IDs that is not found', (done) => {
		const values = {
			id: 1,
			questionId: 2,
			answer: 'Go read about the gamma function, it defines the factorial of a decimal number.',
			upvotes: 8,
			downvotes: 0,
			respondent: 'Miranda',
			views: 122,
			tags: 'javascript, node.js, json',
			timestamp: 'asked 2hrs ago',
		};
		chai.request(server)
		.post('/api/v1/8/answers')		//Used an invalid letter 's' instead of a number.
		.send(values)
		.end((err, res) => {
			res.should.have.status(404);
			res.should.be.json;
			res.body.should.be.a('Object');
			done();
		});
	});
});
