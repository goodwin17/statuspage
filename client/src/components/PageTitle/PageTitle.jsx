import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PageTitle({ title, details }) {
    return (
        <Box sx={{ margin: '2rem 0' }}>
            <Typography variant="h1">
                {title}
            </Typography>
            {details && (
                <Typography sx={{fontSize: '1.2rem'}}>
                    {details}
                </Typography>
            )}
        </Box>
    );
}
