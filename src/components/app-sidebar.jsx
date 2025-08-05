import * as React from "react"

import Link from "next/link"

import { useAuth } from "@/context/AuthContext"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["Hotel Paraiso", "Hotel Copacabana"],
  navMain: [
    {
      title: "Gestiona tu Hotel",
      url: "/dashboard/inicio",
      items: [
        {
          title: "Inicio  ",
          url: "/dashboard/inicio",
        },
        {
          title: "Mi Hotel",
          url: "/dashboard/mi-hotel",
        },
        {
          title: "Apariencia",
          url: "#",
        },
        {
          title: "Servicios",
          url: "#",
        },
        {
          title: "Galeria",
          url: "/dashboard/inicio",
        },
      ],
    },
    {
      title: "Gestiona tus Habitaciones",
      url: "#",
      items: [
        {
          title: "Mis Habitaciones",
          url: "/dashboard/productos",
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Llama a la función del contexto
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>Cuenta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  Cerrar sesión
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
