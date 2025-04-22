document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  try {
      const res = await fetch("http://localhost:8080/api/admin/validations");
      const users = await res.json();

      users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-user-id", user._id);  // Ajout de l'attribut data-user-id
    
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
            <td class="border border-gray-300 px-4 py-2">${user.name}</td>
            <td class="border border-gray-300 px-4 py-2 status">${user.role}</td>
            <td class="border border-gray-300 px-4 py-2">
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 validate" onclick="validateInvitation('${user._id}')">Validate</button>
                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onclick="deleteInvitation('${user._id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
  } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
  }
});

function openModal(id) {
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('roleForm').dataset.invitationId = id;
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function assignRole() {
  const id = document.getElementById('roleForm').dataset.invitationId;
  const role = document.getElementById('role').value;
  alert(`Role "${role}" assigned to invitation ${id}!`);
  closeModal();
}

async function validateInvitation(id) {
  try {
    const response = await fetch(`/api/admin/validate-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Vérifie si le serveur a renvoyé une réponse valide
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      let errorMessage = "Erreur inconnue";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }

      console.error("Erreur de validation:", errorMessage);
      alert("Échec de la validation : " + errorMessage);
      return;
    }

    // Si tout s'est bien passé
    const result = await response.json();
    alert(result.message);

    // Met à jour le DOM si la validation a réussi
    const row = document.querySelector(`[data-user-id='${id}']`);
    if (row) {
      row.querySelector(".status").textContent = "Validé ✅";
      const btn = row.querySelector(".validateInvitation");
      if (btn) btn.remove();
    }
  } catch (error) {
    console.error("Erreur JS lors de la validation:", error);
    alert("Une erreur inattendue est survenue.");
  }
}

function deleteInvitation(id) {
  alert(`Invitation ${id} deleted!`);
}
