import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WidgetContainerProps {
  title: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}

export function WidgetContainer({
  title,
  children,
  className,
  action,
}: WidgetContainerProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">{children}</CardContent>
    </Card>
  )
}
