import { configureStore } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import data from '@/data.json'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { Comment, Reply } from '@/types'

const initialState = {
  data: data,
}

type AddReplyProps = {
  reply: Reply
  commentId: number
}

type DeleteReplyProps = {
  comment: Comment
  deleteId: number
}

type ChangeReplyProps = {
  comment: Comment
  reply: Reply
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.data.comments.push(action.payload)
    },
    addReply: (state, action: PayloadAction<AddReplyProps>) => {
      const comment = state.data.comments.filter(
        (comment) => comment.id === action.payload.commentId
      )[0]
      comment.replies.push(action.payload.reply)
    },
    updateReply: (state, action: PayloadAction<ChangeReplyProps>) => {
      const comment = state.data.comments.filter(
        (comment) => comment.id === action.payload.comment.id
      )[0]
      const reply = comment.replies.filter(
        (reply) => reply.id === action.payload.reply.id
      )[0]

      const replyIndex = comment.replies.indexOf(reply)

      comment.replies[replyIndex] = action.payload.reply
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const comment = state.data.comments.filter(
        (comment) => comment.id === action.payload.id
      )[0]
      const commentIndex = state.data.comments.indexOf(comment)
      if (commentIndex === -1)
        throw new Error("UnExpect Error: cant't found the comment!!")
      state.data.comments[commentIndex] = action.payload
    },
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
  addReply,
  updateReply,
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
