function initContactForm() {
  const form = document.getElementById("contact-form")
  if (!form) {
    console.warn("Forma nije pronađena.")
    return
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault()

    const responseDiv = document.getElementById("form-response")
    const formData = new FormData(form)

    fetch("send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          responseDiv.innerHTML =
            '<div class="alert alert-success">Poruka je uspešno poslata!</div>'
          form.reset()
        } else {
          responseDiv.innerHTML =
            '<div class="alert alert-danger">Greška: ' +
            data.message +
            "</div>"
        }

        setTimeout(() => {
          responseDiv.innerHTML = ''
        }, 5000)
      })
      .catch(() => {
        responseDiv.innerHTML =
          '<div class="alert alert-danger">Došlo je do greške prilikom slanja.</div>'

        setTimeout(() => {
          responseDiv.innerHTML = ''
        }, 5000)
      })
  })
}

window.initContactForm = initContactForm