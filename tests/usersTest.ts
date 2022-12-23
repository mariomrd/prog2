import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const userAdmin = {
    email: 'juhan@tlu.ee',
    password: 'juhan123',
    role: "admin"
};

const userFake = {
    email: 'fake@fake.fk',
    password: 'fake123'
};


describe('Users controller', () => {
  describe('GET /api/v1/users', () => {
    it('responds with error and status 401', async () => {
      const response = await request(app).post('/api/v1/users'); //ilma kasutajata endpointi peale, ei tohiks midagi näha
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal(`Token not found`);
    });
    it('responds with user list and status 200', async () => {
        const login = await request(app).post('/api/v1/login').send(userAdmin); //päring login endpointile
        const token = login.body.token; //salvestan eraldi muutujasse tokeni
        const response = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);// set käsuga seadistan headeri bearer tokeniga
        expect(response.body).to.be.a('object'); 
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.users).to.be.a("array");
        expect(response.body.users.length).to.be.gt(1);
      });
      it('responds with error message and statusCode 404', async () => {
        const login = await request(app).post('/api/v1/login').send(userFake);
        const token = login.body.token;
        const response = await request(app).get('/api/v1/users').set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(401);
        expect(response.body.success).to.false;
        expect(response.body.message).to.be.equal("Token not valid")
      });  
  });
});