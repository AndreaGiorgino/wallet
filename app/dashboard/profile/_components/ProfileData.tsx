"use client"

import Button from "@/app/_components/Button";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Loader from "@/app/_components/Spinner/Loader";
import TextInput from "@/app/_components/TextInput";
import { useSession } from "next-auth/react";
import { SubmitEvent, useEffect, useState } from "react";

interface User {
    first_name: string,
    last_name: string,
    email: string,
};

export default function ProfileData() {
    const { data: session, status } = useSession();
    const [editing, setEditing] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        if (status === "loading")
            return;

        setError("");

        try {
            const res = await fetch("http://localhost:8080/user/get", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });

            const data = await res.json();
            if (!res?.ok || !data) {
                setError("Cannot get user data.")
                return;
            }

            setUser({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
            });
        } catch {
            setError("Something went wrong.")
        }
    }

    const handleSave = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const data = new FormData(form);

        const res = await fetch("http://localhost:8080/user/update", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: data.get("first_name"),
                last_name: data.get("last_name"),
                email: data.get("email"),
            }),
        });

        if (!res?.ok) {
            setError("Something went wrong.")
            return;
        }

        fetchData();
        setEditing(false);
    }

    useEffect(() => {
        fetchData();
    }, [session]);

    return session ? (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-end">
                <h3 className="text-2xl">Your data</h3>
                <ErrorMessage text={error} />
            </div>
            <hr />
            {editing ? (
                <div className="p-6 w-full rounded-lg bg-neutral-950">
                    <form id="data-form" onSubmit={handleSave}>
                        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                            <div>
                                <TextInput id="first_name" placeholder="Jhon" label="First name" defaultValue={user?.first_name} required></TextInput>
                            </div>
                            <div>
                                <TextInput id="last_name" placeholder="Doe" label="Last name" defaultValue={user?.last_name} required></TextInput>
                            </div>

                            <div className="sm:col-span-2">
                                <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" defaultValue={user?.email} required></TextInput>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-6 w-full rounded-lg bg-neutral-950">
                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block mb-2.5 text-sm font-medium text-heading">First name</label>
                            <div className="text-md text-medium">
                                {user?.first_name}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-2.5 text-sm font-medium text-heading">Last name</label>
                            <div className="text-md text-medium">
                                {user?.last_name}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email address</label>
                            <div className="text-md text-medium">
                                {user?.email}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {editing ? (
                <div className="flex flex-col gap-3 justify-end items-center text-sm sm:flex-row">
                    <Button label="Cancel" onClick={() => setEditing(false)} className="w-full border-2 border-neutral-100 bg-neutral-100/25 dark:invert-0 sm:w-auto" />
                    <Button label="Save" type="submit" form="data-form" className="w-full sm:w-auto" />
                </div>
            ) : (
                <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                    <Button label="Edit" onClick={() => setEditing(true)} className="w-full sm:w-auto" />
                </div>
            )}
        </div>
    ) : (
        <Loader />
    )
}