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
	it('Should return 200 for GET /questins', (done) => {
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
	it('Should return 404 for GET /question', (done) => {
		chai.request(server)
		.get('/api/v1/question')
		.end((req, res) => {
			res.should.have.status(404);
			done();
		});
	});
});
