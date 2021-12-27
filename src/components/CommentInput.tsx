import { Avatar } from '@/components'
import clsx from 'clsx'
import { useRef } from 'react'
import {
  addComment,
  addReply,
  useAppDispatch,
  useAppSelector,
} from '@/store'
import { Comment, Reply } from '@/types'

type CommentInputProps = {
  className?: string
  id?: string
  type: 'comment' | 'reply'
  comment?: Comment
  placeholder?: string
}

export function CommentInput({
  className,
  id,
  type,
  comment: currentComment,
  placeholder = 'Add a Reply...',
}: CommentInputProps) {
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const currentUser = useAppSelector(
    (state) => state.commentsSlice.data.currentUser
  )
  const dispatch = useAppDispatch()

  const onSubmitHandler = () => {
    if (textRef.current) {
      switch (type) {
        case 'comment':
          const comment = {
            content: textRef.current.value,
            createdAt: new Date().toDateString(),
            id: Math.round(Math.random() * 10000),
            replies: [] as Reply[],
            score: 0,
            user: currentUser,
          }
          dispatch(addComment({ ...comment }))
          textRef.current.value = ''
          break
        case 'reply':
          if (currentComment) {
            const reply = {
              id: Math.round(Math.random() * 10000),
              content: textRef.current.value,
              createdAt: new Date().toDateString(),
              score: 0,
              replyingTo: currentComment.user.username,
              user: currentUser,
            }

            dispatch(
              addReply({ commentId: currentComment.id, reply })
            )
          }
          textRef.current.value = ''
          break
      }
    }
  }

  return (
    <div className={clsx('', className)} id={id}>
      <div
        className={clsx(
          'h-auto md:h-40 md:max-w-3xl relative',
          'mx-auto p-5 md:p-6',
          'bg-white rounded-lg',
          'flex gap-6 md:gap-4 flex-col md:flex-row',
          'w-full'
        )}>
        <Avatar
          user={currentUser}
          className={clsx('w-10 h-10', 'order-1 md:-order-1')}
        />
        <textarea
          ref={textRef}
          className={clsx('px-4 py-2 border flex-1 rounded-lg')}
          name="comment"
          id="comment"
          placeholder={placeholder}></textarea>

        <button
          onClick={onSubmitHandler}
          className={clsx(
            'h-12 rounded-lg px-7',
            'bg-primary text-white hover:bg-blue-bg',
            'absolute md:relative bottom-3 right-5 md:bottom-0 md:right-0'
          )}>
          SEND
        </button>
      </div>
    </div>
  )
}
