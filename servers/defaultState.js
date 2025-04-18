import { statesData } from "./constants/statedata.js";
import State from "./models/state-schema.js";

const DefaultStateData=async ()=>{
    try {

        await State.deleteMany({});
       await State.insertMany(statesData)
        console.log("Data Inserted Successfully");
        
    } catch (error) {
        console.log("Error while inserting data",error.message);
    }
}

export default DefaultStateData;