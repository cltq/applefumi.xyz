import { type ReactElement, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// CSS-based page transition for better FCP and INP
export default function PageTransition({ children }: PageTransitionProps): ReactElement {
  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  );
}
