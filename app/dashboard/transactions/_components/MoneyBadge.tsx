"use client"

export default function MoneyBadge({ cents_amount }: { cents_amount: number }) {
    return (
        <div className={`text-sm rounded-lg px-3 py-1 ${cents_amount > 0 ? "bg-green-900/40" : "bg-red-900/40"}`}>
            <span>&euro; {Math.abs(cents_amount / 100).toFixed(2)}</span>
        </div>
    )
}