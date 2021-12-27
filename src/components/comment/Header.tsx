import { Icon, Avatar, ControlButton } from '@/components'
import clsx from 'clsx'
import type { User } from '@/types'

type HeaderProps = {
  user: User
  createdAt: string
  currentUser: User
  onReply?: React.MouseEventHandler<HTMLDivElement>
  onDelete?: React.MouseEventHandler<HTMLDivElement>
  onEdit?: React.MouseEventHandler<HTMLDivElement>
}

export function Header({
  user,
  createdAt,
  currentUser,
  onReply,
  onDelete,
  onEdit,
}: HeaderProps) {
  const isCurrentUser = currentUser.username === user.username
  return (
    <header className="flex items-center gap-3">
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
          'absolute bottom-6 right-7 sm:relative sm:bottom-0 sm:right-0'
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
              onClick={onDelete}
            />
            <ControlButton
              className={clsx(
                'text-primary hover:text-blue-bg',
                'fill-primary hover:fill-blue-bg'
              )}
              text="Edit"
              icon={<Icon.Edit />}
              onClick={onEdit}
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
            onClick={onReply}
          />
        )}
      </div>
    </header>
  )
}
