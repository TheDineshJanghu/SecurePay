import { useMemo, useState } from 'react'
import TransactionDetailModal from './TransactionDetailModal'
import TransactionItem from './TransactionItem'

const TransactionsList = ({ connected, transactions }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [currentTransactionID, setCurrentTransactionID] = useState(null)
    const currentTransaction = useMemo(() => transactions.find((transaction) => transaction.id === currentTransactionID), [currentTransactionID])

    const toggleTransactionDetailModal = (value, transactionID) => {
        setCurrentTransactionID(transactionID)
        setModalOpen(value)
    }

    return (
        <div>
            <div className="bg-[#000000] pb-4 pt-10">
                <p className="mx-auto max-w-3xl px-10 text-sm font-medium uppercase text-[#FFFFFF] xl:px-0">Transactions</p>
            </div>
            <div className="mx-auto max-w-3xl divide-y divide-gray-100 py-4 px-10 xl:px-0">
                {connected ? (
                    <>
                        {transactions.map(({ id, to, amount, description, transactionDate }) => (
                            <TransactionItem key={id} id={id} to={to} description={description} transactionDate={transactionDate} amount={amount} toggleTransactionDetailModal={toggleTransactionDetailModal} />
                        ))}

                        <TransactionDetailModal modalOpen={modalOpen} setModalOpen={setModalOpen} currentTransaction={currentTransaction} />
                    </>
                ) : (
                    <div className="flex items-center justify-center pt-20 ">
                        <p className="text-2xl font-medium text-[#FFFFFF]">Connect to the wallet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionsList
