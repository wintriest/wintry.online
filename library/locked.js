document.querySelectorAll('.locked').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const vol = link.dataset.volume;
    
    // alert(`Volume ${vol} is not available yet. Please stay tuned!`);
    
    link.classList.add('shake');
    setTimeout(() => link.classList.remove('shake'), 500);
  });
});
