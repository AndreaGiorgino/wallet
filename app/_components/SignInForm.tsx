import { SubmitEvent, useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

export default function SignInForm() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const form = e.target;
        const data = new FormData(form);

        if (data.get("password") !== data.get("confirm_password")) {
            setError("Passwords does not match.");
            return null;
        }

        const res = await fetch("http://localhost:8080/login", {
            method: 'POST',
            body: JSON.stringify({
                first_name: data.get("first_name"),
                last_name: data.get("last_name"),
                email: data.get("email"),
                password: data.get("password"),
            }),
            headers: { "Content-Type": "application/json" }
        });

        const user = await res.json()
        if (res.ok && user) {
            return user;
        } else {
            setError("Somethin went wrong.");
            return null;
        }
    };

    return (
        <div className="flex flex-col w-[30em] px-[2.5em]">
            <h2 className="text-3xl mb-6">Sign In</h2>
            <hr className="mb-6" />
            <form className="bg-neutral-900 rounded-lg p-6 w-[25em]" onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <TextInput id="first_name" placeholder="Jhon" label="First name" required></TextInput>
                    </div>
                    <div>
                        <TextInput id="last_name" placeholder="Doe" label="Last name" required></TextInput>
                    </div>

                    <div className="col-span-2">
                        <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" required></TextInput>
                    </div>

                    <div className="col-span-2">
                        <TextInput id="password" type="password" placeholder="**********" label="Password" required></TextInput>
                    </div>
                    <div className="col-span-2">
                        <TextInput id="confirm_password" type="password" placeholder="**********" label="Confirm password" required></TextInput>
                    </div>
                </div>
                <div className="flex justify-end text-sm">
                    <Button type="submit" label="Submit"></Button>
                </div>
                {error && (
                    <div className="bg-red-900/40 px-6 py-3 mt-6 rounded-lg">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}