"use client"

import ErrorMessage from "@/app/_components/ErrorMessage"
import Paper from "@/app/_components/Paper"
import { useEffect, useState } from "react"
import { Transaction } from "../../transactions/details/[[...slug]]/_components/TransactionDetails"
import { useSession } from "next-auth/react"
import SpentChart from "./SpentChart"

const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
]

export default function Spent({ transactions }: { transactions?: Transaction[] }) {
    if (!transactions)
        return <ErrorMessage text="Failed to load current month transactions." />

    const { status } = useSession()

    const [state, setState] = useState<Transaction[]>(transactions!)

    const cents_amount = transactions!.filter(transaction => transaction.cents_amount < 0)
        .map(transaction => -transaction.cents_amount)
        .reduce((prev, next) => prev + next, 0)

    useEffect(() => {
        if (transactions)
            setState(transactions);
    }, [transactions])

    if (status === "loading")
        return

    return (
        <Paper title={`Spent in ${monthNames[new Date().getUTCMonth()]}`}>
            <span className="font-medium">&euro; {(cents_amount / 100).toFixed(2)}</span>
            <SpentChart transactions={state} />
        </Paper>
    )
}