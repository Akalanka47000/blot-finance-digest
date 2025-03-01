import { cn } from "@/utils"

export const HighImportanceText = ({ className, children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => {
    return <h1 className={cn("max-w-3xl text-4xl sm:text-5xl md:text-6xl text-center px-6 sm:px-12 uppercase")} {...props}>
        {children}
    </h1>
}

export const FormTitle = ({ className, children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => {
    return <h1 className={cn("text-5xl font-noto text-center mb-10")} {...props}>
        {children}
    </h1>
}