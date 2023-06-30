let isOver = false;
let timeStopped = false;
const charset = "QWERTYUIOPASDFGHJKLZXCVBNM";
const root = document.querySelector("main > .wrapper-words");
let target = null;
let row = 0;
let column = 0;
const maxRow = 6;
const maxColumn = 5;
const answer = "FIGHT";

// 타겟 설정
setTarget(0, 0);

// 키보드 입력 이벤트 등록
document.addEventListener("keydown", handleKeyboardInput);
console.log("keyboard activated!");

// 마우스 입력 이벤트 등록
document.querySelectorAll("footer .column").forEach((el) => {
  el.addEventListener("click", handleMouseInput);
});
console.log("mouse activated!");

// 타이머 시작
const startTime = new Date().getTime();
const timerIntervalID = setInterval(timerHandler, 1000);

/*
===================================================================
함수 선언 부
===================================================================
*/

// 키보드 입력 처리 함수
function handleKeyboardInput(event) {
  if (isOver) return;
  handleTextInput(event.key.toUpperCase());
}
// 마우스 입력 처리 함수
function handleMouseInput(event) {
  if (isOver) return;
  handleTextInput(event.target.dataset.key.toUpperCase());
}
// 타이머 갱신 함수
function timerHandler() {
  if (startTime === null) return;
  if (timeStopped) return;

  const currentTime = new Date().getTime();
  const timeDif = new Date(currentTime - startTime);
  const minutes = timeDif.getMinutes().toString().padStart(2, "0");
  const seconds = timeDif.getSeconds().toString().padStart(2, "0");

  const timer = document.querySelector("main > .timer");
  timer.textContent = `${minutes}:${seconds}`;
}
// 텍스트 입력 처리 함수
function handleTextInput(word) {
  if (word === "ENTER") {
    if (isLastColumn()) {
      const beWin = checkResult();
      if (beWin) {
        gameOver(true);
      } else if (isLastRow()) {
        gameOver(false);
      } else {
        moveNextRow();
      }
    }
  } else if (word === "BACKSPACE") {
    deleteWord();
  } else if (charset.includes(word)) {
    insertWord(word);
  }
}
// 타겟에 알파벳을 입력하는 함수
function insertWord(word) {
  if (targetIsFilled()) moveNextColumn();
  if (targetIsFilled()) return;

  target.textContent = word;
  target.classList.add("filled");
}
// 타겟을 다음 열로 옮기는 함수
function moveNextColumn() {
  if (isLastColumn()) return;
  column += 1;
  setTarget(row, column);
}
// 타겟을 다음 행 첫 열로 옮기는 함수
function moveNextRow() {
  if (isLastRow()) return;
  row += 1;
  column = 0;
  setTarget(row, column);
}
// 마지막 열이면 true 반환
function isLastColumn() {
  return column === maxColumn - 1;
}
// 마지막 행이면 true 반환
function isLastRow() {
  return row === maxRow - 1;
}
// 타겟의 알파벳을 지우는 함수
function deleteWord() {
  if (!targetIsFilled()) moveBeforeColumn();
  if (!targetIsFilled()) return;

  target.textContent = null;
  target.classList.remove("filled");
}
// 타겟을 이전 열로 옮기는 함수
function moveBeforeColumn() {
  if (isFirstColumn()) return;
  column -= 1;
  setTarget(row, column);
}
// 주어진 행과 열로 타겟을 설정하는 함수
function setTarget(row, column) {
  target = root.children[row].children[column];
}
// 첫번째 열이면 true 반환
function isFirstColumn() {
  return column === 0;
}
// 타겟에 이미 텍스트가 입력되어 있으면 true 반환
function targetIsFilled() {
  return target.classList.contains("filled");
}
// 게임 결과를 확인하여 단어를 맞히면 true 반환
function checkResult() {
  let count = 0;
  for (let i = 0; i < 5; i++) {
    mainEl = root.children[row].children[i];
    word = mainEl.innerText;
    footerEl = document.querySelector(`footer .column[data-key=${word}]`);
    if (word === answer[i]) {
      mainEl.classList.add("green");
      footerEl.classList.add("green");
      count += 1;
    } else if (answer.includes(word)) {
      mainEl.classList.add("yellow");
      footerEl.classList.add("yellow");
    } else {
      mainEl.classList.add("gray");
      footerEl.classList.add("gray");
    }
  }

  if (count === 5) return true;
}
// 게임이 끝나면 호출되는 함수
function gameOver(beWin) {
  timeStopped = true;
  isOver = true;
  clearInterval(timerIntervalID);

  if (beWin) {
    console.log("정답입니다!");
  } else {
    console.log("다음 기회엔 더 잘해봐요~");
  }
}
