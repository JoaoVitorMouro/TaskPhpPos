import { useContextSelector } from 'use-context-selector'
import { dateFormatter } from '../../utils/formatter'
import { UsersContainer, UsersTable } from './styles'
import { UsersContext } from '../../contexts/UsersContext'
import { useNavigate } from 'react-router-dom'

export function Users() {
  const [users, selectUser] = useContextSelector(UsersContext, (context) => {
    return [context.users, context.selectUser]
  })

  const navigation = useNavigate()

  const handleSelectUser = (userId: number) => {
    selectUser(userId)
    navigation('/transactions')
  }

  return (
    <UsersContainer>
      <h1>Usuários</h1>
      <UsersTable>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleSelectUser(user.id)}>
              <td width="50%">{user.name}</td>
              <td>{user.email}</td>
              <td>{dateFormatter.format(new Date(user.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </UsersTable>
    </UsersContainer>
  )
}
