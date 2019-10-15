import { ADD_PLAYER, REMOVE_PLAYER } from "./actionTypes";

export const addPlayer = player => ({
    type: ADD_PLAYER,
    payload: {
        player
    }
});

export const removePlayer = player => ({
    type: REMOVE_PLAYER,
    payload: {
        player
    }
});
