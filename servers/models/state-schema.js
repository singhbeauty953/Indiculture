// state-schema.js
import mongoose from 'mongoose';

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const State = mongoose.model('State', stateSchema);

export default State;
