document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      // Rediriger vers la page de connexion ou autre
      alert("Accès non autorisé !");
      window.location.href = "../login.html";
      window.location.href = "../admin/dasboard.html";

    }
  });