let score = JSON.parse(localStorage.getItem("score")) || {
    Wins: 0,
    Lose: 0,
    Ties: 0,
  };

  updateScoreElement();

  //console.log(JSON.parse(localStorage.getItem('score')));
  //console.log(score);
  // if (score == null) {
  //   score = {
  //     Wins: 0,
  //     Lose: 0,
  //     Ties: 0,
  //   };
  // }

  function updateScoreElement(){
    document.querySelector(
    ".jss-core"
    ).innerHTML = `Wins: ${score.Wins},Loses: ${score.Lose}, Ties: ${score.Ties}`;

  }

  let isAutoPlaying = false;
  let intervalId;

  function autoplay(){
    if(!isAutoPlaying){
      intervalId=setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
  
  
      },2000);
      isAutoPlaying=true;

    }else{
      clearInterval(intervalId);
      isAutoPlaying=false;
    }
  }

  document.querySelector(".js-rock-button").addEventListener("click",()=>{
    playGame('rock');
  })
  document.querySelector('.js-paper-button').addEventListener("click",()=>{
    playGame('paper');
  })
  document.querySelector('.js-scissors-button').addEventListener("click",()=>{
    playGame('scissors');
  })

  document.body.addEventListener("keydown",(e)=>{
    if(e.key  === 'r'){
      playGame('rock');
    }else if(e.key === "p"){
      playGame('paper');
    } else if (e.key === "s") {
      playGame('scissors');
    }



  })



  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";

    if (playerMove == "scissors") {
      if (computerMove == "rock") {
        result = "YouLose";
      } else if (computerMove == "paper") {
        result = "YouWin";
      } else if (computerMove == "scissors") {
        result = "Tie";
      }
    } else if (playerMove == "paper") {
      if (computerMove == "rock") {
        result = "YouWin";
      } else if (computerMove == "paper") {
        result = "Tie";
      } else if (computerMove == "scissors") {
        result = "YouLose";
      }
    } else if (playerMove == "rock") {
      if (computerMove == "rock") {
        result = "Tie";
      } else if (computerMove == "scissors") {
        result = "YouLose";
      } else if (computerMove == "paper") {
        result = "YouWin";
      }
    }

    if (result === "YouWin") {
      score.Wins++;
    } else if (result === "YouLose") {
      score.Lose++;
    } else if (result === "Tie") {
      score.Ties++;
    }
    localStorage.setItem("score", JSON.stringify(score));

    document.querySelector(
      ".jss-core"
    ).innerHTML = `Wins: ${score.Wins},Loses: ${score.Lose}, Ties: ${score.Ties}`;

    document.querySelector(".js-moves").innerHTML = ` ${result}`;

    document.querySelector(".js-result").innerHTML = `You picked ${playerMove}. Computer picket ${computerMove}.`;

    // alert(
    //   `You picked ${playerMove}. Computer picket ${computerMove}.${result}. 
    //   Wins: ${score.Wins},Loses: ${score.Lose}, Ties: ${score.Ties}`
    // );
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = "paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = "scissors";
    }
    return computerMove;
  }