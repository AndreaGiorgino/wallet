"use client"

import Button from "@/app/_components/Button";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Paper from "@/app/_components/Paper"
import { useState } from "react";
import { CgDanger } from "react-icons/cg";

export default function ProfileDelete() {
    const [error, setError] = useState<string>("");

    const handleSubmit = async () => {
        setError("");

        // TODO: function "handleSubmit" not implemented yet
    };

    return (
        <div className="flex flex-col gap-8 px-2">
            <Paper error={error} title="Danger Zone">
                <div>Delete profile data and all of the related data</div>
                <ErrorMessage text="This action cannot be revoked!" className="!p-4 w-full" />
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button label="Delete" onClick={handleSubmit} className="w-full ring-red-800 sm:w-auto dark:invert-0 dark:bg-red-500/25 bg-red-900/40" />
            </div>
        </div>
    )
}