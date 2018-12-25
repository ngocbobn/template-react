import { Map } from 'immutable';

const initState = new Map({
    tokenLogin: null
});

export default function authReducer(
    state = initState.merge(new Map({ tokenLogin: localStorage.getItem('token') })),
    action
) {
    switch (action.type) {
        default:
            return state;
    }
}
