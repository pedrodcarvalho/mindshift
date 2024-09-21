import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axiosInstance';

export const fetchLeaderboard = createAsyncThunk('leaderboard/fetchLeaderboard', async () => {
  try {
    const response = await axios.get('/leaderboard');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch leaderboard');
  }
});
