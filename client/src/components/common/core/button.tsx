import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full small font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        nav: 'w-full justify-between font-normal text-base hover:bg-blue-50 hover:text-primary group'
      },
      size: {
        default: 'h-8 sm:h-10 px-3 sm:px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

interface ExtendedButtonProps extends ButtonProps {
  loading?: boolean;
}

const ExtendedButton = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  ({ loading, children, ...props }, ref) => {
    props.className = cn('transition-all duration-medium', props.className, loading && 'pointer-events-none');
    return (
      <Button {...props} disabled={props.disabled} ref={ref}>
        {loading && <Loader2 className="animate-spin mr-2.5" />}
        {children}
      </Button>
    );
  }
);
ExtendedButton.displayName = 'Extended Button';

const NavigationButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, ...props }, ref) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    setLoading(true);
    onClick?.(e);
  };

  return <ExtendedButton loading={loading} onClick={handleClick} {...props} ref={ref} />;
});
NavigationButton.displayName = 'Navigation Button';

export { Button, ExtendedButton, buttonVariants, NavigationButton };
