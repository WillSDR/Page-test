

// app.js - Navigation dynamique de site statique

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const url = link.getAttribute("href");

      try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newMain = doc.querySelector("main");

        if (newMain) {
          main.classList.add("fade-out");
          main.addEventListener("transitionend", function handler() {
            main.removeEventListener("transitionend", handler);
            main.innerHTML = newMain.innerHTML;
            main.classList.remove("fade-out");
            main.classList.add("fade-in");
            setTimeout(() => main.classList.remove("fade-in"), 300);
            history.pushState(null, "", url);
          });
        }
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    });
  });

  window.addEventListener("popstate", async () => {
    const url = location.pathname;
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const newMain = doc.querySelector("main");
    if (newMain) {
      main.classList.add("fade-out");
      main.addEventListener("transitionend", function handler() {
        main.removeEventListener("transitionend", handler);
        main.innerHTML = newMain.innerHTML;
        main.classList.remove("fade-out");
        main.classList.add("fade-in");
        setTimeout(() => main.classList.remove("fade-in"), 300);
      });
    }
  });
});