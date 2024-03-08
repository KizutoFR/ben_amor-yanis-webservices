import mongoose from 'mongoose';

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[mongo] Database connected');
  } catch(err) {
    console.error(err);
  }
}
export default connect;