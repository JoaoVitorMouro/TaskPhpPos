import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface TransactionsContextProps {
  children: ReactNode
}

interface TransactionsProps {
  id: number
  description: string
  category: string
  type: 'income' | 'outcome'
  price: number
  userId: number
  createdAt: string
}

interface CreateTransactionProps {
  description: string
  category: string
  type: 'income' | 'outcome'
  price: number
  userId: number
}

interface UpdateTransactionProps {
  id: number
  description: string
  category: string
  type: 'income' | 'outcome'
  price: number
  userId: number
}

interface TransactionsContextType {
  transactions: TransactionsProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionProps) => Promise<void>
  updateTransaction: (data: UpdateTransactionProps) => Promise<void>
  deleteTransaction: (transactionId: number) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'johnDoe@teste.com',
    createdAt: new Date().toISOString(),
  }

  const [transactions, setTransactions] = useState<TransactionsProps[]>([
    {
      id: 0,
      description: 'Desenvolvimento de site',
      category: 'Dev',
      type: 'income',
      price: 100,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 0,
      description: 'Subscriber Twitch',
      category: 'Stream',
      type: 'outcome',
      price: 20,
      userId: 1,
      createdAt: new Date().toISOString(),
    },
  ])

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get('/api/transactions', {
        params: {
          q: query,
          userId: user?.id,
        },
      })

      setTransactions(response.data)
    },
    [user],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionProps) => {
      const { category, description, price, type } = data

      const response = await api.post('/api/transactions', {
        category,
        description,
        price,
        type,
        userId: user?.id,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [user?.id],
  )

  const updateTransaction = useCallback(
    async (data: UpdateTransactionProps) => {
      const { category, description, price, type } = data

      const response = await api.post(`/api/transactions/${data.id}`, {
        category,
        description,
        price,
        type,
        userId: user?.id,
        createdAt: new Date(),
      })

      setTransactions((state) => {
        return state.map((transaction) => {
          if (transaction.id === data.id) {
            return response.data
          }

          return transaction
        })
      })
    },
    [user?.id],
  )

  const deleteTransaction = useCallback(
    async (transactionId: number) => {
      await api.post(`/api/transactions/${transactionId}`, {
        userId: user?.id,
      })

      setTransactions((state) => {
        return state.filter((transaction) => transaction.id !== transactionId)
      })
    },
    [user?.id],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
