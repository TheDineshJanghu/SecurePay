import { useEffect, useState } from "react"
import { getAvatarUrl } from "../functions/getAvatarUrl"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import BigNumber from 'bignumber.js';


export const useCashApp = () => {

    const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(fallbackState);

    useEffect(() => {
        try {
            const storedValue = window.localStorage.getItem(storageKey);

            if (storedValue !== null) {
                setValue(JSON.parse(storedValue));
            }
        } catch (error) {
            console.error(`Failed to read localStorage key: ${storageKey}`, error);
        }
    }, [storageKey]);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                storageKey,
                JSON.stringify(value)
            );
        } catch (error) {
            console.error(`Failed to save localStorage key: ${storageKey}`, error);
        }
    }, [value, storageKey]);

    return [value, setValue];
};


    const { connection } = useConnection();
    const { connected, publicKey, sendTransaction } = useWallet()

    const [avatar, setAvatar] = useState("")
    const [userAddress, setUserAddress] = useState("11111111111111111111111111111111")
    const [amount, setAmount] = useState(0)
    const [transactions, setTransactions] = useLocalStorage("transactions", []);
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)

useEffect(() => {
    if (connected && publicKey) {
        const address = publicKey.toString();

        setAvatar(getAvatarUrl(address));
        setUserAddress(address);
    } else {
        setAvatar("");
        setUserAddress("");
    }
}, [connected, publicKey]);


    async function makeTransaction(fromWallet, toWallet, amount, reference) {
        const network = WalletAdapterNetwork.Devnet
        const endpoint = clusterApiUrl(network)
        const connection = new Connection(endpoint)

        const { blockhash } = await connection.getLatestBlockhash('finalized')

        const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: fromWallet,
        })

        const transferInstruction = SystemProgram.transfer({
            fromPubkey: fromWallet,
            lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
            toPubkey: toWallet,
        })


        transferInstruction.keys.push({
            pubkey: reference,
            isSigner: false,
            isWritable: false,
        })

        transaction.add(transferInstruction)

        return transaction
    }

    async function doTransaction({ amount, receiver, transactionPurpose }) {
        const fromWallet = publicKey
        const toWallet = new PublicKey(receiver)
        const bnAmount = new BigNumber(amount)
        const reference = Keypair.generate().publicKey
        const transaction = await makeTransaction(fromWallet, toWallet, bnAmount, reference)

        await sendTransaction(transaction, connection)


        const newID = (transactions.length + 1).toString()
        const newTransaction = {
            id: newID,
            from: {
                name: publicKey,
                handle: publicKey,
                avatar: avatar,
                verified: true,
            },
            to: {
                name: receiver,
                handle: '-',
                avatar: getAvatarUrl(receiver.toString()),
                verified: false,
            },
            description: transactionPurpose,
            transactionDate: new Date(),
            status: 'Completed',
            amount: amount,
            source: '-',
            identifier: '-',
        };
        setNewTransactionModalOpen(false);
        setTransactions([newTransaction, ...transactions]);
    }



    return { getAvatarUrl, avatar, userAddress, amount, setAmount, makeTransaction, doTransaction, transactions, setTransactions, newTransactionModalOpen, setNewTransactionModalOpen }
}
