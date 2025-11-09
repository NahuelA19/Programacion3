document.addEventListener('DOMContentLoaded', () => {

    const btnModoOscuro = document.querySelector('.boton-modo-oscuro');
    const body = document.body;

    if (btnModoOscuro) {
        btnModoOscuro.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            const icon = btnModoOscuro.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    const secciones = document.querySelectorAll('.seccion');
    const navLinks = document.querySelectorAll('.navegacion-superior .nav-link');

    if (secciones.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6 
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const linkActivo = document.querySelector(`.navegacion-superior a[href="#${id}"]`);
                    
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    if (linkActivo) {
                        linkActivo.classList.add('active');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        secciones.forEach(seccion => observer.observe(seccion));
    }

    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
    }

    emailjs.init('C-y4RtpMgInwvTJGk');

    const btn = document.getElementById('button');

    document.getElementById('contact-form')
     .addEventListener('submit', function(event) {
       event.preventDefault();

       btn.value = 'Enviando...';

       const serviceID = 'default_service';
       const templateID = 'template_9gv6bst';
       const form = this;

       emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
          btn.value = 'Enviar Mensaje';
          alert('¡Mensaje enviado!');
          form.reset();
        }, (err) => {
          btn.value = 'Enviar Mensaje';
          alert('Error al enviar: ' + JSON.stringify(err));
        });
    });

});