import { Skeleton } from "@mui/material";
import { isObject } from "@helpers/utils";

export default function Loaded({
    resolve,
    children,
    skeletonHeight = '3rem',
    skeletonVariant = 'text',
    loader = null
}) {
    if (!isObject(resolve)) {
        return "Invalid 'resolve' parameter";
    }

    if (Object.values(resolve).some(value => !value)) {
        return loader ?? (
            <Skeleton
                variant={skeletonVariant}
                height={skeletonHeight}
            />
        );
    }

    if (typeof children !== 'function') {
        return "Invalid 'children' input";
    }
    
    return children(resolve);
}
