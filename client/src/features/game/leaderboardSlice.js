import { createSlice } from '@reduxjs/toolkit';
import { fetchLeaderboard } from './thunks/leaderboardThunks';

const initialState = {
  leaderboard: [],
  status: 'idle',
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    resetLeaderboard(state) {
      state.leaderboard = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
