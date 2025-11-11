(function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', () => {

    const btnModoOscuro = document.querySelector('.boton-modo-oscuro');
    const body = document.body;
    const icon = btnModoOscuro ? btnModoOscuro.querySelector('i') : null;

    if (icon && localStorage.getItem('theme') === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    if (btnModoOscuro) {
        btnModoOscuro.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
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
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(event) {
       event.preventDefault();

       btn.value = 'Enviando...';
       
       formMessage.textContent = '';
       formMessage.className = 'form-message'; 

       const serviceID = 'default_service';
       const templateID = 'template_9gv6bst';

       emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
           btn.value = 'Enviar Mensaje';
           form.reset();
           
           formMessage.textContent = '¡Mensaje enviado con éxito!';
           formMessage.classList.add('success');
           
           setTimeout(() => {
                formMessage.className = 'form-message';
           }, 5000);

        }, (err) => {
           btn.value = 'Enviar Mensaje';
           
           formMessage.textContent = 'Hubo un error al enviar el mensaje.';
           formMessage.classList.add('error');
           console.error('EmailJS Error:', err);
           
           setTimeout(() => {
                formMessage.className = 'form-message';
           }, 5000);
        });
    });

});