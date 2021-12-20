import { Footer } from '@/components'
import clsx from 'clsx'
import data from './data.json'

function App() {
  console.log(data)
  return (
    <main
      className={clsx(
        'w-full h-screen',
        'flex flex-col',
        'bg-gray-light'
      )}>
      {/* card */}
      <div className=""></div>

      {/* footer section  */}
      <Footer />
    </main>
  )
}

export default App
