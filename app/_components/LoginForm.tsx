import { SubmitEvent } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

export default function LogInForm() {
    function handleSubmit(e: SubmitEvent<HTMLFormElement>): void {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        console.log(`email: ${formData.get("email")}`);
        console.log(`password: ${formData.get("password")}`);

        // TODO: do something
    }

    return (
        <div className="flex flex-col w-[30em] px-[2.5em]">
            <h2 className="text-3xl mb-6">Log In</h2>
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
            </form>
        </div>
    );
}