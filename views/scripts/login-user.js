const loginUser = document.getElementById("loginForm");

loginUser.addEventListener("submit", async (e)=>{
    e.preventDefault();


//Récupération des données

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

 // Gestion des erreurs //Réinitialisation des erreurs
 clearLoginErrors();
  
// Validation manuelle



if (!email || !password) {
  if (!email) showLoginError("email", "L'email est requis.");
  if (!password) showLoginError("password", "Le mot de passe est requis.");
  return;
}

try {
    
    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers:{
            "Content-Type":"application/JSON"
        },
        body: JSON.stringify({email, password}),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.message === "Votre rôle est en attente de validation par un administrateur.") {
        showLoginError("email", "Votre compte n’a pas encore été validé.");
      } else if (data.message === "Utilisateur introuvable") {
        showLoginError("email", "Aucun compte trouvé.");
      } else if (data.message === "Mot de passe incorrect") {
        showLoginError("password", "Mot de passe incorrect.");
      } else {
        showLoginError("email", "Erreur inconnue.");
      }
      return;
    }

    // 🔐 Stocker le token et le rôle dans localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role); // ← très important

    // 🔁 Rediriger selon le rôle
    const role = data.user.role;

    switch (role) {
      case "admin":
        window.location.href = "../admin/dasboard.html";
        break;
      case "responsable":
        window.location.href = "../creators/dasboard_creator.html";
        break;
      case "member":
        window.location.href = "../members/dashboard-member.html";
        break;
      default:
        alert("Rôle inconnu. Contactez un administrateur.");
        break;
    }

  } catch (err) {
    console.error("Erreur réseau :", err);
    alert("Une erreur s’est produite. Réessayez plus tard.");
  }
});

//Gestion de l'affichage d'erreur
function clearLoginErrors() {
    ["email", "password"].forEach((id) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      input?.classList.remove("border-red-500", "ring-red-500");
      if (error) {
        error.textContent = "";
        error.classList.add("hidden");
      }
    });
  }
  
  function showLoginError(id, message) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    input?.classList.add("border-red-500", "ring-1", "ring-red-500");
    if (error) {
      error.textContent = message;
      error.classList.remove("hidden");
    }
  }