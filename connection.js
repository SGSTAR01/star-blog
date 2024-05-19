import { connect } from 'mongoose';


function connectDB(uri,options) {
  try{
    connect(uri,options);
    console.log('MongoDB connected');
  }
    catch(err){
        console.log("Error in connecting to MongoDB");
    }
}

export default connectDB;