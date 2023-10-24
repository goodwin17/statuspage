import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function DataSection({ title, details, children }) {
    return (
        <Box
            component='section'
            sx={{ margin: '2rem 0' }}
        >
            {title && (
                <Box
                    marginBottom={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="h2"
                    >
                        {title}
                    </Typography>
                    {details && (
                        <Typography
                            marginLeft="1rem"
                        >
                            {details}
                        </Typography>
                    )}
                </Box>
            )}
            <Paper
                elevation={4}
                sx={{
                    borderRadius: '0.8rem',
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingLeft: 5,
                    paddingRight: 5
                }}
            >
                {children}
            </Paper>
        </Box>
    );
}
