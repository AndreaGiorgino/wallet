import TransactionsList from "./_components/TransactionsList";

export default function Transactions() {
    return (
        <div className="flex flex-col flex-1 gap-6 w-full">
            <TransactionsList />
        </div>
    )
}