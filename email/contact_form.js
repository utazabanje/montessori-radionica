document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch('send_email.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      const responseDiv = document.getElementById('form-response');
      if (data.success) {
        responseDiv.innerHTML = '<div class="alert alert-success">Poruka je uspešno poslata!</div>';
        form.reset();
      } else {
        responseDiv.innerHTML = '<div class="alert alert-danger">Greška: ' + data.message + '</div>';
      }
    })
    .catch(() => {
      document.getElementById('form-response').innerHTML =
        '<div class="alert alert-danger">Došlo je do greške prilikom slanja.</div>';
    });
});
