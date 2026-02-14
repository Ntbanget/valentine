/* ========================= */
/* 💖 TAMBAHAN FITUR HALUS  */
/* ========================= */

// 🎵 Smooth Music Fade In
window.playMusicSmooth = () => {
  const music = document.getElementById("bg-music");
  if (!music) return;

  music.volume = 0;
  music.play().catch(() => {});

  let fade = setInterval(() => {
    if (music.volume < 0.9) {
      music.volume += 0.05;
    } else {
      clearInterval(fade);
    }
  }, 200);
};

// 💖 Soft Floating Hearts
const createSoftHeart = () => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 10 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 5 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
};
setInterval(createSoftHeart, 800);

/* ========================= */
/* 🎬 ANIMATION TIMELINE     */
window.animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };
  const tl = new TimelineMax();

  tl.to(".container", 0.1, { visibility: "visible" })
    // … semua animasi tetap sama seperti kode asli
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .from(".surat-container", 1, { opacity: 0, scale: 0.7, ease: Power2.easeOut }, "-=0.5")
    .from(".wa-button", 1, { opacity: 0, y: 15 }, "-=0.8")
    .call(() => {
      for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = "✨";
        sparkle.style.position = "fixed";
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";
        sparkle.style.fontSize = "18px";
        sparkle.style.animation = "fadeOut 2s forwards";
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
      }
    })
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => { tl.restart(); });
};

/* ========================= */
/* 🔄 FETCH CUSTOM DATA      */
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).forEach((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document.getElementById(customData).setAttribute("src", data[customData]);
          } else {
            document.getElementById(customData).innerText = data[customData];
          }
        }
      });
    });
};
const resolveFetch = () => new Promise((resolve) => { fetchData(); resolve("Fetch done!"); });

// **Hanya panggil timeline setelah tombol musik diklik**
const btn = document.getElementById("playMusicBtn");
btn.addEventListener("click", function () {
  playMusicSmooth();
  animationTimeline();

  btn.style.opacity = "0";
  btn.style.transform = "translateX(-50%) scale(0.8)";
  setTimeout(() => { btn.style.display = "none"; }, 400);
});

resolveFetch(); // tetap fetch data, tapi tidak auto-start timeline
