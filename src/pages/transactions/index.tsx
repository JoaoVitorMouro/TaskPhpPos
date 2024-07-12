import { SearchFormComponent } from './components/SearchForm'
import * as Dialog from '@radix-ui/react-dialog'
import {
  ButtonsContainer,
  DeleteButton,
  EditButton,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { Pencil, Trash } from 'phosphor-react'
import { NewTransactionModal } from '../../components/NewTransactionModal'

export function Transactions() {
  const [transactions, selectTransaction, deleteTransaction] =
    useContextSelector(TransactionsContext, (context) => {
      return [
        context.transactions,
        context.selectTransaction,
        context.deleteTransaction,
      ]
    })

  const handleDeleteTransaction = async (transactionId: number) => {
    await deleteTransaction(transactionId)
  }

  return (
    <TransactionsContainer>
      <SearchFormComponent />
      <TransactionsTable>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td width="50%">{transaction.description}</td>
              <td>
                <PriceHighLight variant={transaction.type}>
                  {transaction.type === 'outcome' && '- '}
                  {priceFormatter.format(transaction.price)}
                </PriceHighLight>
              </td>
              <td>{transaction.type}</td>
              <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              <td>
                <ButtonsContainer>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <EditButton
                        type="button"
                        onClick={() => {
                          selectTransaction(transaction.id)
                        }}
                        title="Editar"
                      >
                        <Pencil size={24} />
                      </EditButton>
                    </Dialog.Trigger>
                    <NewTransactionModal />
                  </Dialog.Root>

                  <DeleteButton
                    type="button"
                    onClick={async () =>
                      await handleDeleteTransaction(transaction.id)
                    }
                    title="Excluir"
                  >
                    <Trash size={24} />
                  </DeleteButton>
                </ButtonsContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </TransactionsTable>
    </TransactionsContainer>
  )
}
