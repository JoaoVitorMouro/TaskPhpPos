import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '@/contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <div
      className="flex gap-[1rem]"
      onSubmit={handleSubmit(handleSearchTransactions)}
    >
      <input
        className="flex-1 border-0 rounded-md bg-gray-900 text-gray-300 p-[1rem]"
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button
        className="flex items-center gap-3 border-0 p-4 bg-transparent border-green-300 text-green-300 font-bold rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:bg-green-500 hover:enabled:border-green-500 hover:enabled:text-white transition-colors duration-200"
        type="submit"
        disabled={isSubmitting}
      >
        <MagnifyingGlass />
        Buscar
      </button>
    </div>
  )
}
