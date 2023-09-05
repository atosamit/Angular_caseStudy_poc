import { createReducer, on } from "@ngrx/store"
import { decrement, increment,  } from "./counter.actions"
import { initialState } from "./counter.state";


// crerate basic reducer
const _counterReducer = createReducer(initialState,
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        };
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        };
    }),
    )
export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action)
}