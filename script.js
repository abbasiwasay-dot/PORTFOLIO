(function () {
    var $ = function (id) {
        return document.getElementById(id);
    };

    var els = document.querySelectorAll('.rv');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        els.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        els.forEach(function (element) {
            element.classList.add('in');
        });
    }

    $('mt').onclick = function () {
        var isOpen = $('nav').classList.toggle('open');
        var icon = this.querySelector('i');

        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);

        this.setAttribute('aria-expanded', isOpen);
    };

    var navLinks = document.querySelectorAll('#nav a');

    navLinks.forEach(function (link) {
        link.onclick = function () {
            $('nav').classList.remove('open');

            $('mt').querySelector('i').classList.replace('fa-xmark', 'fa-bars');

            $('mt').setAttribute('aria-expanded', false);
        };
    });

    if ('IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            'on',
                            link.getAttribute('href') === '#' + entry.target.id
                        );
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        document.querySelectorAll('main section[id]').forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    addEventListener('scroll', function () {
        $('hd').classList.toggle('sc', scrollY > 10);
    }, { passive: true });

    $('yr').textContent = new Date().getFullYear();

    $('cf').addEventListener('submit', function (event) {
        event.preventDefault();
        $('fm').textContent = 'Thank you! Your message has been submitted.';
        this.reset();
    });
})();