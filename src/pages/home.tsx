import { useState } from 'react'
import '../App.css'

function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>HOME PAGE</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className='text-3xl font-bold underline'>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-100">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default HomePage
