// Lista de productos del catálogo de Valen Cosmetics (6 productos completos)
const mockProducts = [
  {
    id: 1,
    name: "Lip Gloss Velvet Glow",
    category: "Labios",
    description: "Brillo labial hidratante con micro-perlas doradas y acabado aterciopelado que no deja sensación pegajosa.",
    price: "24.99 €",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 2,
    name: "Sérum Iluminador Aura Gold",
    category: "Cuidado Facial",
    description: "Tratamiento revitalizante con extractos botánicos y destellos de oro que aportan frescura instantánea.",
    price: "42.00 €",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1608248597359-54332906649f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 3,
    name: "Paleta Sombras Celestial Rose",
    category: "Ojos",
    description: "9 tonalidades ultra-pigmentadas entre acabados mate sedoso, satinados y micro-glitter de fijación prolongada.",
    price: "36.50 €",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 4,
    name: "Base Líquida Radiance Silk",
    category: "Rostro",
    description: "Cobertura media modulable con efecto segunda piel y ácido hialurónico para mantener la hidratación todo el día.",
    price: "31.00 €",
    images: [
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 5,
    name: "Crema Hidratante Satin Bloom",
    category: "Cuidado Facial",
    description: "Fórmula nutritiva enriquecida con péptidos y agua de rosas que restaura la elasticidad y barrera cutánea.",
    price: "38.50 €",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 6,
    name: "Iluminador Compacto Golden Hour",
    category: "Rostro",
    description: "Polvo sedoso ultra-fino que se funde sin resaltar texturas, brindando un resplandor cálido y natural.",
    price: "28.00 €",
    images: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

// Configuración de visualización y paginación
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

function renderCatalog(products, page = 1) {
  const container = document.getElementById("productGrid");
  if (!container) return;

  container.innerHTML = "";

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = products.slice(start, start + ITEMS_PER_PAGE);

  paginatedItems.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Generar miniaturas para el carrusel hover
    const thumbnailsHtml = prod.images.map((imgUrl, idx) => `
      <div class="thumb-dot ${idx === 0 ? 'active' : ''}" 
           onmouseenter="changeCardImage(${prod.id}, '${imgUrl}', this)">
        <img src="${imgUrl}" alt="${prod.name} vista ${idx + 1}">
      </div>
    `).join("");

    card.innerHTML = `
      <div class="card-media-wrapper">
        <img id="main-img-${prod.id}" class="main-image" src="${prod.images[0]}" alt="${prod.name}">
        <div class="hover-thumbnails">
          ${thumbnailsHtml}
        </div>
      </div>
      <div class="card-info">
        <span class="product-category">${prod.category}</span>
        <h3 class="product-name">${prod.name}</h3>
        <p class="product-desc">${prod.description}</p>
        <div class="card-footer">
          <span class="product-price">${prod.price}</span>
          <button class="btn-view" onclick="alert('Detalle de ${prod.name}')">Ver Detalle</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  renderPagination(products.length, page);
}

// Función global para alternar la foto principal de la card al interactuar con las miniaturas
window.changeCardImage = function(productId, newUrl, thumbEl) {
  const mainImg = document.getElementById(`main-img-${productId}`);
  if (mainImg) {
    mainImg.src = newUrl;
  }
  const parent = thumbEl.parentElement;
  parent.querySelectorAll('.thumb-dot').forEach(el => el.classList.remove('active'));
  thumbEl.classList.add('active');
};

function renderPagination(totalItems, activePage) {
  const paginationContainer = document.getElementById("paginationContainer");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-btn ${i === activePage ? 'active' : ''}`;
    btn.innerText = i;
    btn.onclick = () => {
      currentPage = i;
      renderCatalog(mockProducts, currentPage);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    };
    paginationContainer.appendChild(btn);
  }
}

// Inicialización en la carga del documento
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog(mockProducts, currentPage);
});