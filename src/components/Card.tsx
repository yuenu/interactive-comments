import { Icon, Avatar } from '@/components'
import clsx from 'clsx'
import type { Comment, Replay, User } from '@/types'
import { ReactNode } from 'react'

type CommentProps = {
  comment: Comment
  currentUser: User
}

type FeatureProps = {
  score: number
}

function Feature({ score }: FeatureProps) {
  return (
    <div
      className={clsx(
        'flex flex-row sm:flex-col items-center justify-center',
        'w-24 h-full gap-2 py-2',
        'rounded-lg bg-gray-light'
      )}>
      <button
        className={clsx(
          'flex items-center justify-center w-5 h-5',
          'fill-blue-bg hover:fill-primary'
        )}>
        <Icon.Plus />
      </button>
      <span className="font-bold text-primary">{score}</span>
      <button
        className={clsx(
          'flex items-center justify-center w-5 h-5',
          'fill-blue-bg hover:fill-primary'
        )}>
        <Icon.Minus />
      </button>
    </div>
  )
}

type HeaderProps = {
  user: User
  createdAt: string
  currentUser: User
}

function Header({ user, createdAt, currentUser }: HeaderProps) {
  const isCurrentUser = currentUser.username === user.username
  return (
    <header className="flex items-center gap-4">
      <Avatar user={user} className="w-8 h-8" />
      <span className="font-bold text-blue-darker">
        {user.username}
      </span>

      {isCurrentUser && (
        <span
          className={clsx(
            'inline-block px-2 py-1',
            'text-xs font-bold text-white bg-primary'
          )}>
          you
        </span>
      )}
      <p className="text-blue-dark">{createdAt}</p>

      <div
        className={clsx(
          'flex items-center gap-5 ml-auto',
          'absolute bottom-5 right-5 sm:relative sm:bottom-0 sm:right-0'
        )}>
        {isCurrentUser ? (
          <>
            <ControlButton
              className={clsx(
                'text-red-soft hover:text-red-pale',
                'fill-red-soft hover:fill-red-pale'
              )}
              text="Delete"
              icon={<Icon.Delete />}
            />
            <ControlButton
              className={clsx(
                'text-primary hover:text-blue-bg',
                'fill-primary hover:fill-blue-bg'
              )}
              text="Edit"
              icon={<Icon.Edit />}
            />
          </>
        ) : (
          <ControlButton
            className={clsx(
              'text-primary hover:text-blue-bg',
              'fill-primary hover:fill-blue-bg'
            )}
            text="Reply"
            icon={<Icon.Reply />}
          />
        )}
      </div>
    </header>
  )
}

type ControlButtonProps = {
  className?: string
  text: string
  icon: ReactNode
}

function ControlButton({
  className,
  text,
  icon,
}: ControlButtonProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2',
        'cursor-pointer',
        className
      )}>
      {icon}
      <span className={clsx('font-semibold')}>{text}</span>
    </div>
  )
}

export function CommentCard({ comment, currentUser }: CommentProps) {
  return (
    <>
      <div
        className={clsx(
          'relative flex flex-col sm:flex-row gap-6',
          'h-auto p-5 sm:p-7',
          'bg-white rounded-lg shadow-sm'
        )}>
        {/* feature */}
        <Feature score={comment.score} />
        {/* COMMENT SECTION */}
        <div className="-order-1 sm:order-1">
          <Header
            user={comment.user}
            createdAt={comment.createdAt}
            currentUser={currentUser}
          />
          <span className="inline-block pr-10 mt-3 text-blue-dark">
            {comment.content}
          </span>
        </div>

        {/* replay button */}
      </div>
      <div className="replay">
        {comment.replies &&
          comment.replies.map((replay) => {
            return (
              <div
                className="flex flex-col items-end gap-4 mt-6"
                key={replay.id}>
                <ReplayCard
                  replay={replay}
                  currentUser={currentUser}
                />
              </div>
            )
          })}
      </div>
    </>
  )
}

type ReplayCardProps = {
  replay: Replay
  currentUser: User
}

export function ReplayCard({ replay, currentUser }: ReplayCardProps) {
  return (
    <div
      className={clsx(
        'relative w-[95%] sm:w-[88%] h-auto max-w-3xl',
        ' p-4 sm:p-7',
        'bg-white rounded-lg shadow-sm',
        'flex flex-col sm:flex-row gap-6'
      )}>
      {/* feature */}
      <Feature score={replay.score} />
      {/* COMMENT SECTION */}
      <div className="-order-1 sm:order-1">
        {/* comment header */}
        <Header
          createdAt={replay.createdAt}
          user={replay.user}
          currentUser={currentUser}
        />
        {/* comment content */}
        <span className="inline-block mt-3 sm:pr-20 text-blue-dark">
          {replay.replyingTo && (
            <a
              href={`#${replay.replyingTo}`}
              className="font-bold cursor-pointer text-primary">
              @{replay.replyingTo}&nbsp;
            </a>
          )}
          {replay.content}
        </span>
      </div>
    </div>
  )
}
