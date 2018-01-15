const initialState = {
  spotlight: false,
};

const light = (state = initialState, action) => {
  switch (action.type) {
    case 'ON':
      return { ...action.payload };
    case 'OFF':
      return { spotlight: false };
    default:
      return state;
  }
}

export default light;
