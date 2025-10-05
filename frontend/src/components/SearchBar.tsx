import { Box, TextField, Button, InputAdornment } from "@mui/material";
import { Search } from '@mui/icons-material'
import { SvgIcon } from "@mui/material";

interface SearchBarProps {
    value: string;
    onChange: (v: string) => void;
    onSearch: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
                fullWidth
                placeholder="Search agents..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SvgIcon component={Search} inheritViewBox />
                            </InputAdornment>
                        ),
                    }
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={onSearch}
                sx={{ whiteSpace: "nowrap" }}
            >
                Search
            </Button>
        </Box>
    );
}
