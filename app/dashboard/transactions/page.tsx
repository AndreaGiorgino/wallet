import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { getServerSession } from "next-auth"
import TransactionsList from "./_components/TransactionsList"
import { Transaction } from "./details/[[...slug]]/_components/TransactionDetails"

const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
]

export default async function Transactions() {
    const session = await getServerSession(authOptions)

    const transactions = await (async () => {
        try {
            const res = await fetch(`${process.env.API_URL}/wallet/transactions`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            })

            const data = await res.json()
            if (!res?.ok || !data)
                throw {}

            return Array.from(
                Map.groupBy(data.transactions, ({ started_date }: Transaction) => {
                    const date = new Date(started_date)
                    return `${date.getDate()}, ${monthNames[date.getMonth()]}`
                })
            ).map(([key, value]) => { return { date: key, items: value } })
        } catch { }
    })()

    return (
        <div className="flex flex-col flex-1 gap-6 w-full">
            <TransactionsList transactions={transactions} />
        </div>
    )
}