import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import { X } from 'phosphor-react'

import { CloseButton, Content, Overlay } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { UsersContext } from '../../contexts/UsersContext'

const newUserFromSchema = z.object({
  name: z.string(),
  email: z.string(),
})

type NewUserFormInputs = z.infer<typeof newUserFromSchema>

export function NewUserModal() {
  const [user, createUser, updateUser, selectUser] = useContextSelector(
    UsersContext,
    (context) => {
      return [
        context.user,
        context.createUser,
        context.updateUser,
        context.selectUser,
      ]
    },
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewUserFormInputs>({
    resolver: zodResolver(newUserFromSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  })

  async function handleCreateNewUser(data: NewUserFormInputs) {
    if (user) {
      await updateUser({ id: user.id, ...data })
      reset()
    } else {
      await createUser(data)
      reset()
    }

    selectUser(undefined)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>{user ? 'Editar Usuário' : 'Novo Usuário'}</Dialog.Title>

        <CloseButton
          type="button"
          onClick={() => {
            user ? selectUser(undefined) : reset()
          }}
        >
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewUser)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register('name')}
          />
          <input
            type="email"
            placeholder="Email"
            required
            {...register('email')}
          />

          <button type="submit" disabled={isSubmitting}>
            {user ? 'Salvar' : 'Cadastrar'}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
