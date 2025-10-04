import { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Sidebar({ dataTypes, onSelect }) {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState(dataTypes[0]);

    const handleSelect = (type) => {
        setSelected(type);
        onSelect(type); // notify parent about selection
    };

    return (
        <Drawer
            variant="persistent"
            open={open}
            sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: open ? 240 : 60,
                    transition: "width 0.3s",
                    overflowX: "hidden",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "flex-end" : "center",
                    p: 1,
                }}
            >
                <IconButton onClick={() => setOpen(!open)}>
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </Box>
            <List>
                {dataTypes.map((type) => (
                    <ListItemButton
                        key={type}
                        selected={selected === type}
                        onClick={() => handleSelect(type)}
                        sx={{ justifyContent: open ? "initial" : "center" }}
                    >
                        <ListItemText primary={type} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}
