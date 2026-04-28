import * as React from "react";
import { cn } from "@/src/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: 'low' | 'high' | 'highest';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, container = 'highest', ...props }, ref) => {
    const containers = {
      low: "bg-surface-low",
      high: "bg-surface-high",
      highest: "bg-surface-highest shadow-sm",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
          containers[container],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
