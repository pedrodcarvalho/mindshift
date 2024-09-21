import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaderboard } from '../features/game/thunks/leaderboardThunks';
import { selectLeaderboard, selectLeaderboardStatus, selectLeaderboardError } from '../features/game/selectors/leaderboardSelector';

const Leaderboard = () => {
  const leaderboard = useSelector(selectLeaderboard);
  const status = useSelector(selectLeaderboardStatus);
  const error = useSelector(selectLeaderboardError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLeaderboard());
    }
  }, [dispatch, status]);

  return (
    <div style={{ position: 'absolute', bottom: '50px', left: '50px' }}>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard?.map((player, index) => (
              <li key={index}>
                {player.name}: {player.score}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
