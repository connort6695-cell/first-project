/**
 * Button component
 * Purpose: Reusable DaisyUI-styled button for actions across the app
 * Location: src/components/Button.tsx
 */
import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "ghost" | "link";
	loading?: boolean;
};

export function Button({ children, className = "", variant = "primary", loading = false, disabled, ...props }: ButtonProps) {
	const variantClass = {
		primary: "btn-primary",
		secondary: "btn-secondary",
		ghost: "btn-ghost",
		link: "btn-link",
	}[variant];

	return (
		<button
			className={["btn", variantClass, loading ? "loading" : "", className].filter(Boolean).join(" ")}
			disabled={disabled || loading}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;


