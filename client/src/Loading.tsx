import {ReactElement} from "react";

export const Loading = (): ReactElement => {
    return (
        <div className="loader-container">
            <div className="loader">Loading...</div>
        </div>
    );
}
