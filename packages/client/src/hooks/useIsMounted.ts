import {useEffect, useState} from "react";

/** Хук индикации монтирования */
export const useIsMounted = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
        });

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return isMounted;
};