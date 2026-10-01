const stars = document.getElementById("stars");

// Создаем звезды (теперь в процентах от высоты hero, чтобы работало на большой странице)
for(let i=0;i<120;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"%";
    star.style.top=Math.random()*70+"%";

    star.style.animationDelay=Math.random()*2+"s";
    star.style.animationDuration=(1+Math.random()*3)+"s";

    stars.appendChild(star);
}

// Легкое изменение цвета неба

const hero = document.querySelector(".hero");
const content = document.querySelector(".content");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    // Затемняем верхнюю часть
    hero.style.filter =
        `brightness(${1 - scroll / 1500}) saturate(${1 - scroll / 2500})`;

    // Заголовок и текст плавно уезжают вверх
    content.style.transform =
        `translate(-50%, calc(-50% - ${scroll * 0.5}px))`;

    // Постепенно исчезают
    content.style.opacity = 1 - scroll / 400;

});

// ---------- Всплывающие окна для фото ----------

const cards = Array.from(document.querySelectorAll(".card"));
const modal = document.getElementById("modal");
const imgBox = document.getElementById("modal-img");
const titleEl = document.getElementById("modal-title");
const textEl = document.getElementById("modal-text");
let current = 0;
let lastFocused = null;

// Если файл фото найден, ставим его на карточку (иначе остаётся градиент)
function loadImage(url, target){
    const img = new Image();
    img.onload = () => { target.style.backgroundImage = `url("${url}")`; };
    img.src = url;
}

cards.forEach(card => loadImage(card.dataset.img, card));

function show(index){
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    titleEl.textContent = card.dataset.title;
    textEl.textContent = card.dataset.text;
    imgBox.style.backgroundImage = "";
    loadImage(card.dataset.img, imgBox);
}

function openModal(index){
    lastFocused = document.activeElement;
    show(index);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    document.getElementById("modal-close").focus();
}

function closeModal(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    if(lastFocused) lastFocused.focus();
}

cards.forEach((card,i) => card.addEventListener("click", () => openModal(i)));
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-prev").addEventListener("click", () => show(current - 1));
document.getElementById("modal-next").addEventListener("click", () => show(current + 1));

// Клик по тёмному фону закрывает окно
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });

document.addEventListener("keydown", e => {
    if(!modal.classList.contains("open")) return;
    if(e.key === "Escape") closeModal();
    if(e.key === "ArrowLeft") show(current - 1);
    if(e.key === "ArrowRight") show(current + 1);
});

// ---------- Рыбы и пузырьки под водой ----------

const water = document.querySelector(".underwater");
const tank = document.createElement("div");
tank.className = "tank";
water.appendChild(tank);

const fishColors = [
    ["#ff8b5f", "#ffd194"],
    ["#ffe97f", "#ff914d"],
    ["#7fe3ff", "#2d6cdf"],
    ["#ff7fb8", "#bb4b8b"],
    ["#a6ffb0", "#2fa36b"]
];

function fishSVG(c1, c2){
    return `
    <svg viewBox="0 0 120 60" aria-hidden="true">
        <defs>
            <linearGradient id="g${c1.slice(1)}${c2.slice(1)}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="${c1}"/>
                <stop offset="1" stop-color="${c2}"/>
            </linearGradient>
        </defs>
        <path class="tail" d="M88 30 L118 8 Q108 30 118 52 Z" fill="${c2}"/>
        <path d="M45 12 Q60 -2 72 12 Z" fill="${c2}" opacity=".85"/>
        <ellipse cx="55" cy="30" rx="42" ry="22" fill="url(#g${c1.slice(1)}${c2.slice(1)})"/>
        <path d="M40 12 Q30 30 40 48" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="28" cy="25" r="5" fill="#fff"/>
        <circle cx="27" cy="25" r="2.5" fill="#021120"/>
    </svg>`;
}

for(let i = 0; i < 9; i++){
    const [c1, c2] = fishColors[i % fishColors.length];
    const fish = document.createElement("div");
    const size = 40 + Math.random() * 70;

    fish.className = "fish" + (Math.random() > 0.5 ? " left" : "");
    fish.style.width = size + "px";
    fish.style.top = (12 + Math.random() * 78) + "%";
    fish.style.opacity = 0.55 + size / 220;
    fish.style.animationDuration = (22 + Math.random() * 28) + "s";
    fish.style.animationDelay = -Math.random() * 40 + "s";
    fish.innerHTML = fishSVG(c1, c2);

    tank.appendChild(fish);
}

for(let i = 0; i < 22; i++){
    const b = document.createElement("div");
    const s = 5 + Math.random() * 14;

    b.className = "bubble";
    b.style.width = b.style.height = s + "px";
    b.style.left = Math.random() * 100 + "%";
    b.style.animationDuration = (9 + Math.random() * 12) + "s";
    b.style.animationDelay = -Math.random() * 20 + "s";

    tank.appendChild(b);
}

// ---------- Круглая кнопка меню ----------

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");

function setMenu(open){
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
}

menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));

document.addEventListener("click", e => {
    if(!menu.contains(e.target)) setMenu(false);
});

document.addEventListener("keydown", e => {
    if(e.key === "Escape") setMenu(false);
});