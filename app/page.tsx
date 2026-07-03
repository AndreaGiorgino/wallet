import AccessForm from "./_components/AccessForm";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center font-sans bg-zinc-50 dark:bg-black">
            <main className="flex flex-col flex-1 items-center px-16 py-32 w-full max-w-3xl bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col gap-5 items-center w-full">
                    <h1 className="text-5xl">WALLET</h1>
                    <h6>Track your funds and transactions</h6>
                </div>
                <AccessForm></AccessForm>
            </main>
        </div>
    );
}
