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

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.remove("active");
  }
}

function loadLayoutParts() {
  fetch("/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      const navbarElement = document.getElementById("navbar-placeholder");
      if (navbarElement) {
        navbarElement.innerHTML = html;
      }
      enableLoaderLinks();
    });

  fetch("/footer.html")
    .then((res) => res.text())
    .then((html) => {
      const footerElement = document.getElementById("footer-placeholder");
      if (footerElement) {
        footerElement.innerHTML = html;
      }
    });

  fetch("email/contact_form.html")
    .then((res) => res.text())
    .then((html) => {
      const contactFormEl = document.getElementById("contact-form-placeholder");
      if (contactFormEl) {
        contactFormEl.innerHTML = html;
      }
    });
}

window.addEventListener("pageshow", (event) => {
  document.getElementById("loader").classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  loadLayoutParts();
  hideLoader();
});
