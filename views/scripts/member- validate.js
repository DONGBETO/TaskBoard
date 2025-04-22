document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "member") {
      // Rediriger vers la page de connexion ou autre
      alert("Accès non autorisé !");
      window.location.href = "../login.html";
      window.location.href = "../member/dashboard-member.html";

    }
  });

      
// function afficherUtilisateurs() {
//   // Masquer le header
//   document.querySelector('header').classList.add('hidden');

//   // Masquer tous les enfants du <main> sauf utilisateursSection
//   const mainChildren = document.querySelector('main').children;
//   for (let i = 0; i < mainChildren.length; i++) {
//     mainChildren[i].classList.add('hidden');
//   }

//   // Afficher uniquement la section utilisateurs
//   document.getElementById('utilisateursSection').classList.remove('hidden');
// }

// function retourDashboard() {
//   // Réafficher le header
//   document.querySelector('header').classList.remove('hidden');

//   // Réafficher tous les enfants du <main>
//   const mainChildren = document.querySelector('main').children;
//   for (let i = 0; i < mainChildren.length; i++) {
//     mainChildren[i].classList.remove('hidden');
//   }

//   // Masquer à nouveau la section utilisateurs
//   document.getElementById('utilisateursSection').classList.add('hidden');
// }

function openModal() {
    document.getElementById('modal').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }

  function handleSubmit(event) {
    event.preventDefault();
    closeModal();
    showToast('Projet créé avec succès !');
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  }


    let notifications = [];
  function toggleActions(button) {
  const actionContainer = button.nextElementSibling;
  if (actionContainer) {
      actionContainer.classList.toggle('hidden');
  } else {
      const container = document.createElement('div');
      container.className = 'mt-2 space-x-2 flex';

      const deleteButton = document.createElement('button');
      deleteButton.className = 'px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600';
      deleteButton.textContent = 'Supprimer';
      container.appendChild(deleteButton);

      const editButton = document.createElement('button');
      editButton.className = 'px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600';
      editButton.textContent = 'Modifier';
      container.appendChild(editButton);

      const viewMoreButton = document.createElement('button');
      viewMoreButton.className = 'px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600';
      viewMoreButton.textContent = 'Voir plus';
      container.appendChild(viewMoreButton);

      button.parentElement.appendChild(container);
  }
  if (actionContainer) {
      actionContainer.classList.toggle('hidden');
  }
}
    function toggleActions(button) {
        const actionContainer = button.nextElementSibling;
        if (actionContainer) {
            actionContainer.classList.toggle('hidden');
        }
    }

  function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('hidden');
  }
  function afficherUtilisateurs() {
    // Hide the header
    document.querySelector('header').classList.add('hidden');

    // Hide all children of <main> except utilisateursSection
    const mainChildren = document.querySelector('main').children;
    for (let i = 0; i < mainChildren.length; i++) {
    mainChildren[i].classList.add('hidden');
    }

    // Show only the utilisateursSection
    document.getElementById('utilisateursSection').classList.remove('hidden');
  }

  function afficherUtilisateurs() {
    // Hide the header
    document.querySelector('header').classList.add('hidden');

    // Hide all children of <main> except utilisateursSection
    const mainChildren = document.querySelector('main').children;
    for (let i = 0; i < mainChildren.length; i++) {
    mainChildren[i].classList.add('hidden');
    }
    document.querySelector('aside').classList.add('hidden');
    document.querySelector('.ml-64').classList.remove('ml-64');

    // Show only the utilisateursSection
    document.getElementById('utilisateursSection').classList.remove('hidden');

    // Fetch and display the list of users
    const utilisateursSection = document.getElementById('utilisateursSection');
    const userList = [
    { name: 'Lonard PAMSL', role: 'membre' },
    { name: 'Alice Dupont', role: 'admin' },
    { name: 'Jean Martin', role: 'membre' }
    ];

    const tableBody = utilisateursSection.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    userList.forEach(user => {
    const row = document.createElement('tr');
    row.className = 'border-t hover:bg-gray-50';

    const nameCell = document.createElement('td');
    nameCell.className = 'px-4 py-2';
    nameCell.textContent = user.name;

    const roleCell = document.createElement('td');
    roleCell.className = 'px-4 py-2';
    roleCell.textContent = user.role;

    const actionCell = document.createElement('td');
    actionCell.className = 'px-4 py-2';
    const detailsButton = document.createElement('button');
    detailsButton.className = 'text-sm text-blue-700 hover:underline';
    detailsButton.textContent = 'Détails';
    actionCell.appendChild(detailsButton);

    row.appendChild(nameCell);
    row.appendChild(roleCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
    });
  }
  <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-lg transition hover:scale-105">
    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9.003 9.003 0 0112 3a9.003 9.003 0 016.879 14.804" />
    </svg>
    Utilisateurs
  </a>
  function addNotification(message) {
    notifications.push(message);
    const notificationList = document.getElementById('notificationList');
    const notificationCount = document.getElementById('notificationCount');

    // Update notification count
    notificationCount.textContent = notifications.length;
    notificationCount.classList.remove('hidden');

    // Update notification list
    const newNotification = document.createElement('li');
    newNotification.className = 'p-4 text-sm text-gray-700 hover:bg-gray-100';
    newNotification.textContent = message;
    notificationList.appendChild(newNotification);

    // Remove "Aucune notification" if present
    const noNotification = notificationList.querySelector('li.text-gray-500');
    if (noNotification) {
      noNotification.remove();
    }
  }

  // Example usage
  setTimeout(() => addNotification('Nouvelle tâche assignée !'), 2000);
  setTimeout(() => addNotification('Un projet a été mis à jour.'), 5000);


    // Highlight the current menu item
    document.addEventListener('DOMContentLoaded', () => {
      const menuItems = document.querySelectorAll('aside nav a');
      menuItems.forEach(item => {
        if (item.textContent.trim() === 'Utilisateurs') {
          item.classList.add('bg-blue-900', 'text-white');
        } else {
          item.classList.remove('bg-blue-900', 'text-white');
        }
      });
    });

    function toggleActions(button) {
  const actionContainer = button.nextElementSibling;
  if (actionContainer) {
      actionContainer.classList.toggle('hidden');
  }
}

function supprimerUtilisateur(button) {
  const row = button.closest('tr');
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      row.remove();
      alert('Utilisateur supprimé avec succès.');
  }
}

function voirPlus() {
  alert('Plus de détails sur cet utilisateur.');
}
// Highlight the current menu item
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('aside nav a');
    menuItems.forEach(item => {
        const currentPath = window.location.pathname;
        if (item.href.includes(currentPath)) {
            item.classList.add('bg-blue-900', 'text-white');
        } else {
            item.classList.remove('bg-blue-900', 'text-white');
        }
    });
});