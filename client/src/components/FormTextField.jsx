import TextField from "@mui/material/TextField";
import { capitalize } from '@mui/material';

export default function FormTextField(props) {
    const {spec, ...textFieldProps} = props;

    if (spec.includes("password")) {
        textFieldProps.type = "password";
    }

    return (
        <TextField
            id={spec}
            name={spec}
            label={capitalize(spec)}
            {...textFieldProps}
        />
    );
}
