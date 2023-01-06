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

const postWithId = {
  id: 56
};


describe('Posts controller', () => {
  describe('GET /api/v1/posts', () => {
    it('responds with error and status 401', async () => {
      const response = await request(app).post('/api/v1/posts/'); //ilma kasutajata endpointi peale, ei tohiks midagi näha
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal(`Token not found`);
    });
    it('responds with posts list and status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin); //päring login endpointile
      const token = login.body.token; //salvestan eraldi muutujasse tokeni
      const response = await request(app).get('/api/v1/posts').set('Authorization', `Bearer ${token}`);// set käsuga seadistan headeri bearer tokeniga
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.posts).to.be.a("array");
      expect(response.body.posts.length).to.be.gt(1);
    });
    it('responds with a post and status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin);
      const token = login.body.token;
      const response = await request(app).get(`/api/v1/posts/${postWithId.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.post).to.be.a("object");
      expect(response.body.message.startsWith("Post with id")).to.be.true;
    });

  });
  describe('POST /api/v1/posts', () => {
   
  });
});