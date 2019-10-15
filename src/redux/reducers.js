import { ADD_PLAYER, REMOVE_PLAYER } from "./actionTypes";

const initialState = {
    players: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_PLAYER) {
        return Object.assign({}, state, {
            players: state.players.concat(action.payload)
        });
    }
    else if (action.type === REMOVE_PLAYER) {
        const filteredPlayers = state.players.filter(function (player) {
            return player.player !== action.payload.player;
        });
        return Object.assign({}, state, {
            players: filteredPlayers
        });
    }
    return state;
};

export default rootReducer;
