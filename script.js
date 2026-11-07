const toggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('cv-theme');
if (savedTheme === 'light') document.body.classList.add('light');
toggle.textContent = document.body.classList.contains('light') ? '☾' : '☼';
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const theme = document.body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('cv-theme', theme);
  toggle.textContent = theme === 'light' ? '☾' : '☼';
});
