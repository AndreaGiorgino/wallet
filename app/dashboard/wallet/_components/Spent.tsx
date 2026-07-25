"use client"

import ErrorMessage from "@/app/_components/ErrorMessage"
import Paper from "@/app/_components/Paper"
import { useEffect, useState } from "react"
import { Transaction } from "../../transactions/details/[[...slug]]/_components/TransactionDetails"
import { useSession } from "next-auth/react"
import SpentChart from "./SpentChart"

export default function Spent({ transactions }: { transactions?: Transaction[] }) {
    if (!transactions)
        return <ErrorMessage text="Failed to load current month transactions." />

    const { status } = useSession()

    const [state, setState] = useState<Transaction[]>(transactions!)

    const amount = transactions!.filter(transaction => transaction.amount < 0)
        .map(transaction => -transaction.amount)
        .reduce((prev, next) => prev + next, 0)

    useEffect(() => {
        if (transactions)
            setState(transactions);
    }, [transactions])

    if (status === "loading")
        return

    return (
        <Paper title="Spent this month">
            <span className="font-medium">&euro; {amount.toFixed(2)}</span>
            <SpentChart transactions={state} />
        </Paper>
    )
}