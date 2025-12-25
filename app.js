const enterBtn = document.getElementById("enterBtn");
const muteBtn = document.getElementById("muteBtn");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");
const closeOverlay = document.getElementById("closeOverlay");

let muted = false;
let entered = false;

// Безопасно создаём аудио (если файлов нет — просто не играет)
let clickSfx = null;
let ambient = null;

try{
  clickSfx = new Audio("assets/click.mp3");
  clickSfx.volume = 0.5;
}catch(e){}

try{
  ambient = new Audio("assets/ambient.mp3");
  ambient.loop = true;
  ambient.volume = 0.35;
}catch(e){}

function playClick(){
  if (muted || !clickSfx) return;
  try{
    clickSfx.currentTime = 0;
    clickSfx.play();
  }catch(e){}
}

function setMuted(val){
  muted = val;
  muteBtn.setAttribute("aria-pressed", String(muted));
  muteBtn.textContent = muted ? "unmute" : "mute";
  if (!ambient) return;
  if (muted) ambient.pause();
  else if (entered) ambient.play().catch(()=>{});
}

function enter(){
  if (entered) return;
  entered = true;
  playClick();
  if (!muted && ambient) ambient.play().catch(()=>{});
  enterBtn.textContent = "entered";
  enterBtn.disabled = true;
}

function openOverlay(){
  overlayTitle.textContent = "latest release — Айлис";
  overlayBody.innerHTML = `
    <p>
      <a class="sfx" href="https://soundcloud.com/aylis" target="_blank" rel="noreferrer">
        open on soundcloud
      </a>
    </p>
    <p style="opacity:.7">latest sounds & experiments by Айлис</p>
  `;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function close(){
  overlay.hidden = true;
  document.body.style.overflow = "";
}

// events
enterBtn.addEventListener("click", enter);
muteBtn.addEventListener("click", () => setMuted(!muted));

document.addEventListener("click", (e) => {
  if (e.target.closest("a.sfx") || e.target.closest("button.chip")) playClick();

  const open = e.target.closest("[data-open]");
  if (open){
    e.preventDefault();
    openOverlay();
  }
});

closeOverlay.addEventListener("click", close);
overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) close(); });

// стартовое состояние
setMuted(false);
