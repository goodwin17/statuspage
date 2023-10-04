import { Container, Typography, Box, Paper } from "@mui/material";

export default function DataSection({ title, details=null, children }) {
    return (
        <Container
            component='section'
            sx={{ padding: '1rem 0' }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Typography
                    variant="h2"
                    fontWeight="500"
                >
                    {title}
                </Typography>
                {details && (
                    <Typography
                        variant="h3"
                        component="span"
                        marginLeft="1rem"
                    >
                        {details}
                    </Typography>
                )}
            </Box>
            <Paper elevation={4} sx={{borderRadius: '1rem'}}>
                {children}
            </Paper>
        </Container>
    );
}
