"use client"

import { FaWallet } from "react-icons/fa"
import { GrTransaction } from "react-icons/gr"
import { MdPerson } from "react-icons/md"
import NavButton from "./NavButton"

const profileLogo = <MdPerson size={24} />
const walletLogo = <FaWallet size={24} />
const transactionsLogo = <GrTransaction size={24} />

export default function Navbar() {
    return (
        <div className="sticky bottom-[1em] left-0 w-full flex justify-center">
            <ul className="flex gap-2 px-2 py-2 list-none rounded-full w-fit" style={{
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                border: "2px solid rgba(255, 255, 255, .1)"
            }}>
                <NavButton label="Profile" callbackUrl="/dashboard/profile" children={profileLogo}></NavButton>
                <NavButton label="Wallet" callbackUrl="/dashboard/wallet" children={walletLogo}></NavButton>
                <NavButton label="Transactions" callbackUrl="/dashboard/transactions" children={transactionsLogo}></NavButton>
            </ul>
        </div>
    )
}