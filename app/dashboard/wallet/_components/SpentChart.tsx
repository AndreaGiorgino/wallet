"use client"

import { useSession } from "next-auth/react";
import { Transaction } from "../../transactions/details/[[...slug]]/_components/TransactionDetails";
import { Line } from "react-chartjs-2";
import ErrorMessage from "@/app/_components/ErrorMessage";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const options = {
    responsive: true,
}

const labels = (() => {
    const now = new Date();
    const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    return Array.from({ length: totalDays }, (_, index) =>
        (index + 1).toString().padStart(2, "0")
    );
})()

export default function SpentChart({ transactions }: { transactions?: Transaction[] }) {
    if (!transactions)
        return <ErrorMessage text="Failed to load current month transactions." />

    const { status } = useSession()

    const [state, setState] = useState<Transaction[]>(transactions)

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Amount spent",
                data: labels.map(day =>
                    state.filter(transaction => transaction.cents_amount < 0
                        && new Date(transaction.started_date).getDate().toString().padStart(2, "0") === day)
                        .map(transaction => -transaction.cents_amount)
                        .reduce((prev, next) => prev + next, 0)),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    }

    useEffect(() => {
        if (transactions)
            setState(transactions)
    }, [transactions])

    if (status === "loading")
        return

    return (
        <Line options={options} data={data} />
    )
}