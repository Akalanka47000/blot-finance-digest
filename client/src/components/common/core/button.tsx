import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md small font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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

const loaderVariants = cva('', {
  variants: {
    variant: {
      default: '#fff',
      outline: '#000',
      secondary: '#000',
      destructive: '#fff'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

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

const loaderSizes: Record<string, number> = {
  sm: 8,
  lg: 20,
  icon: 10
};

const ExtendedButton = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  ({ loading, children, ...props }, ref) => {
    props.className = cn(props.className, loading && '[&>*]:invisible text-transparent');
    return (
      <Button {...props} disabled={props.disabled || loading} ref={ref}>
        <Loader2 className="animate-spin" />
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
