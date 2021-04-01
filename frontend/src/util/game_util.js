import axios from 'axios';


export const leaderboard = () => {
    return axios.get('/api/leaderboard');
}