import { createAction } from "@ngrx/store";

// create a 3 actions so we have 3 actions increment decrement and reset
// we use action and reducer so we have to export here
export const increment=createAction("increment") 
export const decrement=createAction("decrement")