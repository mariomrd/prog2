import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const registerNewUserCorrect = {
    firstName: "Test",
    lastName: "Subject",
    email: 'juhanTest@tlu.ee',
    password: 'juhan123'
};

const registerNewUserNumberPresent = {
    firstName: "Test123",
    lastName: "Subject",
    email: 'juhan@tlu.ee',
    password: 'juhan123'
};

const registerNewUserMissingName = {
    firstName: "",
    lastName: "Subject",
    email: 'juhan@tlu.ee',
    password: 'juhan123'
};

const registerNewUserFalseEmail = {
    firstName: "Test123",
    lastName: "Subject",
    email: 'juhantluee',
    password: 'juhan123'
};


describe('POST /api/v1/register', () => {
    it('responds with error message and status 400', async () => {
      const response = await request(app).post('/api/v1/register').send(registerNewUserNumberPresent);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.success).to.false;
      expect(response.body.message).to.be.equal("Eesnimi ega perenimi ei tohi sisaldada numbrit. Sorry.")
    });
    it('responds with error message and status 400', async () => {
        const response = await request(app).post('/api/v1/register').send(registerNewUserMissingName);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.success).to.false;
        expect(response.body.message).to.be.equal("Osa nõutavatest väljadest on puudu (firstName, lastName, email, password)")
      });
    it('responds with message User created and status 201', async () => {
        const response = await request(app).post('/api/v1/register').send(registerNewUserCorrect);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(response.body.success).to.true;
        expect(response.body.message.startsWith("Kasutaja e-mailiga")).to.be.true;
        
      });
      it('responds with error message and status 400', async () => {
        const response = await request(app).post('/api/v1/register').send(registerNewUserFalseEmail);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.success).to.false;
        expect(response.body.message).to.be.a("string");
        expect(response.body.message).to.be.equal("Palun sisesta korrektne e-mail aadress");
      }); 
});

export default registerNewUserCorrect;