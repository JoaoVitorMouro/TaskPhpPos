import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logoImg.jpg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useContextSelector } from 'use-context-selector'
import { UsersContext } from '../../contexts/UsersContext'
import { Link } from 'react-router-dom'
import { NewUserModal } from '../NewUserModal'

export function Header() {
  const [user, selectUser] = useContextSelector(UsersContext, (context) => {
    return [context.user, context.selectUser]
  })

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/" onClick={() => selectUser()}>
          <img src={logoImg} alt="" />
        </Link>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>
              {user ? 'Nova Transação' : 'Novo usuário'}
            </NewTransactionButton>
          </Dialog.Trigger>

          {user ? <NewTransactionModal /> : <NewUserModal />}
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
