import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButton {
  children: ReactNode,
  onClick?: () => void,
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  className?: string,
  disabled?: boolean,
}