import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';


// const expect = chai.expect;
// const server_app = server();

const should = chai.should();
chai.use(chaiHttp);

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
});

