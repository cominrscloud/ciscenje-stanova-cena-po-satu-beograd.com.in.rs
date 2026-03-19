// Navigation burger menu
(function(){
  const burger=document.querySelector('.nav-burger');
  const links=document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',function(){
      links.classList.toggle('open');
      burger.setAttribute('aria-expanded',links.classList.contains('open'));
    });
    document.addEventListener('click',function(e){
      if(!burger.contains(e.target)&&!links.contains(e.target)){
        links.classList.remove('open');
      }
    });
  }
  // Active nav link
  const path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    const href=a.getAttribute('href');
    if(href===path||(path===''&&href==='index.html')){
      a.classList.add('active');
    }
  });
})();

// FAQ accordion
(function(){
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      const item=btn.closest('.faq-item');
      const answer=item.querySelector('.faq-a');
      const isOpen=btn.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-q.open').forEach(function(b){
        b.classList.remove('open');
        b.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
      });
      if(!isOpen){
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
})();

// Scroll animations
(function(){
  if(!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
        observer.unobserve(e.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.listing-card,.service-card,.why-card,.testimonial-card').forEach(function(el,i){
    el.style.opacity='0';
    el.style.transform='translateY(20px)';
    el.style.transition='opacity .5s ease '+(i*0.07)+'s, transform .5s ease '+(i*0.07)+'s';
    observer.observe(el);
  });
})();

// Contact form
(function(){
  const form=document.getElementById('contactForm');
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const btn=form.querySelector('[type=submit]');
    btn.textContent='Šalje se...';
    btn.disabled=true;
    setTimeout(function(){
      form.innerHTML='<div style="text-align:center;padding:2rem"><div style="font-size:3rem">✅</div><h3 style="margin-top:1rem;color:#0A1628">Poruka poslata!</h3><p style="color:#475569">Kontaktiraćemo vas u najkraćem roku.</p></div>';
    },1200);
  });
})();

// Lazy load images
(function(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('img[data-src]').forEach(function(img){
      img.src=img.dataset.src;
    });
    return;
  }
  const obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        const img=e.target;
        if(img.dataset.src){img.src=img.dataset.src;delete img.dataset.src;}
        obs.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(function(img){obs.observe(img);});
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    const id=a.getAttribute('href');
    const el=document.querySelector(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});
