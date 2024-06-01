
import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import app from '../app';
import MyListModel from '../models/MyList';
import UserModel from '../models/User';

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/stageOTTforTest');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('My List API', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
    await MyListModel.deleteMany({});
  });

  it('should add an item to the list', async () => {
    await UserModel.create({
      id: 'user1',
      username: 'john_doe',
      preferences: {
        favoriteGenres: ['Action', 'Comedy'],
        dislikedGenres: ['Horror']
      },
      watchHistory: [
        {
          contentId: 'movie1',
          watchedOn: new Date(),
          rating: 5
        }
      ]
    });

    const response = await request(app)
      .post('/api/mylist/add')
      .send({ userId: 'user1', itemId: 'item1' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item added to list');

    const list = await MyListModel.findOne({ userId: 'user1' });
    expect(list).toBeTruthy();
    expect(list?.items).toContain('item1');
  });

  it('should not add duplicate items to the list', async () => {
    await MyListModel.create({ userId: 'user2', items: ['item2'] });

    const response = await request(app)
      .post('/api/mylist/add')
      .send({ userId: 'user2', itemId: 'item2' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item added to list');

    const list = await MyListModel.findOne({ userId: 'user2' });
    expect(list).toBeTruthy();
    expect(list?.items.length).toBe(1);
  });

  it('should remove an item from the list', async () => {
    await MyListModel.create({ userId: 'user3', items: ['item3'] });

    const response = await request(app)
      .post('/api/mylist/remove')
      .send({ userId: 'user3', itemId: 'item3' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item removed from list');

    const list = await MyListModel.findOne({ userId: 'user3' });
    expect(list).toBeTruthy();
    expect(list?.items).not.toContain('item3');
  });

  it('should return 404 if the user\'s list is not found', async () => {
    const response = await request(app)
      .get('/api/mylist/user6')
      .query({ page: 1, limit: 1 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('List not found');
  });
});
