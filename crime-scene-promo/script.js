const characters = [
  {
    role: "탐정",
    name: "한지윤",
    desc:
      "이번 여행을 추진한 일본어 모임 리더. 사건을 정리해야 하지만, 레나의 가방에서 몰래 꺼낸 봉투가 마음에 걸린다.",
    alibi: "8시 50분부터 손님방에서 참가자 명단을 정리했다.",
    secret: "여행 경비 문제를 레나에게 들켰고, 사건 직전 레나의 봉투를 꺼냈다.",
  },
  {
    role: "용의자",
    name: "최도윤",
    desc:
      "감성적인 일본 시골 사진으로 인기를 얻은 여행 사진가. 렌즈 뒤에 숨어 있지만, 카메라에는 너무 많은 것이 찍혀 있다.",
    alibi: "8시 45분부터 9시 10분까지 서재에서 배터리를 충전했다.",
    secret: "레나의 사진 구도를 베꼈고, 말다툼 영상 일부를 삭제했다.",
  },
  {
    role: "용의자",
    name: "박서아",
    desc:
      "약초와 민간요법에 밝은 약학과 휴학생. 조용한 태도와 달리, 독초 이름을 너무 정확히 알고 있다.",
    alibi: "8시 55분부터 9시 10분까지 손님방에서 두통약을 찾았다.",
    secret: "주방 약초 보관함을 뒤졌고, 레나에게 밀린 원고료를 요구했다.",
  },
  {
    role: "용의자",
    name: "민준호",
    desc:
      "여행객처럼 보이지만 료칸 구조와 토지 정보를 계속 살피는 회사원. 그의 휴대폰에는 계약서 사진이 남아 있다.",
    alibi: "8시 50분부터 9시 10분까지 현관 홀에서 택시 연락을 확인했다.",
    secret: "아오츠키장 매입 조사를 위해 왔고, 레나와 소개료 문제로 다퉜다.",
  },
  {
    role: "용의자",
    name: "쿠라모토 유키",
    desc:
      "아오츠키장의 젊은 후계자. 친절한 미소 뒤에는 료칸을 지켜야 한다는 압박과 오래된 사고의 그림자가 있다.",
    alibi: "8시 50분부터 9시 10분까지 주방과 현관 홀을 오가며 등불을 정리했다.",
    secret: "3년 전 무허가 야간 투어 사고를 레나가 폭로하려 했다.",
  },
];

const hero = document.querySelector(".hero");
const startButton = document.querySelector("#startButton");
const soundToggle = document.querySelector("#soundToggle");
const youtubePlayer = document.querySelector("#youtubePlayer");
const narrationLines = [...document.querySelectorAll(".narration-line")];
const narrationProgress = document.querySelector("#narrationProgress");
const tabs = [...document.querySelectorAll(".character-tab")];
const characterRole = document.querySelector("#characterRole");
const characterName = document.querySelector("#characterName");
const characterDesc = document.querySelector("#characterDesc");
const characterAlibi = document.querySelector("#characterAlibi");
const characterSecret = document.querySelector("#characterSecret");

let soundEnabled = false;
let narrationTimer;

function setSoundState(enabled) {
  soundEnabled = enabled;
  soundToggle.classList.toggle("is-muted", !enabled);
  soundToggle.setAttribute("aria-label", enabled ? "배경음 끄기" : "배경음 켜기");
  youtubePlayer.classList.toggle("is-visible", enabled);
  youtubePlayer.setAttribute("aria-hidden", enabled ? "false" : "true");

  if (enabled) {
    youtubePlayer.innerHTML = `
      <iframe
        title="background music"
        width="180"
        height="101"
        src="https://www.youtube.com/embed/oQvgVXNmGJQ?autoplay=1&loop=1&playlist=oQvgVXNmGJQ&controls=1&modestbranding=1&playsinline=1"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;
  } else {
    youtubePlayer.innerHTML = "";
  }
}

function playNarration() {
  clearInterval(narrationTimer);
  hero.classList.add("is-playing");
  let index = 0;

  narrationLines.forEach((line, lineIndex) => {
    line.classList.toggle("active", lineIndex === 0);
  });
  narrationProgress.style.width = `${100 / narrationLines.length}%`;

  narrationTimer = window.setInterval(() => {
    index += 1;
    if (index >= narrationLines.length) {
      clearInterval(narrationTimer);
      window.setTimeout(() => {
        document.querySelector("#case").scrollIntoView({ behavior: "smooth", block: "start" });
      }, 900);
      return;
    }

    narrationLines.forEach((line, lineIndex) => {
      line.classList.toggle("active", lineIndex === index);
    });
    narrationProgress.style.width = `${((index + 1) / narrationLines.length) * 100}%`;
  }, 1800);
}

function renderCharacter(index) {
  const character = characters[index];
  characterRole.textContent = character.role;
  characterName.textContent = character.name;
  characterDesc.textContent = character.desc;
  characterAlibi.textContent = character.alibi;
  characterSecret.textContent = character.secret;

  tabs.forEach((tab, tabIndex) => {
    tab.classList.toggle("active", tabIndex === index);
    tab.setAttribute("aria-selected", tabIndex === index ? "true" : "false");
  });
}

startButton.addEventListener("click", () => {
  if (!soundEnabled) {
    setSoundState(true);
  }
  playNarration();
});

soundToggle.addEventListener("click", () => {
  setSoundState(!soundEnabled);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    renderCharacter(Number(tab.dataset.character));
  });
});

setSoundState(false);
renderCharacter(0);
