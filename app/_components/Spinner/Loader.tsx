"use client"

import "./Loader.css";

export default function Loader() {
    return (

        <div className="flex justify-center mt-6 w-full">
            <div className="bg-zinc-50 dark:bg-black shadow-lg dark:shadow-white rounded-full p-6 w-[15em] flex justify-center">
                <div className="scale-50 wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                </div>
            </div>
        </div>
    );
}