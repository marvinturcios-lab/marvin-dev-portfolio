
/* ==========================================
   MARVIN.DEV ANIMATIONS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Respetar preferencias de accesibilidad
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // Activar las animaciones
    document.documentElement.classList.add("js-motion");

    // Elementos principales
    const heroContent = document.querySelector(".hero-content");
    const heroImage = document.querySelector(".hero-image");

    if (heroContent) {
        heroContent.classList.add("reveal", "reveal-left");
    }

    if (heroImage) {
        heroImage.classList.add("reveal", "reveal-right");
    }

    // Elementos que aparecerán al desplazarse
    const selectors = [
        "#estadisticas",
        ".section-heading",
        ".projects-heading",
        ".about-content",
        ".about-decoration",
        ".contact-content",
        ".contact-icon",
        "footer"
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("reveal");
        });
    });

    // Animación escalonada para las tarjetas
    const cardSelectors = [
        ".stat-card",
        ".skill-card",
        ".project-card",
        ".about-details > div"
    ];

    cardSelectors.forEach(selector => {
        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {
            card.classList.add("reveal", "reveal-scale");

            card.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 85, 510)}ms`
            );
        });
    });

    // Mostrar elementos al entrar en pantalla
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -45px 0px"
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });

    // Desplazamiento suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

});
