import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a container ref.
 * Any descendant with the class `reveal` gets `is-visible` added
 * when it enters the viewport, triggering the fadeUp SCSS animation.
 */
const useScrollReveal = (threshold = 0.15) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const targets = container.querySelectorAll('.reveal');
        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );

        targets.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [threshold]);

    return containerRef;
};

export default useScrollReveal;
