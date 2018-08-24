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
	it('should return 404 for GET /questions/:questionId with an invalid ID', (done) => {
		chai.request(server)
		.get('/api/v1/questions/a')
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			res.should.be.json;
			done();
		});
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
	it('should return 404 for GET /questions/:questionId with an unknown url', (done) => {
		chai.request(server)
		.get('/api/v1/question/100') //removed the 's' in /questions/..
		.end((err, res) => {
			res.should.have.status(404);
			done();
		});
	});	
});
