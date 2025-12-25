const loading = document.getElementById("loading");
const main = document.getElementById("main");
const muteBtn = document.getElementById("muteBtn");

const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");
const closeOverlay = document.getElementById("closeOverlay");

const clickSfx = new Audio("assets/click.mp3");
const ambient = new Audio("assets/ambient.mp3");
ambient.loop = true;

let muted = false;
let entered = false;

function playClick(){
  if(!muted){
    clickSfx.currentTime = 0;
    clickSfx.play().catch(()=>{});
  }
}

loading.addEventListener("click",()=>{
  entered = true;
  loading.remove();
  main.hidden = false;
  if(!muted) ambient.play().catch(()=>{});
});

muteBtn.addEventListener("click",()=>{
  muted = !muted;
  muteBtn.textContent = muted ? "unmute" : "mute";
  muted ? ambient.pause() : ambient.play().catch(()=>{});
});

document.addEventListener("click",(e)=>{
  if(e.target.closest(".sfx") || e.target.closest(".chip")) playClick();

  const open = e.target.closest("[data-open]");
  if(open){
    e.preventDefault();
    overlay.hidden = false;
    overlayTitle.textContent = "latest release — Айлис";
    overlayBody.innerHTML = `
      <p>
        <a class="sfx" href="https://soundcloud.com/aylis" target="_blank">
          open on soundcloud
        </a>
      </p>
      <p style="color:#aaa">latest sounds & experiments by Айлис</p>
    `;
  }
});

closeOverlay.addEventListener("click",()=>{
  overlay.hidden = true;
});
