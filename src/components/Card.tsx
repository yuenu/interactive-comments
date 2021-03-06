import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'
import type { Comment, Reply, User } from '@/types'
import { Feature, Modal } from '@/components'
import {
  Header as CommentHeader,
  Input as CommentInput,
} from '@/components/comment'
import {
  deleteComment,
  useAppDispatch,
  deleteReply,
  updateComment,
  updateReply,
} from '@/store'

const portalDiv = document.getElementById('modal')!

type EditModeDisplayProps = {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  editText: string
  innerRef: React.LegacyRef<HTMLTextAreaElement>
  onUpdate: React.MouseEventHandler<HTMLButtonElement>
}

function EditModeDisplay({
  onChange,
  editText,
  innerRef,
  onUpdate,
}: EditModeDisplayProps) {
  return (
    <div>
      <textarea
        ref={innerRef}
        onChange={onChange}
        className="flex-1 px-4 py-2 border rounded-lg min-h-[8rem] mt-5 mb-3 w-full"
        name="edit"
        id="edit"
        value={editText}></textarea>
      <button
        className="float-right p-3 text-white rounded-lg bg-primary hover:bg-blue-bg"
        onClick={onUpdate}>
        UPDATED
      </button>
    </div>
  )
}

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
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const originContentText = comment.content
  const [editText, setEditText] = useState(originContentText)

  const [replyOpen, setReplyOpen] = useState(false)
  const replyHandler = () => {
    if (!last) setReplyOpen((prev) => !prev)
  }

  const onCancel = () => setModalOpen(false)
  const onDelete = () => setModalOpen(true)

  const onEdit = () => {
    setEditMode((prev) => !prev)
    if (!editMode) setEditText(originContentText)
  }

  const deleteHandler = () =>
    dispatch(deleteComment({ id: comment.id }))

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value)
  }

  const onUpdateComment = () => {
    dispatch(updateComment({ ...comment, content: editText }))
    setEditMode(false)
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
            onDelete={onDelete}
            onEdit={onEdit}
          />
          {!editMode ? (
            <span className="inline-block pr-0 mt-3 sm:pr-10 text-blue-dark">
              {comment.content}
            </span>
          ) : (
            <EditModeDisplay
              onUpdate={onUpdateComment}
              innerRef={textareaRef}
              onChange={onChange}
              editText={editText}
            />
          )}
        </div>
      </div>
      <div className="replay">
        {comment.replies &&
          comment.replies.map((reply) => {
            return (
              <div
                className="flex flex-col items-end gap-4 mt-6"
                key={reply.id}>
                <ReplayCard
                  reply={reply}
                  currentUser={currentUser}
                  comment={comment}
                />
              </div>
            )
          })}
      </div>
      {replyOpen && (
        <CommentInput
          type="reply"
          className="mt-3"
          comment={comment}
          onSubmit={(val) => setReplyOpen(val)}
        />
      )}
      {modalOpen &&
        ReactDOM.createPortal(
          <Modal onCancel={onCancel} onDelete={deleteHandler} />,
          portalDiv
        )}
    </>
  )
}

type ReplayCardProps = {
  reply: Reply
  currentUser: User
  comment: Comment
}

export function ReplayCard({
  reply,
  currentUser,
  comment,
}: ReplayCardProps) {
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // const originContentText = `@${reply.replyingTo} ` + reply.content
  const [editText, setEditText] = useState(reply.content)

  const [replyOpen, setReplyOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const onEdit = () => {
    setEditMode((prev) => !prev)
    if (!editMode) setEditText(reply.content)
  }

  const deleteHandler = () => {
    if (comment)
      dispatch(deleteReply({ comment, deleteId: reply.id }))
    setModalOpen(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value)
  }

  const onUpdateReply = () => {
    dispatch(
      updateReply({ comment, reply: { ...reply, content: editText } })
    )
    setEditMode(false)
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
        <Feature score={reply.score} />
        <div className="flex-1 -order-1 sm:order-1">
          <CommentHeader
            createdAt={reply.createdAt}
            user={reply.user}
            currentUser={currentUser}
            onReply={() => setReplyOpen((prev) => !prev)}
            onDelete={() => setModalOpen(true)}
            onEdit={onEdit}
          />
          {!editMode ? (
            <span className="inline-block mt-3 sm:pr-20 text-blue-dark">
              {reply.replyingTo && (
                <a
                  href={`#${reply.replyingTo}`}
                  className="font-bold cursor-pointer text-primary">
                  @{reply.replyingTo}&nbsp;
                </a>
              )}
              {reply.content}
            </span>
          ) : (
            <EditModeDisplay
              onUpdate={onUpdateReply}
              innerRef={textareaRef}
              onChange={onChange}
              editText={editText}
            />
          )}
        </div>
      </div>
      {replyOpen && (
        <CommentInput
          type="reply"
          className="w-[95%] sm:w-[88%] p-0"
          comment={comment}
          id="reply"
          onSubmit={(val) => setReplyOpen(val)}
        />
      )}
      {modalOpen &&
        ReactDOM.createPortal(
          <Modal
            onCancel={() => setModalOpen(false)}
            onDelete={deleteHandler}
          />,
          portalDiv
        )}
    </>
  )
}
