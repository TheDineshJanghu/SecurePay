import { format } from 'date-fns'

const TransactionItem = ({ id, to, description, transactionDate, amount, toggleTransactionDetailModal }) => {
    const onItemClick = () => {
        toggleTransactionDetailModal(true, id)
    }

    return (
        <div onClick={onItemClick} className="grid gap-4 cursor-pointer grid-cols-8 items-center p-4 hover:bg-black">
            <div className="col-span-2 flex items-center space-x-4">
                <img className="h-8 w-8 rounded-full object-cover" src={to.avatar} alt="" />
                <p className="truncate text-sm text-white">{to.name}</p>
            </div>

            <p className="col-span-4 text-sm text-white">{description}</p>
            <p className="col-span-1 text-sm text-white">{format(new Date(transactionDate), 'MMM d')}</p>
            <p className="col-span-1 text-right text-sm font-medium text-white">{amount} SOL</p>
        </div>
    )
}

export default TransactionItem
