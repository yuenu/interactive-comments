import { Footer, CommentCard, Avatar } from '@/components'
import clsx from 'clsx'
import data from './data.json'

function App() {
  const currentUser = data.currentUser
  return (
    <main
      className={clsx(
        'w-full min-h-screen',
        'flex flex-col',
        'bg-gray-light'
      )}>
      {/* COMMENTS */}
      <div
        className={clsx(
          'flex flex-col items-center',
          'w-full h-full gap-5 mt-10'
        )}>
        {data.comments.map((comment) => {
          return (
            <div key={comment.id} className="max-w-3xl">
              <CommentCard
                comment={comment}
                currentUser={currentUser}
              />
            </div>
          )
        })}
      </div>

      {/* INPUT SECTION */}
      <div
        className={clsx(
          'w-full h-40 max-w-3xl',
          'mx-auto my-6 sm:p-6 p-3',
          'bg-white rounded-lg',
          'flex gap-4'
        )}>
        <Avatar user={data.currentUser} className="w-10 h-10" />
        <textarea
          className={clsx(
            'px-4 py-2 border flex-1 rounded-lg w-full'
          )}
          name="comment"
          id="comment"
          placeholder="Add a Comment..."></textarea>

        <button
          className={clsx(
            'h-12 rounded-lg px-7',
            'bg-primary text-white hover:bg-blue-bg'
          )}>
          SEND
        </button>
      </div>
      {/* footer section  */}
      <Footer />
    </main>
  )
}

export default App
