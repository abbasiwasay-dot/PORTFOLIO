
document.addEventListener("DOMContentLoaded", function () {

    // Boot screen
    const bootScreen = document.getElementById("bootScreen");
    const bootLog = document.getElementById("bootLog");
    const bootProgress = document.getElementById("bootProgress");
    const desktop = document.getElementById("desktop");

    const bootMessages = [
        "Loading workspace configuration...",
        "Checking project modules...",
        "Mounting frontend toolkit...",
        "Connecting portfolio interface...",
        "System ready. Welcome, visitor."
    ];

    document.body.classList.add("locked");

    let bootIndex = 0;

    function showBootLine() {

        if (bootIndex < bootMessages.length) {

            const line = document.createElement("div");
            line.textContent = bootMessages[bootIndex];

            bootLog.appendChild(line);

            bootIndex++;

            bootProgress.style.width =
                (bootIndex / bootMessages.length) * 100 + "%";

            setTimeout(showBootLine, 280);

        } else {

            setTimeout(function () {

                bootScreen.classList.add("done");
                desktop.classList.add("ready");
                document.body.classList.remove("locked");

                showSections();

            }, 400);
        }
    }

    showBootLine();


    // Show sections when they appear on screen
    function showSections() {

        const sections = document.querySelectorAll(".reveal");

        if (!("IntersectionObserver" in window)) {

            sections.forEach(function (section) {
                section.classList.add("in-view");
            });

            return;
        }

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);

                }
            });

        }, { threshold: 0.12 });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }


    // Hero typing animation
    const typedText = document.getElementById("typedText");

    if (typedText) {

        const words = [
            "digital experiences.",
            "useful websites.",
            "better interfaces."
        ];

        let wordIndex = 0;
        let letterIndex = words[0].length;
        let deleting = true;

        // Keep the text area the same width
        let longestWord = 0;

        words.forEach(function (word) {

            if (word.length > longestWord) {
                longestWord = word.length;
            }
        });

        typedText.style.minWidth = longestWord + "ch";

        function typeWord() {

            if (deleting) {

                letterIndex--;

                typedText.textContent =
                    words[wordIndex].substring(0, letterIndex);

                if (letterIndex === 0) {

                    deleting = false;
                    wordIndex++;

                    if (wordIndex === words.length) {
                        wordIndex = 0;
                    }

                    setTimeout(typeWord, 300);

                } else {

                    setTimeout(typeWord, 42);
                }

            } else {

                letterIndex++;

                typedText.textContent =
                    words[wordIndex].substring(0, letterIndex);

                if (letterIndex === words[wordIndex].length) {

                    deleting = true;
                    setTimeout(typeWord, 1700);

                } else {

                    setTimeout(typeWord, 65);
                }
            }
        }

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTimeout(typeWord, 1800);
        }
    }


    // Mobile menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("open");

        });

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
            });

        });
    }


    // Active navigation link
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navItems.forEach(function (link) {

                        if (link.getAttribute("href") === "#" + entry.target.id) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }

                    });
                }
            });

        }, { rootMargin: "-35% 0px -55% 0px" });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }


    // Back to top button
    const backTop = document.getElementById("backTop");

    function checkScroll() {

        if (window.scrollY > 500) {
            backTop.classList.add("visible");
        } else {
            backTop.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();

    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // Current year in footer
    document.getElementById("year").textContent =
        new Date().getFullYear();


    // Basic contact form
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            formMessage.textContent =
                "Thank you! Your message has been submitted.";

            contactForm.reset();

        });
    }

});
