import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Sparkles,
  Image as ImageIcon,
  CalendarClock,
  Users,
  KeyRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  useSidebar,
} from "@/components/ui/sidebar";

export const adminNavItems = [
  { title: "Mis Citas", url: "/admin/citas", icon: LayoutGrid },
  { title: "Servicios", url: "/admin/servicios", icon: Sparkles },
  { title: "Imágenes", url: "/admin/imagenes", icon: ImageIcon },
  { title: "Horario", url: "/admin/horario", icon: CalendarClock },
  { title: "Equipo", url: "/admin/equipo", icon: Users },
  { title: "Accesos", url: "/admin/accesos", icon: KeyRound },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0 border border-border">
            <AvatarImage src="" alt="Avatar del cliente" />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">
              OR
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Orveka Studio</p>
              <p className="truncate text-xs text-muted-foreground">
                hello@orveka.studio
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="uppercase text-[0.65rem] tracking-[0.2em]">
              Panel
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                    <NavLink to={item.url} end className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;