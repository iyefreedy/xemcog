import { useEffect, useState } from "react";

export const useDimension = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        document.addEventListener('resize', handleResize);

        return () => document.removeEventListener('resize', handleResize);
    }, [])

    return { size }
}