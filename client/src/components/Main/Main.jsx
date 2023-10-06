import Container from "@mui/material/Container";

export default function Main({ children }) {
    return (
        <main>
            <Container>
                {children}
            </Container>
        </main>
    );
}
