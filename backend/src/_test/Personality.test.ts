import request from 'supertest';
import { expressApp as app } from '../App.js';
import { describe, it, expect } from '@jest/globals';

describe('GET /personalities', () => {
  it('should return a list of personality objects', async () => {
    const res = await request(app).get('/personalities');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('length');
  });
});

describe('GET /personalities/:id', () => {
  it('should return one personality object', async () => {
    const res = await request(app).get('/personalities/INTJ');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
  });
});
