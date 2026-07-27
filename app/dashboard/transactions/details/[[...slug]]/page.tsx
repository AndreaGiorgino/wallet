import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { getServerSession } from "next-auth"
import TransactionDetails, { Transaction } from "./_components/TransactionDetails"

export default async function Details({ params }: {
    params: Promise<{
        slug: string[]
    }>
}) {
    const { slug } = await params
    const session = await getServerSession(authOptions)

    const types = await (async () => {
        try {
            const res = await fetch(`${process.env.API_URL}/config/transaction_types`, {
                method: "GET",
            })

            const data = await res.json()
            if (!res.ok || !data)
                throw {}
            return data.types
        } catch { }
    })()

    const states = await (async () => {
        try {
            const res = await fetch(`${process.env.API_URL}/config/transaction_states`, {
                method: "GET",
            })

            const data = await res.json()
            if (!res.ok || !data)
                throw {}
            return data.states
        } catch { }
    })()

    const transactionId = slug ? parseInt(slug[0]) : undefined
    const transaction = await (async () => {
        if (transactionId === undefined)
            return undefined

        try {
            const res = await fetch(`${process.env.API_URL}/wallet/transactions/details/${transactionId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            })

            const data = await res.json()
            if (!res.ok || !data)
                throw {}

            return {
                id: transactionId,
                type: data.type,
                started_date: data.started_date,
                completed_date: data.completed_date,
                description: data.description,
                cents_amount: data.cents_amount,
                state: data.state,
            } as Transaction
        } catch { }
    })()

    return (
        <div className="flex flex-col flex-1 gap-6 w-full">
            <TransactionDetails types={types} states={states} transaction={transaction} />
        </div>
    )
}