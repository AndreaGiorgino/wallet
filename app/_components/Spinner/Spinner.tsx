import "./Spinner.css";

interface SpinnerOptions {
    className?: string,
};

export default function Spinner() {
    return (
        <div className="wrapper scale-50">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>
    );
}