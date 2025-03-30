import { ADD_PLAYER, REMOVE_PLAYER, SET_TIMER_DURATION } from "./actionTypes";

const initialState = {
    players: [],
    seconds: 15,
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_PLAYER) {
        return Object.assign({}, state, {
            players: state.players.concat(action.player)
        });
    }
    else if (action.type === REMOVE_PLAYER) {
        const filteredPlayers = state.players.filter(function (player) {
            return player !== action.player;
        });
        return Object.assign({}, state, {
            players: filteredPlayers
        });
    }
    else if (action.type === SET_TIMER_DURATION) {
        return Object.assign({}, state, {
            seconds: action.seconds
        });
    }
    return state;
};

export default rootReducer;
