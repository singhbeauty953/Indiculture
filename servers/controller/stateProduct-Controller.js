

export const getStateProducts = async (request, response) => {
  try {
    const stateProducts = await StateProducts.find({ state: request.query.state });
    response.status(200).json(stateProducts);
  } catch (error) {
    console.error("Error fetching state products: ", error);
    response.status(500).json({ message: "Error fetching state products", error: error.message });
  }
};
