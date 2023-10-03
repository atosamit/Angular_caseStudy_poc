
import { createReducer, on } from '@ngrx/store';
import * as CommentActions from './comment.actions';
import { CommentState } from './comment.state';

export const initialState: CommentState = {
  comments: [],
};

export const commentReducer = createReducer(
  initialState,
  on(CommentActions.createComment, (state, { text }) => ({
    ...state,
    comments: [...state.comments, text],
  }))
);
