import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as z from 'zod'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFromSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFromSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFromSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 w-screen h-screen bg-black bg-opacity-75" />

      <Dialog.Content className="min-w-[32rem] rounded-md p-10 bg-gray-800 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Title>Nova Transação</Dialog.Title>

        <Dialog.Close className="absolute bg-transparent border-0 top-6 right-6 leading-none cursor-pointer text-gray-500">
          <X size={24} />
        </Dialog.Close>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit(handleCreateNewTransaction)}
        >
          <input
            className="rounded-md border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            className="rounded-md border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            className="rounded-md border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  className="grid grid-cols-2 gap-1 mt-2"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <RadioGroup.Item
                    className="p-4 flex items-center justify-center gap-2 rounded-md cursor-pointer border-0 text-gray-300 bg-green-500 hover:bg-gray-600 transition-colors"
                    value="income"
                  >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    className="p-4 flex items-center justify-center gap-2 rounded-md cursor-pointer border-0 text-gray-300 bg-red-500 hover:bg-gray-600 transition-colors"
                    value="outcome"
                  >
                    <ArrowCircleDown size={24} />
                    Saída
                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />

          <button
            className="h-14 border-0 bg-green-500 text-white font-bold px-5 rounded-md mt-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-700 transition-colors duration-200"
            type="submit"
            disabled={isSubmitting}
          >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
