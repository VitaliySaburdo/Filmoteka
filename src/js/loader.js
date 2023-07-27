
function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}

showLoader(); 

setTimeout(() => {
  hideLoader();
}, 2000); 