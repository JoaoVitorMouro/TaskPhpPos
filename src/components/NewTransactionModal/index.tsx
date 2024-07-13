import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { UsersContext } from '../../contexts/UsersContext'

const newTransactionFromSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
  user_id: z.number(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFromSchema>

export function NewTransactionModal() {
  const [transaction, selectTransaction, createTransaction, updateTransaction] =
    useContextSelector(TransactionsContext, (context) => {
      return [
        context.transaction,
        context.selectTransaction,
        context.createTransaction,
        context.updateTransaction,
      ]
    })

  console.log(transaction)

  const user = useContextSelector(UsersContext, (context) => {
    return context.user
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFromSchema),
    defaultValues: {
      category: transaction?.category,
      description: transaction?.description,
      price: transaction?.price,
      type: transaction?.type,
      user_id: user?.id,
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    if (transaction) {
      await updateTransaction({ id: transaction.id, ...data })
      reset()
    } else {
      await createTransaction(data)
      reset()
    }

    selectTransaction(undefined)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>
          {transaction ? 'Editar Transação' : 'Nova Transação'}
        </Dialog.Title>

        <CloseButton
          type="button"
          onClick={() => {
            transaction ? selectTransaction(undefined) : reset()
          }}
        >
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder={transaction ? transaction.description : 'Descrição'}
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder={transaction ? String(transaction.price) : 'Preço'}
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder={transaction ? transaction.category : 'Categoria'}
            required
            {...register('category')}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            {transaction ? 'Salvar' : 'Cadastrar'}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
