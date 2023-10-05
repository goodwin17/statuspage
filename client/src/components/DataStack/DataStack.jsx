import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function DataStack({ dataItems }) {
    // dataItems = [{
    //     value,
    //     capture
    // }, ...];

    return (
        <Stack
            spacing={2}
            direction={'row'}
            divider={
                <Divider
                    orientation="vertical"
                    flexItem
                />
            }
            width="100%"
            justifyContent="space-between"
        >
            {dataItems.map((item, index) => (
                <Box key={index} textAlign={'left'} flex={1} paddingLeft={2}>
                    <Typography fontSize={'1.6rem'} fontWeight={500}>
                        {item.value}
                    </Typography>
                    <Typography fontSize={'1.1rem'}>
                        {item.capture}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
}
