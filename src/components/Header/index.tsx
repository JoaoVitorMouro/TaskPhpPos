import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logoImg.jpg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <div className="bg-gray-900 pt-[2.5rem] pb-[7.5rem] px-0">
      <div className="w-full flex max-w-[1120px] mx-auto px-[1.5rem] justify-between items-center">
        <img
          className="rounded-md w-[6rem] h-[6rem]"
          src={logoImg.src}
          alt=""
        />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="h-[3.125rem] border-0 bg-green-500 text-white font-bold py-0 px-[1.25rem] rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-200"
            >
              Nova Transação
            </button>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </div>
    </div>
  )
}
