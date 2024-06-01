import { Schema, model, Document } from 'mongoose';

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

interface WatchHistory {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}

interface User extends Document {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: WatchHistory[];
}

const UserSchema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: { type: [String], required: true },
    dislikedGenres: { type: [String], required: true }
  },
  watchHistory: [
    {
      contentId: { type: String, required: true },
      watchedOn: { type: Date, required: true },
      rating: { type: Number }
    }
  ]
});

const UserModel = model<User>('User', UserSchema);
export default UserModel;
