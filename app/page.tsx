import AccessForm from "./_components/AccessForm";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex w-full flex-col gap-5 items-center">
                    <h1 className="text-5xl">WALLET</h1>
                    <h6>Track your funds and transactions</h6>
                </div>
                <AccessForm></AccessForm>
            </main>
        </div>
    );
}
