document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/api/admin/invitations-validated") // crée cette route côté serveur
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // Vide les anciennes lignes
  
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
              <td class="border border-gray-300 px-4 py-2">${user.name}</td>
              <td class="border border-gray-300 px-4 py-2">${user.role}</td>
              <td class="border border-gray-300 px-4 py-2 text-green-600 font-semibold">Validé</td>
            `;
            tbody.appendChild(row);
          });
        } else {
          tbody.innerHTML = "<tr><td colspan='4' class='text-center p-4'>Aucune invitation validée</td></tr>";
        }
      })
      .catch(err => {
        console.error("Erreur lors du chargement des invitations validées :", err);
      });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll("aside nav a");

    links.forEach(link => {
      // On récupère le nom du fichier de la page dans le lien
      const linkPath = new URL(link.href).pathname;

      // Si le lien correspond à la page actuelle
      if (currentPath.endsWith(linkPath)) {
        link.classList.add("bg-gray-700");
      } else {
        link.classList.remove("bg-gray-700");
      }
    });
  });