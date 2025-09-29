import * as React from "react";
import { GalleryVerticalEnd, LogOutIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ProfileCard } from "./profile-card";
import { BanditIcon } from "./ui/bandit-icon";

// This is sample data.
const data = [
  {
    title: "Logout",
    url: "",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BanditIcon />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">3D Bandit Inc.</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        {/* <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/user/:id/files" className="font-medium">
                  Files
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup> */}

        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {/* <SidebarMenuItem> */}
            {/* <SidebarMenuButton asChild> */}
            <Link href="" className="font-medium">
              <ProfileCard />
            </Link>
            {/* </SidebarMenuButton> */}
            {/* </SidebarMenuItem> */}
            <SidebarMenuItem className="">
              <SidebarMenuButton asChild>
                <Link
                  href="/auth/login"
                  className="text-center font-medium flex gap-2"
                >
                  Logout
                  <LogOutIcon />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
