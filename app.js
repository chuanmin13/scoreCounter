// safari手機網頁 prevent double tap scale
window.onload = () => {
    document.addEventListener(
        "touchstart",
        (event) => {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        },
        { passive: false }
    );

    let lastTouchEnd = 0;
    document.addEventListener(
        "touchend",
        (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        },
        false
    );
};

// 分數計算
const redTeam = document.querySelector("#redTeam");
const blueTeam = document.querySelector("#blueTeam");
const redScore = document.querySelector(".red-score");
const blueScore = document.querySelector(".blue-score");
const redMinus = document.querySelector("#redMinus");
const blueMinus = document.querySelector("#blueMinus");

const state = {
    red: 0,
    blue: 0,
    records: JSON.parse(sessionStorage.getItem("records") || "[]"),
};

const setScoreSession = () => {
    sessionStorage.setItem("nowScore", JSON.stringify({ red: state.red, blue: state.blue }));
};

const addScore = (event) => {
    const team = event.currentTarget.id;
    if (team === "redTeam") {
        state.red++;
        redScore.innerText = state.red;
        setScoreSession();
    }
    if (team === "blueTeam") {
        state.blue++;
        blueScore.innerText = state.blue;
        setScoreSession();
    }
};

const subScore = (event) => {
    const team = event.currentTarget.id;
    if (team === "redMinus" && state.red > 0) {
        state.red--;
        redScore.innerText = state.red;
        setScoreSession();
    }
    if (team === "blueMinus" && state.blue > 0) {
        state.blue--;
        blueScore.innerText = state.blue;
        setScoreSession();
    }
};

redTeam.addEventListener("click", addScore);
blueTeam.addEventListener("click", addScore);
redMinus.addEventListener("click", subScore);
blueMinus.addEventListener("click", subScore);

// 如果session有資料, 設定比數
const checkSession = () => {
    const saved = sessionStorage.getItem("nowScore");
    if (saved) {
        const d = JSON.parse(saved);
        state.red = d.red;
        state.blue = d.blue;
        redScore.innerText = state.red;
        blueScore.innerText = state.blue;
    }
};
checkSession();

// 設定隊名及顏色
const redName = document.querySelector("#redName");
const blueName = document.querySelector("#blueName");
const aName = document.querySelector("#aName");
const bName = document.querySelector("#bName");
const redClr = document.querySelector("#redClr");
const blueClr = document.querySelector("#blueClr");
const aClr = document.querySelector("#redTeam");
const bClr = document.querySelector("#blueTeam");

const resetName = () => {
    aName.innerText = "";
    bName.innerText = "";
    redName.value = "";
    blueName.value = "";
    aClr.style.backgroundColor = "#cd2424";
    bClr.style.backgroundColor = "#244ecd";
};

const setName = () => {
    aName.innerText = redName.value;
    bName.innerText = blueName.value;
    aClr.style.backgroundColor = redClr.value;
    bClr.style.backgroundColor = blueClr.value;
    navToggle();
};

// 重置比數
const resetScore = () => {
    if (confirm("確定重設比數？")) {
        state.red = state.blue = 0;
        redScore.innerText = blueScore.innerText = 0;
        sessionStorage.removeItem("nowScore");
    }
};

// 重置顏色
const resetColor = () => {
    aClr.style.backgroundColor = redClr.value = "#cd2424";
    bClr.style.backgroundColor = blueClr.value = "#244ecd";
};

// 開合選單 nav-bar & hamburger animation
const hamburger = document.querySelector(".hamburger");
const navWrap = document.querySelector(".nav-wrap");
const outsideReset = document.querySelector(".outside-reset");
const recordsetBtn = document.querySelector(".record-set");

const navToggle = () => {
    navWrap.classList.toggle("open");
    hamburger.classList.toggle("toggle");
    outsideReset.classList.toggle("hide");
    recordsetBtn.classList.toggle("hide");
};
hamburger.addEventListener("click", navToggle);

// 紀錄比數
const MAX_SETS = 5;
const recordWrap = document.querySelector("#recordWrap");

const buildRecordCards = () => {
    recordWrap.innerHTML = "";
    for (let i = 0; i < MAX_SETS; i++) {
        const card = document.createElement("div");
        card.className = "record-card";
        card.innerHTML = `
            <button class="delRecord btn" onclick="delRecords(${i})">X</button>
            <p>set ${i + 1}</p>
            <p>xx:xx</p>`;
        recordWrap.appendChild(card);
    }
};
buildRecordCards();

const rCard = () => recordWrap.querySelectorAll(".record-card");

const recordset = () => {
    if (state.records.length === MAX_SETS) {
        alert("紀錄已滿，請刪除後再新增");
        return;
    }
    const d = JSON.parse(sessionStorage.getItem("nowScore"));
    rCard()[state.records.length].children[2].innerText = `${d.red} : ${d.blue}`;
    state.records.push(d);
    sessionStorage.setItem("records", JSON.stringify(state.records));
};

// 刪除紀錄
const delRecords = (i) => {
    state.records = state.records.filter((_, ind) => i !== ind);
    sessionStorage.setItem("records", JSON.stringify(state.records));
    buildRecordCards();
    renderRecords();
};

// 如果session 有 records, 將紀錄render出來
const renderRecords = () => {
    state.records.forEach((s, i) => {
        rCard()[i].children[2].innerText = `${s.red} : ${s.blue}`;
    });
};
renderRecords();
