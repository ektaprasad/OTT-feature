import mongoose from 'mongoose';
import app from './app';
import { ConnectOptions } from 'mongoose';
const PORT = process.env.PORT || 3000;
const MONGO_URL = 'mongodb://localhost:27017/stageOTT';

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
  console.error('Database connection error:', err);
});
