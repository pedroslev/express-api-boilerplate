//mongo db requirements
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const { Schema } = mongoose;

dotenv.config()

import {checkConsistency} from './services.js'


//----------------------------Mongo DB----------------------------
const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBNAME}.wmgqh.mongodb.net/${process.env.CLIENT}?retryWrites=true&w=majority`)
    checkConsistency(); 
  }

  //DD connection trycatch
  try {
    connectDB();    
  } catch (error) {
    console.error(error)
  }

  //------------Schemas------------
  //User schema
  const usersSchema = new Schema({name: String, surname: String, email: String, password: String, role: String, client: String, start: String, end: String, job: String, active: Boolean })
  usersSchema.path('_id');


  //------------Models------------
  const Users = mongoose.model('users', usersSchema)

//----------------------------EXPORTS----------------------------
export{
    Users
}