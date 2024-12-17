import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    console.log('Connected to MongoDB !!');
  } catch (error) {
    console.log(`There was issue connecting to mongoDB ${error}`);
  }
};

export default db;
