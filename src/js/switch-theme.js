const toggleTheme = document.querySelector('.toggle');


toggleTheme.addEventListener('click', onSwitchBtn);

if (localStorage.getItem('themePreference') === 'dark') {
  document.body.classList.toggle('dark-theme');
  toggleTheme.classList.toggle('toggle__light');
}

function onSwitchBtn() {
  document.body.classList.toggle('dark-theme');
  toggleTheme.classList.toggle('toggle__light');
  const isDarkTheme = document.body.classList.contains('dark-theme');
  localStorage.setItem('themePreference', isDarkTheme ? 'dark' : 'light');
}
