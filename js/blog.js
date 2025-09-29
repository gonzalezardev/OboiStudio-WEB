// blog.js (solo lectura)

// 📦 Importamos módulos de Firebase
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import { 
  getFirestore, collection, query, where, orderBy, limit, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// 🔧 Configuración de Firebase (misma que tu index.html)
const firebaseConfig = {
  apiKey: "AIzaSyAOlNu7B3NI-XmNC5Fp1AkRew8GSeySXNA",
  authDomain: "oboi-studio-2ad7c.firebaseapp.com",
  projectId: "oboi-studio-2ad7c",
  storageBucket: "oboi-studio-2ad7c.appspot.com",
  messagingSenderId: "410155691404",
  appId: "1:410155691404:web:dc6ab005e49387e8a37aa9",
  measurementId: "G-W96LYML67H"
};

// 🚀 Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// 🧩 Escapado de texto para evitar inyección HTML
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, m => (
  { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]
));

// 🗓️ Formatear fecha desde Timestamp
const fmtFecha = (ts) => {
  try {
    const d = ts?.toDate ? ts.toDate() : new Date();
    return d.toLocaleString(); // usa configuración local del navegador
  } catch { 
    return ''; 
  }
};

// 🎨 Render de un post
function renderPost(datos) {
  const { title, content, image, createdAt } = datos;

  return `
    <article class="blog-post">
      ${image ? `<img src="${esc(image)}" alt="Imagen destacada" class="blog-img" />` : ''}
      <h3>${esc(title)}</h3>
      <p class="meta" style="color:#667085;font-size:.9rem;">${fmtFecha(createdAt)}</p>
      <p>${esc(content)}</p>
    </article>
  `;
}

// 📥 Cargar publicaciones en #publicaciones
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("publicaciones");
  if (!contenedor) return;

  // 📌 Query: solo posts publicados, ordenados por fecha desc, máximo 10
  const q = query(
    collection(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  // 🔄 Escucha en tiempo real (si publicás algo nuevo, aparece solo)
  onSnapshot(q, (snap) => {
    if (snap.empty) {
      contenedor.innerHTML = `
        <div class="blog-post">
          <h3>No hay publicaciones todavía</h3>
          <p>Pronto habrá novedades de Oboi Studio 👀</p>
        </div>
      `;
      return;
    }

    const html = snap.docs.map(d => renderPost(d.data())).join('');
    contenedor.innerHTML = html;
  }, (err) => {
    contenedor.innerHTML = `
      <div class="blog-post">
        <h3>Error al cargar el blog</h3>
        <p style="color:#b42318">${esc(err.message)}</p>
      </div>
    `;
  });
});

// Muestra solo 3 posts en la página principal
const q = query(
  collection(db, "posts"),
  where("published", "==", true),
  orderBy("createdAt", "desc"),
  limit(3) // 👈 solo 3 posts
);
