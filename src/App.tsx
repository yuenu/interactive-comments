import { Footer, CommentCard, Avatar } from '@/components'
import clsx from 'clsx'
import data from './data.json'

function App() {
  const currentUser = data.currentUser
  return (
    <main
      className={clsx(
        'min-h-screen',
        'flex flex-col',
        'bg-gray-light'
      )}>
      {/* COMMENTS */}
      <div
        className={clsx(
          'flex flex-col items-center',
          'h-full gap-5 m-4 md:m-0 md:mt-10'
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
      <div className="p-4 pt-0 md:p-0">
        <div
          className={clsx(
            'h-auto md:h-40 md:max-w-3xl relative',
            'mx-auto my-6 p-5 md:p-6',
            'bg-white rounded-lg',
            'flex gap-6 md:gap-4 flex-col md:flex-row',
            'w-full'
          )}>
          <Avatar
            user={data.currentUser}
            className={clsx('w-10 h-10', 'order-1 md:-order-1')}
          />
          <textarea
            className={clsx('px-4 py-2 border flex-1 rounded-lg')}
            name="comment"
            id="comment"
            placeholder="Add a Comment..."></textarea>

          <button
            className={clsx(
              'h-12 rounded-lg px-7',
              'bg-primary text-white hover:bg-blue-bg',
              'absolute md:relative bottom-3 right-5 md:bottom-0 md:right-0'
            )}>
            SEND
          </button>
        </div>
      </div>
      {/* footer section  */}
      <Footer />
    </main>
  )
}

export default App
