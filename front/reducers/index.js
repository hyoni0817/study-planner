import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import todo from './todo';
import dday from './dday';
import user from './user';

// (이전상태, 액션) => 다음 상태
const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                todo,
                dday,
                user,
            });
            return combineReducer(state, action);
        }
    }
}

export default rootReducer;