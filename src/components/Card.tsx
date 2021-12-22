import {
  CommentHeader,
  CommentInput,
  Feature,
  Modal,
} from '@/components'
import clsx from 'clsx'
import type { Comment, Replay, User } from '@/types'
import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'

type CommentProps = {
  comment: Comment
  currentUser: User
  last: boolean
}

export function CommentCard({
  comment,
  currentUser,
  last,
}: CommentProps) {
  const [replyOpen, setReplyOpen] = useState(false)
  const replyHandler = () => {
    if (!last) setReplyOpen((prev) => !prev)
  }

  return (
    <>
      <div
        className={clsx(
          'relative flex flex-col sm:flex-row gap-6',
          'h-auto p-5 sm:p-7',
          'bg-white rounded-lg shadow-sm'
        )}>
        <Feature score={comment.score} />
        <div className="flex-1 -order-1 sm:order-1">
          <CommentHeader
            user={comment.user}
            createdAt={comment.createdAt}
            currentUser={currentUser}
            onReply={replyHandler}
          />
          <span className="inline-block pr-0 mt-3 sm:pr-10 text-blue-dark">
            {comment.content}
          </span>
        </div>
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
      {replyOpen && <CommentInput className="mt-3" />}
    </>
  )
}

type ReplayCardProps = {
  replay: Replay
  currentUser: User
}

export function ReplayCard({ replay, currentUser }: ReplayCardProps) {
  const [replyOpen, setReplyOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const originContentText = `@${replay.replyingTo} ` + replay.content
  const [editText, setEditText] = useState(originContentText)
  const portalDiv = document.getElementById('modal')!

  const onDelete = () => setModalOpen(true)
  const onCancel = () => setModalOpen(false)
  const onEdit = () => {
    setEditMode((prev) => !prev)
    if (!editMode) setEditText(originContentText)
  }
  const onUpdated = () => {
    setEditMode(false)
  }

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const deleteHandler = () => {
    console.log('delete')
    setModalOpen(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value)
  }

  return (
    <>
      <div
        className={clsx(
          'relative w-[95%] sm:w-[88%] h-auto max-w-3xl',
          ' p-4 sm:p-7',
          'bg-white rounded-lg shadow-sm',
          'flex flex-col sm:flex-row gap-6'
        )}>
        <Feature score={replay.score} />
        <div className="flex-1 -order-1 sm:order-1">
          <CommentHeader
            createdAt={replay.createdAt}
            user={replay.user}
            currentUser={currentUser}
            onReply={() => setReplyOpen((prev) => !prev)}
            onDelete={onDelete}
            onEdit={onEdit}
          />
          {!editMode ? (
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
          ) : (
            <div>
              <textarea
                ref={textareaRef}
                onChange={onChange}
                className="flex-1 px-4 py-2 border rounded-lg min-h-[8rem] mt-5 mb-3 w-full"
                name="edit"
                id="edit"
                value={editText}></textarea>
              <button
                className="float-right p-3 text-white rounded-lg bg-primary hover:bg-blue-bg"
                onClick={onUpdated}>
                UPDATED
              </button>
            </div>
          )}
        </div>
      </div>
      {replyOpen && (
        <CommentInput className="w-[95%] sm:w-[88%] p-0" />
      )}
      {modalOpen &&
        ReactDOM.createPortal(
          <Modal onCancel={onCancel} onDelete={deleteHandler} />,
          portalDiv
        )}
    </>
  )
}
