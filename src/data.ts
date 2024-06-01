// src/data.js
import mongoose, { ConnectOptions } from 'mongoose';
import UserModel from './models/User';
import MyListModel from './models/MyList';

const seedData = async () => {
  await mongoose.connect('mongodb://localhost:27017/stageOTT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions);

  await UserModel.create([
    {
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
    }
  ]);

  await MyListModel.create([
    {
      userId: 'user1',
      items: ['movie1']
    }
  ]);

  await mongoose.connection.close();
};

seedData().then(() => {
  console.log('Data seeded');
});
