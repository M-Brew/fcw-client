"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import navItems from "@/data/nav-data.json";

export default function SideNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card variant="outlined" elevation={0}>
      <List component="nav">
        {navItems.map((navItem) => (
          <ListItem key={navItem.slug} sx={{ paddingX: 1, paddingY: 0.5 }}>
            <ListItemButton
              sx={{ borderRadius: 2 }}
              onClick={() => {
                router.push(`/dashboard${navItem.slug}`);
              }}
              selected={pathname === `/dashboard${navItem.slug}`}
            >
              <ListItemText
                primary={<Typography fontSize={16}>{navItem.title}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
