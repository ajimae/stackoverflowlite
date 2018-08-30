/*import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const should = chai.should();
chai.use(chaiHttp);


let token = '';
describe('User Route Controller', () => {
  it('should Create New User, when all parameters are complete', (done) => {
    const values = {
	   name: 'jane doe',
	   email: 'janedoe2@mail.com',
	   username: 'jane20',
       password: 'password'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(values)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('user');
        res.body.should.have.property('token');
        done();
      });
  });
  it('should Return 400 (Bad request) for incomplete user details, missing email field in this case', (done) => {
    const values = {
		name: 'jane doe',
		email: '',
		username: 'jane20',
		password: 'password'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('Login an existing user, when all the required parameters in good standing', (done) => {
    const values = {
      email: 'janedoe2@mail.com',
      password: 123,
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Return 401 (Not authorized) for invalid email during login', (done) => {
    const values = {
      email: '2@gmail.com',
      password: 123,
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(values)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.should.not.have.property('user');
        res.body.should.not.have.property('token');
        done();
      });
  });
  it('Return 401 (Not authorized) for invalid password', (done) => {
    const values = {
      email: 'me@gmail.com',
      password: 'hhhhhh',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(values)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.should.not.have.property('user');
        res.body.should.not.have.property('token');
        done();
      });
  });
});*/