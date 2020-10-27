import { ACTION_TYPES, getErrors } from '../actions/AContact';


const initialState = {
    list: []
}

export const RContact = (state=initialState, action) => {

    switch(action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload],
            }    

        default:
            return state;
    }

    
}