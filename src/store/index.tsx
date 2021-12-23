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

type DeleteReplyProps = {
  comment: Comment
  deleteId: number
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.data.comments.push(action.payload)
    },
    addReply: (state, action: PayloadAction) => {},
    updateComment: (state, action: PayloadAction) => {},
    deleteComment: (state, action: PayloadAction<{ id: number }>) => {
      state.data.comments = state.data.comments.filter((comment) => {
        return comment.id !== action.payload.id
      })
    },
    deleteReply: (state, action: PayloadAction<DeleteReplyProps>) => {
      const remainOfReplies = action.payload.comment.replies.filter(
        (reply) => reply.id !== action.payload.deleteId
      )

      const deleteeReplyComment = {
        ...action.payload.comment,
        replies: remainOfReplies,
      }

      state.data.comments = state.data.comments.map((comment) => {
        if (comment.id === deleteeReplyComment.id)
          return deleteeReplyComment
        return comment
      })
    },
  },
})

export const {
  addComment,
  updateComment,
  deleteComment,
  deleteReply,
} = commentsSlice.actions

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
