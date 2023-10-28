import { Skeleton } from "@mui/material";
import { isObject } from "@helpers/utils";

export default function Loaded({resolve, children, loader = <Skeleton height={'4rem'} />}) {
    if (!isObject(resolve)) {
        return "Invalid 'resolve' parameter";
    }

    if (Object.values(resolve).some(value => value === null)) {
        return loader;
    }

    if (typeof children !== 'function') {
        return "Invalid 'children' input";
    }
    
    return children(resolve);
}
