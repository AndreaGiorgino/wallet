import { getServerSession } from "next-auth"
import Balance from "./_components/Balance"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

export default async function Wallet() {
    const session = await getServerSession(authOptions)

    const amount = await (async () => {
        try {
            const res = await fetch("http://localhost:8080/wallet/balance", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()
            if (!res.ok || !data)
                throw {}
            return data.balance
        } catch { }
    })()

    return (
        <div className="flex flex-col flex-1 gap-6 w-full">
            <Balance amount={amount} />
        </div>
    )
}