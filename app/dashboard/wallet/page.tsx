import { getServerSession } from "next-auth"
import Balance from "./_components/Balance"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { Transaction } from "../transactions/details/[[...slug]]/_components/TransactionDetails"
import LastTransactions from "./LastTransactions"

export default async function Wallet() {
    const session = await getServerSession(authOptions)

    const amount = await (async () => {
        try {
            const res = await fetch(`${process.env.API_URL}/wallet/balance`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            })

            const data = await res.json()
            if (!res.ok || !data)
                throw {}
            return data.balance
        } catch { }
    })()

    const lastTransactions = await (async () => {
        try {
            const res = await fetch(`${process.env.API_URL}/wallet/transactions/5`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            })

            const data = await res.json()
            if (!res.ok || !data)
                throw {}
            return data.transactions as Transaction[]
        } catch { }
    })()

    return (
        <div className="flex flex-col flex-1 gap-6 w-full">
            <div className="mb-6">
                <Balance amount={amount} />
            </div>
            <LastTransactions transactions={lastTransactions} />
        </div>
    )
}