const loading = document.getElementById("loading");
const main = document.getElementById("main");
const muteBtn = document.getElementById("muteBtn");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("closeOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");

const clickSfx = new Audio("assets/click.mp3");
clickSfx.volume = 0.5;

const ambient = new Audio("assets/ambient.mp3");
ambient.loop = true;
ambient.volume = 0.35;

let muted = false;
let entered = false;

function playClick(){
  if (muted) return;
  try{
    clickSfx.currentTime = 0;
    clickSfx.play();
  }catch(e){}
}

function setMuted(val){
  muted = val;
  muteBtn.setAttribute("aria-pressed", String(muted));
  muteBtn.textContent = muted ? "unmute" : "mute";
  if (muted){
    ambient.pause();
  } else if (entered){
    ambient.play().catch(()=>{});
  }
}

function openOverlay(key){
  const pages = {
    guidelines: {
      title: "contact guidelines",
      html: `
        <p>before contacting me consider the following:</p>

        <h3>commercial</h3>
        <ul>
          <li>commercial use only by agreement / license</li>
        </ul>

        <h3>free stuff</h3>
        <ul>
          <li>no project files</li>
          <li>no free products</li>
        </ul>

        <h3>paid content</h3>
        <ul>
          <li>no teaching</li>
          <li>buy only through official shop link</li>
        </ul>

        <h3>collaborations</h3>
        <ul>
          <li>open for collabs</li>
        </ul>
      `
    },
    release: {
      title: "latest release",
      html: `
        <p><a class="sfx" href="https://soundcloud.com" target="_blank" rel="noreferrer">open on soundcloud</a></p>
        <p style="color:rgba(245,245,245,.62)">put your embed / description here.</p>
      `
    }
  };

  const page = pages[key];
  if (!page) return;

  overlayTitle.textContent = page.title;
  overlayBody.innerHTML = page.html;

  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function close(){
  overlay.hidden = true;
  document.body.style.overflow = "";
}

loading.addEventListener("click", () => {
  if (entered) return;
  entered = true;

  loading.style.opacity = "0";
  loading.style.pointerEvents = "none";

  main.hidden = false;

  // start ambient only after user gesture (browser policy)
  if (!muted) ambient.play().catch(()=>{});
  playClick();

  setTimeout(() => loading.remove(), 450);
});

document.addEventListener("click", (e) => {
  const a = e.target.closest("a.sfx, button.chip");
  if (a) playClick();

  const open = e.target.closest("[data-open]");
  if (open){
    e.preventDefault();
    openOverlay(open.dataset.open);
  }
});

muteBtn.addEventListener("click", () => setMuted(!muted));

closeOverlay.addEventListener("click", close);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) close();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.hidden) close();
});
