import { Footer, CommentCard, CommentInput } from '@/components'
import clsx from 'clsx'
import data from './data.json'

function App() {
  return (
    <main
      className={clsx(
        'min-h-screen',
        'flex flex-col',
        'bg-gray-light'
      )}>
      <div
        className={clsx(
          'flex flex-col items-center gap-5',
          'h-full m-4 md:m-0 md:mt-10'
        )}>
        {data.comments.map((comment, index) => {
          return (
            <div key={comment.id} className="max-w-3xl">
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
        id="comment-input"
        currentUser={data.currentUser}
        className="px-4 mt-0 md:mt-5"
      />
      <Footer />
    </main>
  )
}

export default App
