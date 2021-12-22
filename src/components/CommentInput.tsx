import { Avatar } from '@/components'
import clsx from 'clsx'
import { useRef } from 'react'
import { addedComment, useAppDispatch, useAppSelector } from '@/store'
import { Replay } from '@/types'

type CommentInputProps = {
  className?: string
  id?: string
}

export function CommentInput({ className, id }: CommentInputProps) {
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const currentUser = useAppSelector(
    (state) => state.commentsSlice.data.currentUser
  )
  const dispatch = useAppDispatch()
  const onAddComment = () => {
    if (textRef.current) {
      const comment = {
        content: textRef.current.value,
        createdAt: new Date().toDateString(),
        id: Math.round(Math.random() * 10000),
        replies: [] as Replay[],
        score: 0,
        user: currentUser,
      }
      dispatch(addedComment({ ...comment }))
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
          placeholder="Add a Comment..."></textarea>

        <button
          onClick={onAddComment}
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
