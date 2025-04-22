document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Vous devez vous connecter.");
    window.location.href = "../login.html"; // redirige si pas de token
    return;
  }

  const limit = 8; // Nombre d'éléments par page
  let currentPage = 1; // Page actuelle, initialisée à 1

  // Fonction pour charger les utilisateurs avec pagination
  function loadUsers(page) {
    fetch(`http://localhost:8080/api/admin/users?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Token d'authentification
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Réponse de l'API :", data); // Affichage des données

        // Vérifier si la propriété `users` existe et est un tableau
        if (!Array.isArray(data.users)) {
          console.error("Les données reçues ne sont pas un tableau.");
          return;
        }

        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // Vider le tableau avant d'ajouter les nouvelles lignes

        // Parcourir les utilisateurs et ajouter des lignes au tableau
        data.users.forEach(user => {
          const row = document.createElement("tr");
          row.className = "border-t hover:bg-gray-50";

          row.innerHTML = `
            <td class="px-4 py-2">${user.name}</td>
            <td class="px-4 py-2">
              <span class="py-1 px-3 text-md text-white bg-red-500 rounded-full">${user.role}</span>
            </td>
            <td class="px-4 py-2">🟢 Validé</td>
            <td class="px-4 py-2">
              <button class="text-sm text-blue-700 hover:underline">Détails</button>
            </td>
          `;
          tbody.appendChild(row);
        });

        // Mettre à jour la pagination
        updatePagination(data.totalPages, page);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }

  // Fonction pour mettre à jour la pagination
  function updatePagination(totalPages, currentPage) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = ""; // Réinitialiser la pagination

    // Créer les boutons de pagination
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("px-4", "py-2", "mx-1", "border", "rounded", "hover:bg-blue-500", "text-white");

      // Ajouter une classe active si c'est la page courante
      if (i === currentPage) {
        button.classList.add("bg-blue-500");
      }

      button.addEventListener("click", () => {
        currentPage = i; // Mettre à jour la page courante
        loadUsers(currentPage); // Recharger les utilisateurs pour la nouvelle page
      });

      pagination.appendChild(button);
    }
  }

  // Charger la première page de données au démarrage
  loadUsers(currentPage);
});
