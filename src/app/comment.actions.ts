import { createAction, props } from '@ngrx/store';

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ text: string }>()
);