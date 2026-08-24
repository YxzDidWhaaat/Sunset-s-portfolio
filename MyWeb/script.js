const stars = document.getElementById("stars");

// Создаем звезды
for(let i=0;i<120;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"vw";
    star.style.top=Math.random()*70+"vh";

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
