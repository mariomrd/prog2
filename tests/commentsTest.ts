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

const commentWithId = {
  id: 136
};

const commentWithIdDoesNotExist = {
  id: 999999999
};




describe('Comments controller', () => {
  describe('GET /api/v1/comments', () => {
    it('responds with comments and status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin); //päring login endpointile
      const token = login.body.token; //salvestan eraldi muutujasse tokeni
      const response = await request(app).get('/api/v1/comments').set('Authorization', `Bearer ${token}`);// set käsuga seadistan headeri bearer tokeniga
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.comments).to.be.a("array");
      expect(response.body.comments.length).to.be.gt(1);
    });
    it('responds with one comment and status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin);
      const token = login.body.token;
      const response = await request(app).get(`/api/v1/comments/${commentWithId.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object'); 
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.comment).to.be.a("object");
      expect(response.body.message.startsWith("Kommentaar IDga")).to.be.true;
    });
    it('responds with a message and status 404', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin);
      const token = login.body.token;
      const response = await request(app).get(`/api/v1/comments/${commentWithIdDoesNotExist.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object'); 
      expect(response.statusCode).to.equal(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal("Kommentaari ei leitud");
    });
  })
});