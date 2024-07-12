import { useContextSelector } from 'use-context-selector'
import { dateFormatter } from '../../utils/formatter'
import {
  ButtonsContainer,
  DeleteButton,
  EditButton,
  TransactionsButton,
  UsersContainer,
  UsersTable,
} from './styles'
import { UsersContext } from '../../contexts/UsersContext'
import { useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { NewUserModal } from '../../components/NewUserModal'
import { Money, Pencil, Trash } from 'phosphor-react'

export function Users() {
  const [users, selectUser, deleteUser] = useContextSelector(
    UsersContext,
    (context) => {
      return [context.users, context.selectUser, context.deleteUser]
    },
  )

  const navigation = useNavigate()

  const handleSelectUser = (userId: number) => {
    selectUser(userId)
    navigation('/transactions')
  }

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId)
  }

  return (
    <UsersContainer>
      <h1>Usuários</h1>
      <UsersTable>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td width="50%">{user.name}</td>
              <td>{user.email}</td>
              <td>{dateFormatter.format(new Date(user.createdAt))}</td>
              <td>
                <ButtonsContainer>
                  <TransactionsButton
                    onClick={() => handleSelectUser(user.id)}
                    title="Transações"
                  >
                    <Money size={24} />
                  </TransactionsButton>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <EditButton
                        type="button"
                        onClick={() => {
                          selectUser(user.id)
                        }}
                        title="Editar"
                      >
                        <Pencil size={24} />
                      </EditButton>
                    </Dialog.Trigger>
                    <NewUserModal />
                  </Dialog.Root>

                  <DeleteButton
                    type="button"
                    onClick={async () => await handleDeleteUser(user.id)}
                    title="Excluir"
                  >
                    <Trash size={24} />
                  </DeleteButton>
                </ButtonsContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </UsersTable>
    </UsersContainer>
  )
}
