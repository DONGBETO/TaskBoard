document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "responsable") {
      // Rediriger vers la page de connexion ou autre
      alert("Accès non autorisé !");
      window.location.href = "../creators/dasboard_creator.html";
    }
  });