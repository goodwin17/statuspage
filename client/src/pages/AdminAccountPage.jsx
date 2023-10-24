import useAuth from "@hooks/useAuth";
import PageTitle from "@components/PageTitle";
import DataSection from "@components/DataSection";
import Typography from "@mui/material/Typography";

export default function AdminAccountPage() {
    let { user } = useAuth();
    console.log(user);

    if (!user) {
        return <PageTitle title='No user' />
    }

    return (
        <>
            <PageTitle>Admin Account</PageTitle>
            <DataSection>
                <Typography>Name: {user.name}</Typography>
                <Typography>Login: {user.login}</Typography>
                <Typography>Role: {user.role}</Typography>
            </DataSection>
        </>
    );
}
