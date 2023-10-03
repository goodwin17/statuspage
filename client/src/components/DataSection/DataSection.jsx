import { Container, Typography, Box } from "@mui/material";

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
                <Typography>
                    {title}
                </Typography>
                {details && (
                    <Typography marginLeft='1rem'>
                        {details}
                    </Typography>
                )}
            </Box>
            <Box>
                {children}
            </Box>
        </Container>
    );
}
