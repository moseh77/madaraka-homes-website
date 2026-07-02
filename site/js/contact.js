// contact.js — Form validation + submission for Madaraka Homes
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      await new Promise(r => setTimeout(r, 1500));
      const success = form.querySelector('.form__success');
      if (success) success.style.display = 'block';
      form.reset();
    } catch (err) {
      console.error('Form submission failed:', err);
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
});

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');
  required.forEach(field => {
    field.classList.remove('form__input--error');
    if (!field.value.trim()) {
      field.classList.add('form__input--error');
      valid = false;
    }
  });
  const email = form.querySelector('[type="email"]');
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('form__input--error');
    valid = false;
  }
  return valid;
}
