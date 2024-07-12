import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Transactions } from '../pages/Transactions'
import { Users } from '../pages/Users'
import { Header } from '../components/Header'
import { Summary } from '../components/Summary'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Summary />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  )
}
