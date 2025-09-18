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

// Logout
function logout() {
  auth.signOut().then(() => {
    mostrarVentana("bienvenida");
  });
}