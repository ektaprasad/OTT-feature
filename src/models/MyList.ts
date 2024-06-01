// src/models/MyList.ts
import { Schema, model, Document } from 'mongoose';

interface MyList extends Document {
  userId: string;
  items: string[];
}

const MyListSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: { type: [String], default: [] }
});

const MyListModel = model<MyList>('MyList', MyListSchema);
export default MyListModel;
