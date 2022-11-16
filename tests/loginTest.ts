import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const userAdmin = {
    email: 'jroot@tlu.ee',
    password: 'juhan123',
    isAdmin: "true"
};

const userFake = {
    email: 'fake@fake.fk',
    password: 'fake123'
};

//fake user login
describe('Login controller', () => {
  describe('POST /api/v1/login', () => {
    it('responds with error and status 404', async () => {
      const response = await request(app).post('/api/v1/login').send(userFake);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal(`Kasutajat ei leitud`);
    });
    it('responds with token and status 200', async () => {
        const response = await request(app).post('/api/v1/login').send(userAdmin);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.token).to.be.a(`string`);
      });
  });
});