/* =========================================================
   Dreamy Film Diary — behaviour (vanilla JS)
   ========================================================= */

// ---------- 1. Photo data ----------
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const photos = [
  { src: U("photo-1506744038136-46273834b3fb"), caption: "where the lake holds the sky", category: "nature" },
  { src: U("photo-1495474472287-4d71bcdd2085"), caption: "first coffee, slow morning", category: "cozy" },
  { src: U("photo-1490750967868-88aa4486c946"), caption: "tulips in soft light", category: "flowers" },
  { src: U("photo-1507525428034-b723cf961d3e"), caption: "salt air & sunburn", category: "travel" },
  { src: U("photo-1470071459604-3b5ec3a7fe05"), caption: "fog rolling in", category: "nature" },
  { src: U("photo-1554118811-1e0d58224f24"), caption: "our corner café", category: "cozy" },
  { src: U("photo-1476514525535-07fb3b4ae5f1"), caption: "a summer far away", category: "travel" },
  { src: U("photo-1508610048659-a06b669e3321"), caption: "little wild things", category: "flowers" },
  { src: U("photo-1495616811223-4d98c6e9c869"), caption: "golden hour, again", category: "nature" },
  { src: U("photo-1509042239860-f550ce710b93"), caption: "latte art attempts", category: "cozy" },
  { src: U("photo-1488646953014-85cb44e25828"), caption: "maps & daydreams", category: "travel" },
  { src: U("photo-1501785888041-af3ef285b470"), caption: "quiet water", category: "nature" },
];

// ---------- 2. DOM references ----------
const gallery = document.getElementById("gallery");
const pills = document.querySelectorAll(".pill");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCaption = document.getElementById("lbCaption");
const lbCounter = document.getElementById("lbCounter");

let visiblePhotos = [...photos]; // photos in the current filter
let currentIndex = 0;            // index inside visiblePhotos

// ---------- 3. Scroll fade-in (IntersectionObserver) ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 }
);

// ---------- 4. Render the gallery ----------
function render(list) {
  gallery.innerHTML = "";
  list.forEach((photo, i) => {
    const fig = document.createElement("figure");
    fig.className = "polaroid reveal";
    fig.tabIndex = 0;
    // Random tilt between -4deg and 4deg for a hand-placed feel
    fig.style.setProperty("--rot", `${(Math.random() * 8 - 4).toFixed(1)}deg`);
    fig.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy" />
      <figcaption>${photo.caption}</figcaption>`;

    // Open the lightbox on click or Enter
    fig.addEventListener("click", () => openLightbox(i));
    fig.addEventListener("keydown", (e) => { if (e.key === "Enter") openLightbox(i); });

    gallery.appendChild(fig);
    observer.observe(fig);
  });
}

// ---------- 5. Category filters ----------
pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    if (pill.classList.contains("active")) return;

    // Update active pill style
    pills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");

    const filter = pill.dataset.filter;
    visiblePhotos = filter === "all" ? [...photos] : photos.filter((p) => p.category === filter);

    // Fade out → rearrange → fade back in
    gallery.classList.add("fading");
    setTimeout(() => {
      render(visiblePhotos);
      gallery.classList.remove("fading");
    }, 400);
  });
});

// ---------- 6. Lightbox ----------
function showImage(index) {
  // Wrap around at both ends
  currentIndex = (index + visiblePhotos.length) % visiblePhotos.length;
  const photo = visiblePhotos[currentIndex];
  lbImg.style.opacity = 0;
  setTimeout(() => {
    lbImg.src = photo.src.replace("w=900", "w=1600");
    lbImg.alt = photo.caption;
    lbCaption.textContent = photo.caption;
    lbCounter.textContent = `${currentIndex + 1} / ${visiblePhotos.length}`;
    lbImg.onload = () => (lbImg.style.opacity = 1);
  }, 150);
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // stop background scroll
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
document.getElementById("lbNext").addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

// Click outside the polaroid (on the backdrop) closes it
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

// Keyboard support: ← → Esc
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "ArrowRight") showImage(currentIndex + 1);
  if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  if (e.key === "Escape") closeLightbox();
});

// ---------- 7. Initial render ----------
render(visiblePhotos);
