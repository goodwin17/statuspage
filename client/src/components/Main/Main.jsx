import { Container } from "@mui/material";

export default function Main({ children }) {
    return (
        <main>
            <Container>
                {children}
            </Container>
        </main>
    );
}
