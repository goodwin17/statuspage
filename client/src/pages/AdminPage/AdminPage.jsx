import useAuth from "@hooks/useAuth";
import PageTitle from "@components/PageTitle";
import Box from "@mui/material/Box";
import DataSection from "@components/DataSection";

export default function AdminPage() {
    let { user } = useAuth();

    return (
        <>
            <PageTitle title='Admin Page' />
            <DataSection title='Services'>
                test
            </DataSection>
        </>
    );
}
