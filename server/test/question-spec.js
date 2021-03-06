import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const should = chai.should();
chai.use(chaiHttp);

let token = '';

describe('Home route controller', () => {
	it('should Create New User, when all parameters are complete', (done) => {
    const values = {
        name: 'jane doe',
        email: 'janedoe600@mail.com',
        username: 'jane600',
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


describe('Question route controller', () => {
    it('should return 200 (OK) for POST /questions with a valid token', (done) => {
        const values = {
        	title: "How do I sleep for 2 hours in 1 hour",
	        description: "Just sleep for two hours when you wake up set your time one hour backwards"
        };
        chai.request(server)
        .post('/api/v1/questions')
        .set('x-access-token', token)
        .send(values)
        .end((err, res) => {
			res.should.have.status(201);
			res.should.be.json;
            done();
        });
    });
	it('should return 201: (Created successfully) for POST /questions', (done) => {
		const values = {
			title: 'What is 4.5! (i.e. 4.5 factorial)',
			description: 'How do I find the factorial of a decimal or fractional number',
		};
		chai.request(server)
        .post('/api/v1/questions')
        .set('x-access-token', token)
		.send(values)
		.end((err, res) => {
			res.should.have.status(201);
			res.should.be.json;
			done();
		});
	});
	it('Should return 400 (Bad Request) for POST /questions with incomplete parameters', (done) => {
		const values = {
			title: 'What is 4.5! (i.e. 4.5 factorial)',
			description: ''
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(values)
		.end((err, res) => {
			res.should.have.status(401);
			res.should.be.json;
			done();
		});
	});
	it('should return 200 (Created) for GET /questions', (done) => {	
		chai.request(server)
		.get('/api/v1/questions')
		.end((err, res) => {
			res.should.have.status(201);
			res.should.be.a.json;
			res.should.be.a('Object');
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
});
