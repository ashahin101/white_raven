import request from 'supertest';
import { expressApp as app } from '../App.js';
import { describe, it, expect } from '@jest/globals';

describe('GET /story_trees', () => {
  it('should return a list of story tree objects', async () => {
    const res = await request(app).get('/story_trees');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('length');
  });
});

describe('GET /story_trees/:id', () => {
  it('should return one story tree objects', async () => {
    const res = await request(app).get('/story_trees/story_tree_a');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('meta');
    expect(res.body).toHaveProperty('branches');
  });
});
