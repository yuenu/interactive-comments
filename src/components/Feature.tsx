import clsx from 'clsx'
import { Icon } from '@/components'

type FeatureProps = {
  score: number
}

export function Feature({ score }: FeatureProps) {
  return (
    <div
      className={clsx(
        'flex flex-row sm:flex-col items-center justify-center',
        'w-24 sm:w-12 h-full gap-2 py-2',
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
