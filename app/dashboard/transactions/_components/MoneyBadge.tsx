"use client"

export default function MoneyBadge({ amount }: { amount: number }) {
    return (
        <div className={`flex gap-1 text-sm rounded-lg px-3 py-1 ${amount > 0 ? "bg-green-900/40" : "bg-red-900/40"}`}>
            <span>&euro;</span>
            <span>{Math.abs(amount)}</span>
        </div>
    )
}