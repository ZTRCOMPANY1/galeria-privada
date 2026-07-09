const BUCKET = "media";
let currentUser = null;
let categories = [];
let activeCategoryId = "all";

// -------------------- AUTH GUARD --------------------
(async function init() {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
    return;
  }
  currentUser = data.session.user;
  await loadCategories();
  await loadFiles();
})();

document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
});

// -------------------- CATEGORIAS --------------------
async function loadCategories() {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }
  categories = data || [];
  renderTabs();
  renderCategorySelect();
}

function renderTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = "";

  const allTab = document.createElement("div");
  allTab.className = "tab" + (activeCategoryId === "all" ? " active" : "");
  allTab.textContent = "Todas";
  allTab.onclick = () => { activeCategoryId = "all"; renderTabs(); loadFiles(); };
  tabs.appendChild(allTab);

  categories.forEach(cat => {
    const tab = document.createElement("div");
    tab.className = "tab" + (activeCategoryId === cat.id ? " active" : "");
    tab.textContent = cat.name;
    tab.onclick = () => { activeCategoryId = cat.id; renderTabs(); loadFiles(); };
    tabs.appendChild(tab);
  });
}

function renderCategorySelect() {
  const select = document.getElementById("upload-category");
  select.innerHTML = "";
  if (categories.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "Crie uma categoria primeiro";
    opt.disabled = true;
    select.appendChild(opt);
    return;
  }
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.name;
    select.appendChild(opt);
  });
}

document.getElementById("add-cat-btn").addEventListener("click", async () => {
  const input = document.getElementById("new-cat-name");
  const name = input.value.trim();
  if (!name) return;

  const { error } = await supabaseClient.from("categories").insert({
    name,
    user_id: currentUser.id
  });

  if (error) {
    alert("Erro ao criar categoria: " + error.message);
    return;
  }
  input.value = "";
  await loadCategories();
});

// -------------------- UPLOAD --------------------
document.getElementById("upload-btn").addEventListener("click", async () => {
  const fileInput = document.getElementById("file-input");
  const categorySelect = document.getElementById("upload-category");
  const progress = document.getElementById("upload-progress");
  const files = fileInput.files;
  const categoryId = categorySelect.value;

  if (!files.length) { alert("Escolha ao menos um arquivo."); return; }
  if (!categoryId) { alert("Crie e selecione uma categoria antes de enviar."); return; }

  const uploadBtn = document.getElementById("upload-btn");
  uploadBtn.disabled = true;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    progress.textContent = `Enviando ${i + 1} de ${files.length}: ${file.name}`;

    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const path = `${currentUser.id}/${safeName}`;

    const { error: uploadError } = await supabaseClient.storage
      .from(BUCKET)
      .upload(path, file);

    if (uploadError) {
      alert(`Erro ao enviar ${file.name}: ${uploadError.message}`);
      continue;
    }

    const type = file.type.startsWith("video") ? "video" : "image";

    const { error: dbError } = await supabaseClient.from("files").insert({
      user_id: currentUser.id,
      category_id: categoryId,
      name: file.name,
      storage_path: path,
      type
    });

    if (dbError) {
      alert(`Erro ao salvar registro de ${file.name}: ${dbError.message}`);
    }
  }

  progress.textContent = "Envio concluído.";
  fileInput.value = "";
  uploadBtn.disabled = false;
  await loadFiles();
});

// -------------------- LISTAGEM --------------------
async function loadFiles() {
  let query = supabaseClient.from("files").select("*").order("created_at", { ascending: false });
  if (activeCategoryId !== "all") {
    query = query.eq("category_id", activeCategoryId);
  }
  const { data, error } = await query;

  if (error) {
    console.error(error);
    return;
  }

  const grid = document.getElementById("grid");
  const emptyMsg = document.getElementById("empty-msg");
  grid.innerHTML = "";

  if (!data || data.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  for (const file of data) {
    const { data: signed, error: signErr } = await supabaseClient.storage
      .from(BUCKET)
      .createSignedUrl(file.storage_path, 3600);

    if (signErr) continue;

    const card = document.createElement("div");
    card.className = "card";

    const media = file.type === "video"
      ? document.createElement("video")
      : document.createElement("img");

    media.src = signed.signedUrl;
    if (file.type === "video") media.controls = true;

    const delBtn = document.createElement("button");
    delBtn.className = "del-btn";
    delBtn.textContent = "×";
    delBtn.onclick = () => deleteFile(file.id, file.storage_path);

    const catName = categories.find(c => c.id === file.category_id)?.name || "";
    const badge = document.createElement("span");
    badge.className = "cat-badge";
    badge.textContent = catName;

    card.appendChild(media);
    card.appendChild(delBtn);
    card.appendChild(badge);
    grid.appendChild(card);
  }
}

async function deleteFile(id, path) {
  if (!confirm("Excluir este arquivo permanentemente?")) return;

  await supabaseClient.storage.from(BUCKET).remove([path]);
  await supabaseClient.from("files").delete().eq("id", id);
  await loadFiles();
}
