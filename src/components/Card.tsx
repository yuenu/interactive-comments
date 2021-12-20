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
    <div className="flex flex-col items-center justify-center w-24 h-full gap-2 py-2 rounded-lg bg-gray-light">
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
  return (
    <header className="flex items-center gap-4">
      <Avatar user={user} className="w-8 h-8" />
      <span className="font-bold text-blue-darker">
        {user.username}
      </span>

      {currentUser.username === user.username && (
        <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-primary">
          you
        </span>
      )}
      <p className="text-blue-dark">{createdAt}</p>

      <ControlSection className="ml-auto" />
    </header>
  )
}

type ControlSectionProps = {
  className?: string
}

function ControlSection({ className }: ControlSectionProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 cursor-pointer',
        'text-primary hover:text-blue-bg',
        'fill-primary hover:fill-blue-bg',
        className
      )}>
      <Icon.Reply />
      <span className={clsx('font-semibold')}>Replay</span>
    </div>
  )
}

export function CommentCard({ comment, currentUser }: CommentProps) {
  return (
    <>
      <div className="flex w-full h-auto gap-6 bg-white rounded-lg shadow-sm p-7">
        {/* feature */}
        <Feature score={comment.score} />
        {/* COMMENT SECTION */}
        <div>
          {/* comment header */}
          <Header
            user={comment.user}
            createdAt={comment.createdAt}
            currentUser={currentUser}
          />
          {/* comment content */}
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
              <div className="flex flex-col items-end gap-4 mt-6">
                <ReplayCard
                  replay={replay}
                  key={replay.id}
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
    <div className="flex w-[88%] h-auto max-w-3xl gap-6 p-8 bg-white rounded-lg shadow-sm">
      {/* feature */}
      <Feature score={replay.score} />
      {/* COMMENT SECTION */}
      <div>
        {/* comment header */}
        <Header
          createdAt={replay.createdAt}
          user={replay.user}
          currentUser={currentUser}
        />
        {/* comment content */}
        <span className="inline-block pr-20 mt-3 text-blue-dark">
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
