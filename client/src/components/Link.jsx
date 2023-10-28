import { Link as RouterLink } from "react-router-dom";
import MuiLink from "@mui/material/Link";

export default function Link(props) {
    if (props.href) {
        let {href, ...otherProps} = props;

        return (
            <MuiLink
                component={RouterLink}
                to={href}
                {...otherProps}
            />
        );
    }

    return (
        <MuiLink
            {...props}
        />
    );
}
