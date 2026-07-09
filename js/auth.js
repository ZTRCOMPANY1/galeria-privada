// Se já estiver logado, vai direto pra galeria
(async function checkSession() {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) {
    window.location.href = "galeria.html";
  }
})();

const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");
const loginBtn = document.getElementById("login-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  loginBtn.disabled = true;
  loginBtn.textContent = "Entrando...";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    errorMsg.textContent = "Usuário ou senha inválidos.";
    loginBtn.disabled = false;
    loginBtn.textContent = "Entrar";
    return;
  }

  window.location.href = "galeria.html";
});
