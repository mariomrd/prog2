import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';
import registerNewUserCorrect from './registerTest';
import pool from '../src/database';
import { IUserSQL } from '../src/components/users/usersInterfaces';
import { FieldPacket } from 'mysql2';

const userAdmin = {
  email: 'juhan@tlu.ee',
  password: 'juhan123',
  role: "admin"
};

const userFake = {
  email: 'fake@fake.fk',
  password: 'fake123'
};

function modifyUserWithRandomString() {
  let randomString = (Math.random() + 1).toString(36).substring(7);
  const modifyUser = {
    firstname: `${randomString}`,
    lastname: `${randomString}`
  }
  return modifyUser;
}

//loob uue kasutaja, mida saab siis kustutada
async function briefNewUser() {
  await request(app).post('/api/v1/register').send(registerNewUserCorrect);
  const idToDelete = await pool.query('SELECT id FROM user ORDER BY id DESC LIMIT 1');
  console.log("Siin on ajutine uus id: ", idToDelete);
  return idToDelete;
}


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
    it('responds with one user and status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin);
      const token = login.body.token;
      const response = await request(app).get('/api/v1/users/101').set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
    });
  });
  
  describe('PATCH /api/v1/users/:id', () => {
    it('modifies user info and responds with status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin);
      const token = login.body.token;
      const response = await request(app).patch('/api/v1/users/1').set('Authorization', `Bearer ${token}`).send(modifyUserWithRandomString());
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
    });
  });
  describe('DELETE /api/v1/users/:id', () => {
    it('deletes user and responds with status 200', async () => {
      const login = await request(app).post('/api/v1/login').send(userAdmin);
      const token = login.body.token;
      const [querySQL]: [IUserSQL[], FieldPacket[]] = await pool.query('SELECT id FROM user ORDER BY id DESC LIMIT 1');
      const query = querySQL[0]
      const latestId = query.id
      const response = await request(app).delete(`/api/v1/users/${latestId}`).set('Authorization', `Bearer ${token}`).send();
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.be.true;
    });
  });
});