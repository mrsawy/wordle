'use client'

import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean | null {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
        const mediaQuery = globalThis.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;