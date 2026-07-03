import { SubmitEvent, useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogInForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const form = e.target;
        const data = new FormData(form);

        const res = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password.");
        } else {
            router.push('/dashboard');
        }
    }

    return (
        <div className="flex flex-col w-[30em] px-[2.5em]">
            <h2 className="mb-6 text-3xl">Log In</h2>
            <hr className="mb-6" />
            <form className="bg-neutral-900 rounded-lg p-6 w-[25em]" onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="col-span-2">
                        <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" required></TextInput>
                    </div>

                    <div className="col-span-2">
                        <TextInput id="password" type="password" placeholder="**********" label="Password" required></TextInput>
                    </div>
                </div>
                <div className="flex justify-end text-sm">
                    <Button type="submit" label="Submit"></Button>
                </div>
                {error && (
                    <div className="px-6 py-3 mt-6 rounded-lg bg-red-900/40">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}