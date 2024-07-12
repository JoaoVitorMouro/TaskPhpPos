import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext, useContextSelector } from 'use-context-selector'
import { UsersContext } from './UsersContext'

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
  transaction: TransactionsProps | undefined
  transactions: TransactionsProps[]
  selectTransaction: (transactionId?: number) => void
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionProps) => Promise<void>
  updateTransaction: (data: UpdateTransactionProps) => Promise<void>
  deleteTransaction: (transactionId: number) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const user = useContextSelector(UsersContext, (context) => {
    return context.user
  })

  const [transaction, setTransaction] = useState<TransactionsProps | undefined>(
    undefined,
  )
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

  const selectTransaction = (transactionId?: number) => {
    const selectedTransaction = transactions.find(
      (transaction) => transaction.id === transactionId,
    )

    setTransaction(selectedTransaction)
  }

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get(
        `/api/transactions/${user?.id}/userTransactions`,
        {
          params: {
            q: query,
          },
        },
      )

      setTransactions(response.data.data)
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

      setTransactions((state) => [response.data.data, ...state])
    },
    [user?.id],
  )

  const updateTransaction = useCallback(
    async (data: UpdateTransactionProps) => {
      const { category, description, price, type } = data

      const response = await api.post(`/api/transactions/${data.id}`, {
        id: data.id,
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
            return response.data.data
          }

          return transaction
        })
      })
    },
    [user?.id],
  )

  const deleteTransaction = useCallback(async (transactionId: number) => {
    await api.delete(`/api/transactions/${transactionId}`)

    setTransactions((state) => {
      return state.filter((transaction) => transaction.id !== transactionId)
    })
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transaction,
        transactions,
        selectTransaction,
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
