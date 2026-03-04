import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { TourProvider } from "@/components/tour-provider"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TourProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset className="min-w-0 overflow-x-hidden">
          <AppHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TourProvider>
  )
}
