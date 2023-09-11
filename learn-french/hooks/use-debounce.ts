import { useEffect, useState } from "react";

// this debaunce hook is used to delay the search request, so that we don't send a request for every key stroke
export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value),delay || 500);
        return () => {
            clearTimeout(timer);
        }
    },[value, delay]);

    return debouncedValue
}

