import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-lift",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-neon hover:shadow-[0_0_30px_hsl(var(--primary-glow)/0.5)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-glow shadow-[0_0_20px_hsl(var(--destructive)/0.3)]",
        outline: "border border-glass-border bg-glass/50 text-foreground hover:bg-glass hover:shadow-glass backdrop-blur-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-glow shadow-purple hover:shadow-[0_0_30px_hsl(var(--secondary-glow)/0.5)]",
        ghost: "hover:bg-glass/30 hover:backdrop-blur-sm text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        neon: "bg-gradient-primary text-primary-foreground shadow-neon hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:scale-105",
        glass: "glass text-foreground hover:shadow-glass hover:border-primary/30",
        gold: "bg-accent text-accent-foreground shadow-gold hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)] hover:bg-accent-glow",
        admin: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-neon hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)]",
        sponsor: "bg-gradient-to-r from-accent to-accent-glow text-accent-foreground shadow-gold hover:shadow-[0_0_40px_hsl(var(--accent)/0.7)]",
        participant: "bg-gradient-to-r from-secondary to-secondary-glow text-secondary-foreground shadow-purple hover:shadow-[0_0_40px_hsl(var(--secondary)/0.7)]",
        judge: "bg-gradient-to-r from-destructive to-destructive-glow text-destructive-foreground hover:shadow-[0_0_40px_hsl(var(--destructive)/0.7)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-14 rounded-lg px-10 text-base",
        icon: "h-11 w-11",
        xl: "h-16 px-12 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
