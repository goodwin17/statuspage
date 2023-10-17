import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PageTitle({ title, subtitle }) {
    return (
        <Box sx={{ margin: '2rem 0' }}>
            <Typography variant="h1">
                {title}
            </Typography>
            {subtitle && (
                typeof subtitle === 'object' ? subtitle : (
                    <Typography sx={{fontSize: '1.2rem'}}>
                        {subtitle}
                    </Typography>
                )
            )}
        </Box>
    );
}
