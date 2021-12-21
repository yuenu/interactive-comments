import { Avatar } from '@/components'
import clsx from 'clsx'
import type { User } from '@/types'

type CommentInputProps = {
  currentUser: User
  className?: string
  id?: string
}

export function CommentInput({
  currentUser,
  className,
  id,
}: CommentInputProps) {
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
          className={clsx('px-4 py-2 border flex-1 rounded-lg')}
          name="comment"
          id="comment"
          placeholder="Add a Comment..."></textarea>

        <button
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
