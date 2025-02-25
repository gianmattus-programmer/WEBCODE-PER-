// Funcionalidad del menú móvil mejorada para dispositivos táctiles
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const menuOverlay = document.querySelector('.menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel .slide');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const contactForm = document.getElementById('contact-form');
  const formMessages = document.getElementById('form-messages');
  
  // Variables para el carrusel
  let currentSlide = 0;
  let autoSlideInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Inicializar funcionalidades
  initMobileMenu();
  initCarousel();
  initScrollSpy();
  initContactForm();
  initRevealAnimations();
  adjustCarouselForScreenSize();
  
  // Ajustar elementos al cambio de tamaño de la ventana
  window.addEventListener('resize', function() {
    adjustCarouselForScreenSize();
  });
  
  // Detectar cambios de orientación en dispositivos móviles
  window.addEventListener('orientationchange', function() {
    adjustCarouselForScreenSize();
  });
  
  // Inicializar menú móvil
  function initMobileMenu() {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Añadir soporte para eventos táctiles en dispositivos móviles
    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleTouchStart, false);
      document.addEventListener('touchmove', handleTouchMove, false);
    }
  }
  
  // Alternar menú móvil
  function toggleMobileMenu() {
    document.body.classList.toggle('menu-open');
    document.getElementById('nav-menu').classList.toggle('active');
    menuOverlay.classList.toggle('active');
    const isOpen = document.body.classList.contains('menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    mobileMenuToggle.classList.toggle('active');
  }
  
  // Cerrar menú móvil
  function closeMobileMenu() {
    document.body.classList.remove('menu-open');
    document.getElementById('nav-menu').classList.remove('active');
    menuOverlay.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.classList.remove('active');
  }
  
  // Manejar inicio de evento táctil
  function handleTouchStart(e) {
    if (!document.body.classList.contains('menu-open')) {
      touchStartX = e.changedTouches[0].screenX;
    }
  }
  
  // Manejar movimiento táctil para detección de deslizamiento
  function handleTouchMove(e) {
    if (!document.body.classList.contains('menu-open')) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }
  }
  
  // Detectar dirección de deslizamiento táctil
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Deslizamiento hacia la izquierda (siguiente)
      showSlide(currentSlide + 1);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Deslizamiento hacia la derecha (anterior)
      showSlide(currentSlide - 1);
    }
  }
  
  // Ajustar carrusel para tamaño de pantalla
  function adjustCarouselForScreenSize() {
    const isMobile = window.innerWidth < 768;
    
    // Ajustar altura y estilo de imágenes en dispositivos móviles
    if (isMobile) {
      document.querySelectorAll('.carousel .slide img').forEach(img => {
        img.style.maxHeight = '70vh';
        img.style.objectFit = 'contain';
      });
    } else {
      document.querySelectorAll('.carousel .slide img').forEach(img => {
        img.style.maxHeight = '';
        img.style.objectFit = '';
      });
    }
  }
  
  // Inicializar carrusel
  function initCarousel() {
    if (!carousel) return;
    
    showSlide(0); // Iniciar en la primera diapositiva
    startAutoSlide(); // Iniciar rotación automática
    
    // Controles del carrusel
    prevButton.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
    
    nextButton.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
    
    // Pausar rotación automática al interactuar
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    carousel.addEventListener('touchstart', stopAutoSlide);
    carousel.addEventListener('touchend', startAutoSlide);
  }
  
  // Mostrar diapositiva específica
  function showSlide(index) {
    // Detener rotación automática temporalmente
    stopAutoSlide();
    
    // Normalizar índice (bucle circular)
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    
    // Ocultar diapositiva actual y mostrar la nueva
    slides[currentSlide].classList.remove('active');
    slides[index].classList.add('active');
    currentSlide = index;
    
    // Reiniciar rotación automática
    startAutoSlide();
  }
  
  // Iniciar rotación automática
  function startAutoSlide() {
    stopAutoSlide(); // Evitar múltiples intervalos
    autoSlideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000); // Cambiar cada 5 segundos
  }
  
  // Detener rotación automática
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // Inicializar ScrollSpy para navegación
  function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    let lastScrollTop = 0;
    
    // Función throttleada para mejor rendimiento
    let throttleTimeout;
    window.addEventListener('scroll', function() {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(function() {
          // Detectar dirección de desplazamiento
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollingDown = scrollTop > lastScrollTop;
          lastScrollTop = scrollTop;
          
          // Mostrar/ocultar navbar en móvil al desplazar
          if (window.innerWidth < 768) {
            if (scrollingDown && scrollTop > 100) {
              navbar.classList.add('navbar-hidden');
            } else {
              navbar.classList.remove('navbar-hidden');
            }
          }
          
          // Actualizar link activo basado en la sección visible
          updateActiveNavLink(scrollTop);
          
          throttleTimeout = null;
        }, 100);
      }
    });
  }
  
  // Actualizar enlace activo en la navegación
  function updateActiveNavLink(scrollTop) {
    const sections = document.querySelectorAll('section');
    const navHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 10;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        const id = section.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Inicializar formulario de contacto
  function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar campos
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      
      if (!name.value || !email.value || !subject.value || !message.value) {
        showFormMessage('Por favor, completa todos los campos.', 'error');
        return;
      }
      
      // Validar formato de email
      if (!validateEmail(email.value)) {
        showFormMessage('Por favor, ingresa un email válido.', 'error');
        return;
      }
      
      // Simular envío (reemplazar con código real para enviar)
      showFormMessage('Enviando mensaje...', 'info');
      
      // Simular respuesta del servidor después de 1.5 segundos
      setTimeout(() => {
        showFormMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }
  
  // Mostrar mensaje en el formulario
  function showFormMessage(text, type) {
    formMessages.textContent = text;
    formMessages.className = ''; // Limpiar clases anteriores
    formMessages.classList.add(type);
    formMessages.style.display = 'block';
    
    // Ocultar después de 5 segundos si es un mensaje de éxito
    if (type === 'success') {
      setTimeout(() => {
        formMessages.style.display = 'none';
      }, 5000);
    }
  }
  
  // Validar formato de email
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Animaciones de aparición al hacer scroll
  function initRevealAnimations() {
    // Observador de intersección para elementos con clase 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Dejar de observar una vez activado
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });
      
      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    } else {
      // Fallback para navegadores que no soporten IntersectionObserver
      revealElements.forEach(element => {
        element.classList.add('active');
      });
    }
  }
});

// Funcionalidad del botón volver arriba
window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Validación de formulario
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validar cada campo requerido
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
                field.parentElement.classList.add('show-error');
            } else {
                field.classList.remove('invalid');
                field.parentElement.classList.remove('show-error');
            }
        });
        
        // Validar email
        const emailField = document.getElementById('email');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('invalid');
                emailField.parentElement.classList.add('show-error');
            }
        }
        
        // Si todo es válido, mostrar mensaje de éxito
        if (isValid) {
            const formMessages = document.getElementById('form-messages');
            formMessages.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
            formMessages.className = 'form-notification success';
            contactForm.reset();
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(() => {
                formMessages.textContent = '';
                formMessages.className = 'form-notification';
            }, 5000);
        }
    });
    
    // Quitar mensaje de error al corregir el campo
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', function() {
            if (field.value.trim()) {
                field.classList.remove('invalid');
                field.parentElement.classList.remove('show-error');
            }
        });
    });
}

// Animación de aparición para elementos cuando se hacen visibles
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.services-card, .projects-card, .about-section, .testimonial-card').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Código existente...
    
    // Inicializar los elementos con animación
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover-effect');
        });
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover-effect');
        });
    });
});
