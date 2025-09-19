import { RouterProvider } from 'react-router-dom'

import '../styles/App.css'
import { AppProviders } from './providers'
import { router } from './routes'

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
