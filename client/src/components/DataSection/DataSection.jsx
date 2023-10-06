import { Container, Typography, Box, Paper } from "@mui/material";

export default function DataSection({ title, details=null, children }) {
    return (
        <Box
            component='section'
            sx={{ margin: '2rem 0' }}
        >
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
