function enableLoaderLinks() {
  document.querySelectorAll(".link-with-loader").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (e.ctrlKey || e.metaKey || e.button === 1) return;
      e.preventDefault();
      document.getElementById("loader").classList.add("active");
      setTimeout(() => {
        window.location.href = this.href;
      }, 500);
    });
  });
}

function loadLayoutParts() {
  fetch("/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("navbar-placeholder").innerHTML = html;
      enableLoaderLinks();
    });

  fetch("/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
    });

  fetch("./email/contact_form.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contact-form-placeholder").innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", loadLayoutParts);
