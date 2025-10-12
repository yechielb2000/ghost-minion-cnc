import Typography from "@mui/material/Typography";

interface TitleProps {
    title: string
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <Typography
            variant="h5"
            sx={(theme) => ({
                mb: 3,
                fontWeight: 600,
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.primary.main
            })}>
            {title}
        </Typography>
    )
}

export default Title;