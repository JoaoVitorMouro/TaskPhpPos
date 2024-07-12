import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchFormComponent } from './components/SearchForm'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { PriceHighLight } from '@/components/PriceHighLigh'

export default function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />
      <main className="w-full max-w-[1120px] mt-16 mx-auto py-4 px-6">
        <SearchFormComponent />

        <table className="w-full mt-6">
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="bg-white">
                <td
                  className="py-5 px-8 bg-gray-700 first:rounded-tl-lg first:rounded-bl-lg"
                  width="50%"
                >
                  {transaction.description}
                </td>
                <td className="py-5 px-8 bg-gray-700 first:rounded-tl-lg first:rounded-bl-lg">
                  <PriceHighLight
                    variant={transaction.type}
                    price={`${transaction.type === 'outcome' && '- '}
                    ${priceFormatter.format(transaction.price)}`}
                  />
                </td>
                <td className="py-5 px-8 bg-gray-700 first:rounded-tl-lg first:rounded-bl-lg">
                  {transaction.type}
                </td>
                <td className="py-5 px-8 bg-gray-700 first:rounded-tl-lg first:rounded-bl-lg">
                  {dateFormatter.format(new Date(transaction.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
