/**
 * Card component
 * Purpose: Basic DaisyUI card wrapper for consistent layout
 * Location: src/components/Card.tsx
 */
import React from "react";

export type CardProps = React.PropsWithChildren<{
	title?: string;
	actions?: React.ReactNode;
	className?: string;
}>;

export function Card({ title, children, actions, className = "" }: CardProps) {
	return (
		<div className={["card bg-base-100 shadow", className].filter(Boolean).join(" ")}> 
			{title ? (
				<div className="card-body">
					<h2 className="card-title">{title}</h2>
					{children}
					{actions ? <div className="card-actions justify-end">{actions}</div> : null}
				</div>
			) : (
				<div className="card-body">
					{children}
					{actions ? <div className="card-actions justify-end">{actions}</div> : null}
				</div>
			)}
		</div>
	);
}

export default Card;


