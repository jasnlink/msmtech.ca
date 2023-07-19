import { RefObject } from "react";

// This NumericKeys utility type will filter out the keys of DOMRect which do not correspond to number values.
type NumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

interface UseElementOffsetProps {
    ref: RefObject<HTMLElement>;
    property: NumericKeys<DOMRect>;
}

export default function useElementOffset({ ref, property }:UseElementOffsetProps) {
    if(ref !== null && ref.current !== null) {
        const res = ref.current.getBoundingClientRect()[property]
        return res
    }
    return 0
}