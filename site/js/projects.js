// projects.js — Filter and search project cards
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.project-card');
  const searchInput = document.querySelector('[data-project-search]');

  function filterProjects(filter) {
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects(btn.dataset.filter);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }
});
