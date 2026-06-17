import type {ReactNode} from "react";

type CardProps = {
    children: ReactNode;
}

export default function Card({children}: CardProps){
    return(
        <div className="rounded-xl shadow-md p-4 bg-green">
            {children}
        </div>
    )
}
