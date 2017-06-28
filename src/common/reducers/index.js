import { combineReducers } from 'redux';

import { RETRIEVE_WEATHER } from '../actions';

// weather reducer. stores the weather data in the redux store.
function weatherReducer(state = {}, action) {
  switch(action.type) {
    case RETRIEVE_WEATHER:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;