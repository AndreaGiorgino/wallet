"use client"

import "./Spinner.css";

export default function Spinner() {
    return (
        <div className="scale-50 wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>
    );
}