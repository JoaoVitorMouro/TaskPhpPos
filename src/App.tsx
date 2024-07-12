import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { AppRoutes } from './routes'
import { UsersProvider } from './contexts/UsersContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <UsersProvider>
        <TransactionsProvider>
          <AppRoutes />
        </TransactionsProvider>
      </UsersProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
