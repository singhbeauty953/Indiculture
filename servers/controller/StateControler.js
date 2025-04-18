import State from "../models/state-schema.js"; // Make sure this is the correct path

export const getStates = async (request, response) => {
  try {
    // Wait for the query to complete
    const states = await State.find({});

    // If no states are found, return an appropriate message
    if (!states || states.length === 0) {
      return response.status(404).json({ message: 'No states found' });
    }

    // Send the found states back as a response
    response.status(200).json(states);
  } catch (error) {
    // Return a 500 error if something went wrong with the database query
    response.status(500).json({ message: error.message });
  }
};
