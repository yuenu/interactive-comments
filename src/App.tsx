import { Footer, CommentCard } from '@/components'
import { Input as CommentInput } from '@/components/comment'
import clsx from 'clsx'
import { useAppSelector } from '@/store'

function App() {
  const data = useAppSelector((state) => state.commentsSlice.data)

  return (
    <main
      className={clsx('min-h-screen bg-gray-light flex flex-col')}>
      <div
        className={clsx(
          'flex flex-col items-center gap-5',
          'h-full m-4 md:m-0 md:mt-10'
        )}>
        {data.comments.map((comment, index) => {
          return (
            <div key={comment.id} className="w-full max-w-3xl">
              <CommentCard
                comment={comment}
                currentUser={data.currentUser}
                last={index === data.comments.length - 1}
              />
            </div>
          )
        })}
      </div>

      <CommentInput
        type="comment"
        id="comment"
        className="px-4 mt-0 md:mt-5"
        placeholder="Add a Comment..."
      />
      <Footer />
    </main>
  )
}

export default App
