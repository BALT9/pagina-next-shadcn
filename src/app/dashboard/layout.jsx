"use client";

import { ModeToggle } from "@/components/interuptor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ClientOnly from "@/components/auth/ClientOnly";
import { AppSidebar } from "@/components/app-sidebar";

export default function Page({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <ClientOnly>
          <ProtectedRoute>
            {/* TODO el dashboard solo se muestra si está autenticado */}
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <ModeToggle />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Gestiona tu información</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4">
                {children}
              </div>
            </SidebarInset>
          </ProtectedRoute>
        </ClientOnly>
      </SidebarProvider>
    </ThemeProvider>
  );
}
