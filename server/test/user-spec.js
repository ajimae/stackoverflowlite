import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const should = chai.should();
chai.use(chaiHttp);


let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqYW5lZG9lQG1haWwuY29tIiwiaWF0IjoxNTM1Njc4MDI3LCJleHAiOjE1MzU4NTA4Mjd9.fvwcfH1MEQHUpm_HbxIijyJ81aFNo6odBVsnt3nFpZE';
describe('User Route Controller', () => {
//   it('should Create New User, when all parameters are complete', (done) => {
//     const values = {
//         name: 'jane doe',
//         email: 'janedoe500@mail.com',
//         username: 'jane500',
//         password: 123,
//         confirmPass: 123
//     };
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send(values)
//       .end((err, res) => {
//         token = res.body.token;
//         res.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.should.have.property('user');
//         res.body.should.have.property('token');
//         done();
//       });
//   });
  it('should return 409 (Conflict) POST /signup for signup using existing details', (done) => {
    const values = {
        name: 'jane doe',
        email: 'janedoe91@mail.com',
        username: 'jane91',
        password: 123,
        confirmPass: 123
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(values)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should Return 400 (Bad request) for incomplete user details, missing email field in this case', (done) => {
    const values = {
		name: 'jane doe',
		email: '',
		username: 'jane20',
    password: 'password',
    confirmPass: 'password'
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
      email: 'janedoe@mail.com',
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
});