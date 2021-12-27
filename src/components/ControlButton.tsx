import clsx from 'clsx'
import { ReactNode, isValidElement, cloneElement } from 'react'

type ControlButtonProps = {
  className?: string
  text: string
  icon: ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function ControlButton({
  className,
  text,
  icon,
  onClick,
}: ControlButtonProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2',
        'cursor-pointer',
        className
      )}>
      {isValidElement(icon) && cloneElement(icon)}
      <span className={clsx('font-semibold')}>{text}</span>
    </div>
  )
}
