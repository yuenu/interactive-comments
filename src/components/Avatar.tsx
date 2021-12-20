import { User } from '@/types'
import clsx from 'clsx'

interface Image {
  [key: string]: any
}

const IMAGES: Image = {
  amyrobson: require('@/images/avatars/image-amyrobson.png'),
  juliusomo: require('@/images/avatars/image-juliusomo.png'),
  maxblagun: require('@/images/avatars/image-maxblagun.png'),
  ramsesmiron: require('@/images/avatars/image-ramsesmiron.png'),
}

type AvatarsProps = {
  user: User
  className?: string
}

export function Avatar({ user, className }: AvatarsProps) {
  return (
    <img
      className={clsx('object-cover rounded-full', className)}
      src={IMAGES[user.username]}
      alt={user.username}
    />
  )
}
