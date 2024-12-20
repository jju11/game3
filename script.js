// 난이도에 따른 게임 설정
const difficultySettings = {
    1: 5, // 난이도 1: 세로 5줄
    2: 8, // 난이도 2: 세로 8줄
    3: 11, // 난이도 3: 세로 11줄
    4: 15, // 초고난도: 세로 15줄
  };
  
  let selectedDifficulty = 1; // 초기 난이도 설정
  let totalRows = difficultySettings[selectedDifficulty];
  let correctAnswers = []; // 각 줄의 정답 (박스 인덱스)
  let usedRows = new Set(); // 이미 선택된 가로줄
  
  // HTML 요소 참조
  const difficultyContainer = document.getElementById("difficultyContainer");
  const gameContainer = document.getElementById("gameContainer");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restartButton");
  
  // 난이도 선택 핸들러
  difficultyContainer.addEventListener("click", (event) => {
    const button = event.target;
    if (button.classList.contains("difficulty-button")) {
      selectedDifficulty = parseInt(button.dataset.difficulty, 10);
      totalRows = difficultySettings[selectedDifficulty];
      startGame();
    }
  });
  
  // 게임 시작
  function startGame() {
    difficultyContainer.style.display = "none";
    gameContainer.style.display = "flex";
    initializeGame();
  }
  
  // 게임 초기화 함수
  function initializeGame() {
    correctAnswers = Array.from({ length: totalRows }, () => Math.floor(Math.random() * 2));
    usedRows.clear();
    messageElement.textContent = "게임을 시작하세요!";
    messageElement.style.color = "#333";
    restartButton.style.display = "none";
  
    // 박스 그리기
    gameContainer.innerHTML = "";
    for (let i = 0; i < totalRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
  
      for (let j = 0; j < 2; j++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.row = i;
        box.dataset.index = j;
  
        // 박스 클릭 이벤트
        box.addEventListener("click", handleBoxClick);
  
        row.appendChild(box);
      }
  
      gameContainer.appendChild(row);
    }
  }
  
  // 박스 클릭 핸들러
  function handleBoxClick(event) {
    const box = event.target;
    const rowIndex = parseInt(box.dataset.row);
    const boxIndex = parseInt(box.dataset.index);
  
    // 같은 가로줄에서 이미 선택된 경우 클릭 불가
    if (usedRows.has(rowIndex)) return;
  
    // 정답 확인
    if (correctAnswers[rowIndex] === boxIndex) {
      box.classList.add("correct");
      usedRows.add(rowIndex); // 현재 줄 기록
  
      // 게임 완료 조건 확인
      if (usedRows.size === totalRows) {
        messageElement.textContent = "이 게임에서 이기셨네요! 축하합니다! 🎉";
        messageElement.style.color = "green";
        disableAllBoxes();
        restartButton.style.display = "block";
      }
    } else {
      box.classList.add("wrong");
      box.textContent = "💣"; // 폭탄 표시
      messageElement.textContent = "실패입니다! 안타까워요!.. 😢";
      messageElement.style.color = "red";
      revealAnswers(); // 정답 공개
      disableAllBoxes(); // 박스 비활성화
      restartButton.style.display = "block";
    }
  }
  
  // 정답 공개
  function revealAnswers() {
    const rows = document.querySelectorAll(".row");
    rows.forEach((row, rowIndex) => {
      const boxes = row.querySelectorAll(".box");
      boxes[correctAnswers[rowIndex]].classList.add("correct");
    });
  }
  
  // 모든 박스 비활성화
  function disableAllBoxes() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.style.pointerEvents = "none";
    });
  }
  
  // 다시하기 버튼 클릭 이벤트
  restartButton.addEventListener("click", () => {
    difficultyContainer.style.display = "flex";
    gameContainer.style.display = "none";
    messageElement.textContent = "";
    restartButton.style.display = "none";
  });
  
  // 초기 상태는 난이도 선택 화면
  gameContainer.style.display = "none";
  
