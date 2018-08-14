// const expect = require('chai').expect
// const server = require('../index');

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const should = chai.should();

describe('test', () => {
	// it('should return a string', function() {
	// 	expect('ci with travis.').to.equal('ci with travis.');
	// });

	chai.request(server)
		.end((req, res) => {
			res.should.be.a('string');
		});
});
