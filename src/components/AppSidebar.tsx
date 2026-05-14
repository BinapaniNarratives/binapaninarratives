import { Home, BookOpen, Sparkles, MessageCircle } from "lucide-react";
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
import binapaniLogo from "@/assets/binapani-logo.png";

const items = [
  { title: "Home", url: "#home", icon: Home },
  { title: "Philosophy", url: "#courses", icon: BookOpen },
  { title: "Subscribe", url: "#home", icon: Sparkles },
  { title: "Assistant", url: "/assistant", icon: MessageCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <a href="#home" className="flex items-center gap-3 px-2 py-3" aria-label="Binapani Narratives home">
          <img
            src={binapaniLogo}
            alt="Binapani Narratives logo"
            className={collapsed ? "h-8 w-8 object-contain" : "h-14 w-14 object-contain"}
          />
          {!collapsed && (
            <div className="leading-none">
              <div className="bn-brand text-lg">
                <span>Binapani </span>
                <span>Narratives</span>
              </div>
              <div className="mt-1 text-[0.42rem] font-black uppercase tracking-[0.38em] text-muted-foreground">
                <span className="text-primary">pritom</span>
                <span className="text-foreground"> modak</span>
              </div>
            </div>
          )}
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
