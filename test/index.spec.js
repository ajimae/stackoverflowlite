// const expect = require('chai').expect
// const server = require('../index');

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const expect = chai.expect;
const servera = server();

console.log(servera);

const should = chai.should();
chai.use(chaiHttp);
describe('test', () => {
	// it('should return a string', function() {
	// 	expect('ci with travis.').to.equal('ci with travis.');
	// });
	it('Should return a string', () => {
		expect(servera).to.equal('Meeky');
	});
});
