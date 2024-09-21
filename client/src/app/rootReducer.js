import { combineReducers } from 'redux';
import leaderboardReducer from '../features/game/leaderboardSlice';

const rootReducer = combineReducers({
  leaderboard: leaderboardReducer,
});

export default rootReducer;
