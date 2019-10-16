import { ADD_PLAYER, REMOVE_PLAYER, SET_TIMER_DURATION } from "./actionTypes";

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

export const setTimerDuration = seconds => ({
    type: SET_TIMER_DURATION,
    payload: {
        seconds
    }
});