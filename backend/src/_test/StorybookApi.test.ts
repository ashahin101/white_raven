import request from 'supertest';
import { expressApp as app } from '../App';
import { describe, it, expect } from '@jest/globals';

describe('GET /storybooks', () => {
  it('should return a list of storybook objects', async () => {
    const res = await request(app).get('/storybooks');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('length');
  });
});

describe('GET /storybooks/:id', () => {
  it('should return one storybook objects', async () => {
    const res = await request(app).get('/storybooks/story_a');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('meta');
    expect(res.body).toHaveProperty('nodes');
  });
});
