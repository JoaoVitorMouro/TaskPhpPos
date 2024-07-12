import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface UsersContextProps {
  children: ReactNode
}

interface UsersProps {
  id: number
  name: string
  email: string
  createdAt: string
}

interface CreateUserProps {
  name: string
  email: string
}

interface UpdateUserProps {
  id: number
  name: string
  email: string
}

interface UsersContextType {
  user: UsersProps | undefined
  users: UsersProps[]
  fetchUsers: (query?: string) => Promise<void>
  selectUser: (userId?: number) => void
  createUser: (data: CreateUserProps) => Promise<void>
  updateUser: (data: UpdateUserProps) => Promise<void>
  deleteUser: (userId: number) => Promise<void>
}

export const UsersContext = createContext({} as UsersContextType)

export function UsersProvider({ children }: UsersContextProps) {
  const [user, setUser] = useState<UsersProps | undefined>(undefined)
  const [users, setUsers] = useState<UsersProps[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'johnDoe@teste.com',
      createdAt: new Date().toISOString(),
    },
  ])

  const fetchUsers = useCallback(async (query?: string) => {
    const response = await api.get('/api/users', {
      params: {
        q: query,
      },
    })

    setUsers(response.data.data)
  }, [])

  const selectUser = (userId?: number) => {
    const findUser = users.find((user) => user.id === userId)
    setUser(findUser)
  }

  const createUser = useCallback(async (data: CreateUserProps) => {
    const { email, name } = data

    const response = await api.post('/api/users', {
      email,
      name,
    })

    setUsers((state) => [response.data.data, ...state])
  }, [])

  const updateUser = useCallback(async (data: UpdateUserProps) => {
    const { id, email, name } = data

    const response = await api.post(`/api/users/${id}`, {
      id,
      email,
      name,
    })

    setUsers((state) => {
      return state.map((user) => {
        if (user.id === id) {
          return response.data.data
        }

        return user
      })
    })
  }, [])

  const deleteUser = useCallback(async (userId: number) => {
    await api.post(`/api/users/${userId}`)

    setUsers((state) => {
      return state.filter((user) => user.id !== userId)
    })
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <UsersContext.Provider
      value={{
        user,
        users,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        selectUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
