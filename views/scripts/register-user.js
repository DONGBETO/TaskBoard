const registerUser = document.getElementById("register-form");

registerUser.addEventListener("submit", async (e)=>{
    e.preventDefault();

//  vérification avant submit

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
const role = document.getElementById("role").value;

// Réinitialisation des erreurs
clearAllErrors();

let hasError = false;

// Validation manuelle
if (!name) {
  showError("name", "Veuillez entrer votre nom.");
  hasError = true;
}

if (!email || !/\S+@\S+\.\S+/.test(email)) {
  showError("email", "Veuillez entrer un email valide.");
  hasError = true;
}

if (!password) {
  showError("password", "Le mot de passe est requis.");
  hasError = true;
}

if (hasError) return;

    try{
        const res = await fetch("http://localhost:8080/api/auth/register", {
            method :"POST",
            headers: {
                "content-type": "application/json"
            },
            
            body: JSON.stringify({name, email, password, role}),
        });

        const data = await res.json();

        if(!res.ok){
            // console.log("erreur lors de l'inscription !"); 
            return;
        }else{
            alert("Votre demande a été envoyée à l'administrateur. Vous recevrez un email une fois validé."); 
            window.location.href = "/login.html";
        }
    }

    catch(err){
        console.error("erreur du réseau :", err);
        alert("une erreur s'est produite, veillez réesayer plus tard");
    }
});

function showError(id, message) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    input.classList.add("border-red-500", "ring-red-500");
    error.textContent = message;
    error.classList.remove("hidden");
  }
  
  function clearAllErrors() {
    ["name", "email", "password"].forEach((id) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      input.classList.remove("border-red-500", "ring-red-500");
      error.textContent = "";
      error.classList.add("hidden");
    });
  }
  

  function openModal() {
    document.getElementById('modal').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   closeModal();
  //   showToast('Projet créé avec succès !');
  // }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  }