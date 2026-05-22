# ScoreCounter 記分板

A functional scoreboard PWA for mobile devices. Customize teams, track scores, and record up to 5 sets — all without installing an app.

<img src="https://github.com/chuanmin13/scoreCounter/blob/main/img/scoreCounter.JPG?raw=true" width="500px"/> <img src="https://github.com/chuanmin13/scoreCounter/blob/main/img/scoreCounter-2.JPG?raw=true" width="500px"/>

---

## Features

- **PWA** — installable to home screen on iOS / Android
- **Customize teams** — set names and colors per game
- **Score tracking** — tap to add, minus button to deduct
- **Set records** — save up to 5 sets of scores
- **Session persistence** — accidental refresh won't lose your score
- **Responsive** — portrait and landscape support

---

## 功能

- 可安裝至桌面，作為 App 使用（PWA）
- 自訂隊伍名稱及顏色
- 點擊加分、減分按鈕扣分
- 最多保存五局比數紀錄
- 重整網頁不會導致目前比數消失
- 支援直向 / 橫向版面

---

## Tech

- Vanilla JS, HTML, CSS — no framework, no build step
- `sessionStorage` for score persistence
- Service Worker ready (`sw.js`)

<img src="https://github.com/chuanmin13/scoreCounter/blob/main/img/scoreCounter-3.JPG?raw=true" width="300px"/> <img src="https://github.com/chuanmin13/scoreCounter/blob/main/img/scoreCounter-4.JPG?raw=true" width="300px"/>
