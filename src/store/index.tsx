import { configureStore } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import data from '@/data.json'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { Comment } from '@/types'

const initialState = {
  data: data,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    addedComment: (state, action: PayloadAction<Comment>) => {
      state.data.comments.push(action.payload)
    },
    updatedComment: (state, action: PayloadAction) => {},
    deletedComment: (state, action: PayloadAction) => {},
  },
})

export const { addedComment, updatedComment, deletedComment } =
  commentsSlice.actions

export const store = configureStore({
  reducer: {
    commentsSlice: commentsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector
