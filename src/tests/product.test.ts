import request from 'supertest';
import app from '../server.ts'; // Adjust this path as necessary

describe('GET /v1/product', () => {
  it('should return all products', async () => {
    const response = await request(app)
      .get('/v1/products')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200);

    expect(response.statusCode).toBe(200);
  });
});

describe('GET /', () => {
  it('should render the home page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
    expect(response.text).toContain('Mocked Template');
  });
});
