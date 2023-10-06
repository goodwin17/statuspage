import { Link } from "react-router-dom";
import MuiButton from "@mui/material/Button";

export default function Button(props) {
    if (props.href) {
        let {href, ...otherProps} = props;

        return (
            <MuiButton
                component={Link}
                to={href}
                {...otherProps}
            />
        );
    }

    return (
        <MuiButton
            {...props}
        />
    );
}
