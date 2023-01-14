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
  commentId: 136
};

const commentWithIdDoesNotExist = {
  commentId: 999999999
};
const commentToAdd = {
  postId: 1,
  content: "add comments test",
};

const emptyComment = {

}

const commentToDelete = {
  commentId: 2
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
      const response = await request(app).get(`/api/v1/comments/${commentWithId.commentId}`).set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.comment).to.be.a("object");
      expect(response.body.message.startsWith("Kommentaar IDga")).to.be.true;
    });
    it('responds with a message and status 404', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin);
      const token = login.body.token;
      const response = await request(app).get(`/api/v1/comments/${commentWithIdDoesNotExist.commentId}`).set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.equal("Kommentaari ei leitud");
    });
  })
  describe('POST /api/v1/comments', () => {
    it('posts a comment and responds with status 201', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin); //päring login endpointile
      const token = login.body.token; //salvestan eraldi muutujasse tokeni
      const response = await request(app).post('/api/v1/comments/').set('Authorization', `Bearer ${token}`).send(commentToAdd);// set käsuga seadistan headeri bearer tokeniga
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body.success).to.be.true;
    });
    it('fails to post a comment and responds with status 400', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin); //päring login endpointile
      const token = login.body.token; //salvestan eraldi muutujasse tokeni
      const response = await request(app).post('/api/v1/comments/').set('Authorization', `Bearer ${token}`).send(emptyComment);// set käsuga seadistan headeri bearer tokeniga
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.success).to.be.false;
    });
  })
  describe('DELETE /api/v1/comments', () => {
    it('fails to delete a comment and responds with status 404', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin); 
      const token = login.body.token; 
      const response = await request(app).delete('/api/v1/comments/').set('Authorization', `Bearer ${token}`).send(commentWithIdDoesNotExist);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(404);
    });
    /* it('deletes a comment and responds with status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin); 
      const token = login.body.token; 
      await pool.query(`UPDATE comment SET deletedDate=NULL WHERE commentId=?`, [commentToDelete]);
      const response = await request(app).delete('/api/v1/comments/').set('Authorization', `Bearer ${token}`).send(commentToDelete);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
    }); */
  })
});