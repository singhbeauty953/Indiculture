import mongoose from 'mongoose'


export const Connection = async (username, password)=>{
    const URL =`mongodb+srv://${username}:${password}@test-db.j048a.mongodb.net/?retryWrites=true&w=majority&appName=Test-db`;
   
    try{

       await mongoose.connect(URL);
       console.log("Database connected ");

    }catch(error){
        console.log('Error while connecting databse',error.message);
    }
    
}
export default Connection;