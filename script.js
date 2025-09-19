// Config Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "ctcordova-c71e2.firebaseapp.com",
  projectId: "ctcordova-c71e2",
  storageBucket: "ctcordova-c71e2.appspot.com",
  messagingSenderId: "1099351775675",
  appId: "1:1099351775675:web:7e0dc6cf2d571a9df4c9e9"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Cambiar ventanas
function mostrarVentana(nombre) {
  document.querySelectorAll(".ventana").forEach(v => v.classList.remove("active", "animate-in"));
  const nueva = document.getElementById("ventana-" + nombre);
  if (nueva) nueva.classList.add("active", "animate-in");
}

// Loader
function mostrarLoader(mostrar) {
  document.getElementById("loader").style.display = mostrar ? "flex" : "none";
}

// Login
function login() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPassword").value;
  mostrarLoader(true);
  auth.signInWithEmailAndPassword(email, pass)
    .then(user => {
      mostrarLoader(false);
      document.getElementById("userEmail").innerText = "Sesión iniciada como: " + user.user.email;
      mostrarVentana("home");
    })
    .catch(err => {
      mostrarLoader(false);
      document.getElementById("loginMensaje").innerText = "⚠ " + err.message;
    });
}

// Registro
function registrar() {
  const email = document.getElementById("registerEmail").value;
  const pass = document.getElementById("registerPassword").value;
  mostrarLoader(true);
  auth.createUserWithEmailAndPassword(email, pass)
    .then(user => {
      mostrarLoader(false);
      document.getElementById("registerMensaje").innerText = "✅ Cuenta creada: " + user.user.email;
    })
    .catch(err => {
      mostrarLoader(false);
      document.getElementById("registerMensaje").innerText = "⚠ " + err.message;
    });
}

// =============================
// LOGIN
// =============================
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    showLoader("Iniciando sesión...");

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        hideLoader();
        const user = userCredential.user;
        showMessage(Bienvenido ${user.email}, "success");
      })
      .catch((error) => {
        hideLoader();
        showMessage(error.message, "error");
      });
  });
}

// =============================
// REGISTRO
// =============================
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    showLoader("Creando cuenta...");

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        hideLoader();
        const user = userCredential.user;
        showMessage(Cuenta creada: ${user.email}, "success");
      })
      .catch((error) => {
        hideLoader();
        showMessage(error.message, "error");
      });
  });
}

// =============================
// CERRAR SESIÓN
// =============================
function logout() {
  auth.signOut()
    .then(() => {
      showMessage("Has cerrado sesión correctamente", "success");
    })
    .catch((error) => {
      showMessage(error.message, "error");
    });
}

// =============================
// Observador de usuario
// =============================
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Usuario logueado:", user.email);
  } else {
    console.log("Ningún usuario logueado");
  }
});