window.onload= function() {
  /*
   * Audio
   */
  var audio00 = new Audio('sounds/sound-01.mp3'),
      audio01 = new Audio('sounds/sound-02.mp3'),
      audio02 = new Audio('sounds/sound-03.mp3');
      audio03 = new Audio('sounds/sound-04.mp3');
      audio04 = new Audio('sounds/sound-05.mp3');
      audio05 = new Audio('sounds/sound-06.mp3');
      audio06 = new Audio('sounds/sound-07.mp3');
      audio07 = new Audio('sounds/sound-08.mp3');

  
  /*
   * Variables
   */
  var name = localStorage.getItem('nameTrack'),
      age = localStorage.getItem('ageTrack'),
      hunger = localStorage.getItem('hungerTrack'),
      water = localStorage.getItem('waterTrack'),
      exercise = localStorage.getItem('exerciseTrack'),
      bladder = localStorage.getItem('bladderTrack'),
      hygiene = localStorage.getItem('hygieneTrack'),
      fun = localStorage.getItem('funTrack'),
      energy = localStorage.getItem('energyTrack'),
      music = localStorage.getItem('musicTrack'),
      bestScoreNum = localStorage.getItem('bestScoreTrack'),
      currentScoreNum = localStorage.getItem('currentScoreTrack'),
      dead = localStorage.getItem('deadTrack');

  var bubble = document.querySelector('.speech-bubble'),
      avatar = document.querySelector('.avatar'),
      musicBtn = document.querySelector('.music-btn'),
      bgMusic = document.querySelector('.bg-music'),
      pauseBtn = document.querySelector('.pause-btn'),
      restartBtn = document.querySelector('.restart-btn'),
      saveBtn = document.querySelector('.save-btn');

  var hungerBtn = document.querySelector('.hunger-btn'),
      waterBtn = document.querySelector('.water-btn'),
      exerciseBtn = document.querySelector('.exercise-btn'),
      bladderBtn = document.querySelector('.bladder-btn'),
      hygieneBtn = document.querySelector('.hygiene-btn'),
      funBtn = document.querySelector('.fun-btn'),
      energyBtn = document.querySelector('.energy-btn');

  var specialBtn = document.querySelector('.special-btn'),
      modalMenu = document.querySelector('.modal-menu'),
      modalSettings = document.querySelector('.modal-settings'),
      closeBtn = document.querySelector('.close-btn'),
      bonus = document.querySelector('.bonus'),
      bestScore = document.querySelector('.best-score-number'),
      currentScore = document.querySelector('.score-number'),
      menuBtn = document.querySelector('.menu-btn'),
      nameInput = document.querySelector('#name');

  var hungerText01 = 0,
      hungerText02 = 0,
      hungerText03 = 0,
      hungerText04 = 0,
      hungerText05 = 0,
      briliantText = 0,
      excellentText = 0,
      verygoodText = 0,
      scoreHelp = 0,
      growText01 = 0,
      growText02 = 0,
      growText03 = 0,
      growText04 = 0,
      growText05 = 0,
      rndText01 = 0,
      rndText02 = 0,
      rndText03 = 0,
      scoreNum = 0,
      extraPointsText = 0,
      specialClick = 0,
      babySound01 = 0,
      babySound02 = 0,
      scoreTimerPause = 0;

  var ageTimer,
      hungerTimer,
      waterTimer,
      exerciseTimer,
      bladderTimer,
      hygieneTimer,
      funTimer,
      energyTimer,
      specialTimer,
      scoreTimer

  var ageTimerInt = 10000,
      hungerTimerInt = 14000,
      waterTimerInt = 14000,
      exerciseTimerInt = 14000,
      bladderTimerInt = 14000,
      hygieneTimerInt = 14000,
      funTimerInt = 14000,
      energyTimerInt = 14000,
      specialTimerInt = 15000,
      scoreTimerInt = 1000;


  /*
   * Default start
   */


  checkDead();
  checkName();
  // Check music
  checkMusic();

  // If previously dead show menu
  if ((name == 0 && dead == 0) || (name != 0 && dead == 1)) {
    // Show avatar name modal
    modalSettings.style.display = 'block';
    saveBtn.onclick = save;
  } else {
    start();
  }

  
  /*
   * Functions
   */


  // Save btn
  function save() {
    audio01.play();
    if (nameInput.value == '' || nameInput.value == null) {
      alert('Please insert name.');
    } else {
      name = nameInput.value;
      localStorage.setItem('nameTrack', name);
      modalSettings.style.display = 'none';
      restart();
    }
  }

  // Start game
  function start() {
    gameLogic();
    checkAge();
    checkHunger();
    checkWater();
    checkExercise();
    checkBladder();
    checkHygiene();
    checkFun();
    checkEnergy();

    if (age <= 3) {
      hungerBtn.disabled = true;
      waterBtn.disabled = true;
      exerciseBtn.disabled = true;
      bladderBtn.disabled = true;
      hygieneBtn.disabled = true;
      funBtn.disabled = true;
      energyBtn.disabled = true;
    }

    // On click
    hungerBtn.onclick = hungerLogic;
    waterBtn.onclick = waterLogic;
    exerciseBtn.onclick = exerciseLogic;
    bladderBtn.onclick = bladderLogic;
    hygieneBtn.onclick = hygieneLogic;
    funBtn.onclick = funLogic;
    energyBtn.onclick = energyLogic;

    specialBtn.onclick = specialLogic;
    
    restartBtn.onclick = restart;
    pauseBtn.onclick = pause;
    musicBtn.onclick = musicPlay;

    // Best score
    if (bestScoreNum == undefined || bestScoreNum == null) {
      localStorage.setItem('bestScoreTrack', 0);
      bestScoreNum = localStorage.getItem('bestScoreTrack');
      bestScore.innerHTML = '0';
    } else {
      bestScoreNum = localStorage.getItem('bestScoreTrack');
      bestScore.innerHTML = bestScoreNum;
    }

    // Current score
    if (currentScoreNum == undefined || currentScoreNum == null) {
      localStorage.setItem('currentScoreTrack', 0);
      currentScoreNum = localStorage.getItem('currentScoreTrack');
      currentScore.innerHTML = '0';
    } else {
      currentScoreNum = localStorage.getItem('currentScoreTrack');
      currentScore.innerHTML = currentScoreNum;
      scoreNum = Number(currentScoreNum);
    }

    ageTimer = setInterval(ageRise, ageTimerInt);
    hungerTimer = setInterval(hungerDecay, hungerTimerInt);
    waterTimer = setInterval(waterDecay, waterTimerInt);
    exerciseTimer = setInterval(exerciseDecay, exerciseTimerInt);
    bladderTimer = setInterval(bladderDecay, bladderTimerInt);
    hygieneTimer = setInterval(hygieneDecay, hygieneTimerInt);
    funTimer = setInterval(funDecay, funTimerInt);
    energyTimer = setInterval(energyDecay, energyTimerInt);

    specialTimer = setInterval(special, specialTimerInt);

    timerScoreReset(scoreTimerInt);
    //scoreTimer = setInterval(score, scoreTimerInt);
  }

  // Stop/Pause game
  function stop() {
    clearInterval(ageTimer);
    ageTimer = null;
    clearInterval(hungerTimer);
    hungerTimer = null;
    clearInterval(waterTimer);
    waterTimer = null;
    clearInterval(exerciseTimer);
    exerciseTimer = null;
    clearInterval(bladderTimer);
    bladderTimer = null;
    clearInterval(hygieneTimer);
    hygieneTimer = null;
    clearInterval(funTimer);
    funTimer = null;
    clearInterval(energyTimer);
    energyTimer = null;
    clearInterval(specialTimer);
    specialTimer = null;
    clearInterval(scoreTimer);
    scoreTimer = null;

    // Disable btns
    hungerBtn.disabled = true;
    waterBtn.disabled = true;
    exerciseBtn.disabled = true;
    bladderBtn.disabled = true;
    hygieneBtn.disabled = true;
    funBtn.disabled = true;
    energyBtn.disabled = true;
  }

  // Dialog
  var dialogOpen = false;
  function dialog(text, animation) {
    if (bubble.innerHTML != text) {
      if (dialogOpen === false) {
        dialogOpen = true;

        // Add dialog
        bubble.style.visibility = 'visible';
        bubble.innerHTML = text;
        bubble.classList.add(animation);

        // Remove dialog
        setTimeout(function() {
          bubble.style.visibility = 'hidden';
          bubble.classList.remove(animation);
          dialogOpen = false;
        }, 3000);
      } else {
        dialogOpen = true;
        // Wait then open dialog
        // Add dialog
        setTimeout(function() {
          bubble.style.visibility = 'visible';
          bubble.innerHTML = text;
          bubble.classList.add(animation);
        }, 4000);
        
        // Remove dialog
        setTimeout(function() {
          bubble.style.visibility = 'hidden';
          bubble.classList.remove(animation);
          dialogOpen = false;
        }, 10000);
      }
    }
  }

  // Score timer (reset)
  function timerScoreReset(timerInt) {
    clearInterval(scoreTimer);
    scoreTimer = null;
    scoreTimer = setInterval(score, timerInt);
  }

  // Hunger timer (reset)
  function timerHungerReset(timerInt) {
    clearInterval(hungerTimer);
    hungerTimer = null;
    hungerTimer = setInterval(hungerDecay, timerInt);
  }

  // Water timer (reset)
  function timerWaterReset(timerInt) {
    clearInterval(waterTimer);
    waterTimer = null;
    waterTimer = setInterval(waterDecay, timerInt);
  }

  // Exercise timer (reset)
  function timerExerciseReset(timerInt) {
    clearInterval(exerciseTimer);
    exerciseTimer = null;
    exerciseTimer = setInterval(exerciseDecay, timerInt);
  }

  // Bladder timer (reset)
  function timerBladderReset(timerInt) {
    clearInterval(bladderTimer);
    bladderTimer = null;
    bladderTimer = setInterval(bladderDecay, timerInt);
  }

  // Hygiene timer (reset)
  function timerHygieneReset(timerInt) {
    clearInterval(hygieneTimer);
    hygieneTimer = null;
    hygieneTimer = setInterval(hygieneDecay, timerInt);
  }

  // Fun timer (reset)
  function timerFunReset(timerInt) {
    clearInterval(funTimer);
    funTimer = null;
    funTimer = setInterval(funDecay, timerInt);
  }

  // Exercise timer (reset)
  function timerEnergyReset(timerInt) {
    clearInterval(energyTimer);
    energyTimer = null;
    energyTimer = setInterval(energyDecay, timerInt);
  }


  /*
   * Modal Menu
   */

  // When the user clicks on the button, open the modal
  menuBtn.onclick = function() {
    modalMenu.style.display = 'block';
  }

  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = function() {
    modalMenu.style.display = 'none';
  }

  // Close modal, when click anywhere outside
  window.onclick = function(event) {
    if (event.target == modal) {
      modalMenu.style.display = 'none';
    }
  }

  /*
   * Modal Avatar settings
   */

  // Close modal, when click anywhere outside
  window.onclick = function(event) {
    if (event.target == modalMenu) {
      modalMenu.style.display = 'none';
    }
  }

  // Score
  function score() {
    if (scoreTimerPause == 0) {
      scoreNum = Number(scoreNum) + 1;
      document.querySelector('.score-number').innerHTML = scoreNum;
    }

    // Write current score to localStorage
    currentScoreNum = Number(scoreNum);
    localStorage.setItem('currentScoreTrack', currentScoreNum);
  }

  // Dead
  function checkDead() {
    if (dead == undefined || dead == null) {
      localStorage.setItem('deadTrack', 0);
      dead = localStorage.getItem('deadTrack');
    } else {
      dead = localStorage.getItem('deadTrack');
    }
  }

  // Name
  function checkName() {
    if (name == undefined || name == null) {
      localStorage.setItem('nameTrack', 0);
      name = localStorage.getItem('nameTrack');
    } else {
      name = localStorage.getItem('nameTrack');
      if (name != 0) {
        nameInput.value = name;
      }
    }
  }

  // Age ❤️
  function checkAge() {
    if (age == undefined || age == null) {
      localStorage.setItem('ageTrack', 0);
      age = localStorage.getItem('ageTrack');
    } else {
      age = localStorage.getItem('ageTrack');
    }
  }

  // Hunger 🍏
  function checkHunger() {
    if (hunger == undefined || hunger == null) {
      localStorage.setItem('hungerTrack', 50);
      hunger = localStorage.getItem('hungerTrack');
    } else {
      hunger = localStorage.getItem('hungerTrack');
    }
  }

  function hungerLogic() {
    if (hungerText03 == 1 && hungerText04 == 0) {
      dialog('Thank you. 🥰', 'animate__pulse');
      hungerText04 = 1;
    }
    audio00.play();
    checkHunger();
    if (hunger <= 90) { hunger = Number(hunger) + 10; } else { hunger = 100; }
    if (water <= 98) { water = Number(water) + 2; } else { water = 100; }
    if (exercise >= 4) { exercise = Number(exercise) - 4; } else { exercise = 0; }
    if (bladder >= 1) { bladder = Number(bladder) - 1; } else { bladder = 0; }
    if (hygiene >= 2) { hygiene = Number(hygiene) - 2; } else { hygiene = 0; }
    if (fun <= 96) { fun = Number(fun) + 4; } else { fun = 100; }
    if (energy >= 5) { energy = Number(energy) - 5; } else { energy = 0; }
    gameLogic();
  }

  // Water 💧
  function checkWater() {
    if (water == undefined || water == null) {
      localStorage.setItem('waterTrack', 50);
      water = localStorage.getItem('waterTrack');
    } else {
      water = localStorage.getItem('waterTrack');
    }
  }

  function waterLogic() {
    audio00.play();
    checkWater();
    if (hunger <= 99) { hunger = Number(hunger) + 1; } else { hunger = 100; }
    if (water <= 90) { water = Number(water) + 10; } else { water = 100; }
    if (exercise >= 1) { exercise = Number(exercise) - 1; } else { exercise = 0; }
    if (bladder >= 4) { bladder = Number(bladder) - 4; } else { bladder = 0; }
    if (hygiene >= 1) { hygiene = Number(hygiene) - 1; } else { hygiene = 0; }
    if (fun <= 99) { fun = Number(fun) + 1; } else { fun = 100; }
    if (energy >= 5) { energy = Number(energy) - 5; } else { energy = 0; }
    gameLogic();
  }

  // Exercise ⚽️
  function checkExercise() {
    if (exercise == undefined || exercise == null) {
      localStorage.setItem('exerciseTrack', 50);
      exercise = localStorage.getItem('exerciseTrack');
    } else {
      exercise = localStorage.getItem('exerciseTrack');
    }
  }

  function exerciseLogic() {
    audio00.play();
    checkExercise();
    if (hunger >= 4) { hunger = Number(hunger) - 4; } else { hunger = 0; }
    if (water >= 4) { water = Number(water) - 4; } else { water = 0; }
    if (exercise <= 90) { exercise = Number(exercise) + 10; } else { exercise = 100; }
    if (bladder >= 2) { bladder = Number(bladder) - 2; } else { bladder = 0; }
    if (hygiene >= 4) { hygiene = Number(hygiene) - 4; } else { hygiene = 0; }
    if (fun <= 96) { fun = Number(fun) + 4; } else { fun = 100; }
    if (energy >= 5) { energy = Number(energy) - 5; } else { energy = 0; }
    gameLogic();
  }

  // Bladder 🚽
  function checkBladder() {
    if (bladder == undefined || bladder == null) {
      localStorage.setItem('bladderTrack', 50);
      bladder = localStorage.getItem('bladderTrack');
    } else {
      bladder = localStorage.getItem('bladderTrack');
    }
  }
  
  function bladderLogic() {
    audio00.play();
    bladder = Number(100);
    if (hygiene >= 4) { hygiene = Number(hygiene) - 4; } else { hygiene = 0; }
    if (energy >= 5) { energy = Number(energy) - 5; } else { energy = 0; }
    gameLogic();
  }

  // Hygiene 🛀
  function checkHygiene() {
    if (hygiene == undefined || hygiene == null) {
      localStorage.setItem('hygieneTrack', 50);
      hygiene = localStorage.getItem('hygieneTrack');
    } else {
      hygiene = localStorage.getItem('hygieneTrack');
    }
  }

  function hygieneLogic() {
    audio00.play();
    checkHygiene();
    if (hunger >= 2) { hunger = Number(hunger) - 2; } else { hunger = 0; }
    if (water >= 1) { water = Number(water) - 1; } else { water = 0; }
    if (bladder >= 1) { bladder = Number(bladder) - 1; } else { bladder = 0; }
    hygiene = Number(100);
    if (fun <= 98) { fun = Number(fun) + 2; } else { fun = 100; }
    if (energy >= 5) { energy = Number(energy) - 5; } else { energy = 0; }
    gameLogic();
  }

  // Fun 🎲
  function checkFun() {
    if (fun == undefined || fun == null) {
      localStorage.setItem('funTrack', 50);
      fun = localStorage.getItem('funTrack');
    } else {
      fun = localStorage.getItem('funTrack');
    }
  }

  function funLogic() {
    audio00.play();
    checkFun();
    if (hunger >= 2) { hunger = Number(hunger) - 2; } else { hunger = 0; }
    if (water >= 2) { water = Number(water) - 2; } else { water = 0; }
    if (exercise >= 4) { exercise = Number(exercise) - 4; } else { exercise = 0; }
    if (bladder >= 2) { bladder = Number(bladder) - 2; } else { bladder = 0; }
    if (hygiene >= 6) { hygiene = Number(hygiene) - 6; } else { hygiene = 0; }
    if (fun <= 90) { fun = Number(fun) + 10; } else { fun = 100; }
    if (energy >= 5) { energy = Number(energy) - 5; } else { energy = 0; }
    gameLogic();
  }

  // Energy 🛌
  function checkEnergy() {
    if (energy == undefined || energy == null) {
      localStorage.setItem('energyTrack', 50);
      energy = localStorage.getItem('energyTrack');
    } else {
      energy = localStorage.getItem('energyTrack');
    }
  }

  function energyLogic() {
    audio00.play();
    checkEnergy();
    if (age <= 99) { age = Number(age) + 1; } else { age = 100; }
    if (hunger >= 6) { hunger = Number(hunger) - 6; } else { hunger = 0; }
    if (water >= 6) { water = Number(water) - 6; } else { water = 0; }
    if (exercise >= 6) { exercise = Number(exercise) - 6; } else { exercise = 0; }
    if (bladder >= 6) { bladder = Number(bladder) - 6; } else { bladder = 0; }
    if (hygiene >= 6) { hygiene = Number(hygiene) - 6; } else { hygiene = 0; }
    if (fun >= 6) { fun = Number(fun) - 6; } else { fun = 0; }
    energy = Number(100);
    gameLogic();
  }

  // Die
  function die() {
    stop();
    avatar.innerHTML=('☠️');
    dialog(name + ', just die! 🏴‍☠️', 'animate__pulse');
    
    avatar.classList.add('animate__hinge');
    setTimeout(function() {
      avatar.classList.remove('animate__hinge');
    }, 2000);

    // Write best score to localStorage if bigger
    bestScoreNum = Number(scoreNum);
    if (localStorage.getItem('bestScoreTrack') <= bestScoreNum) {
      localStorage.setItem('bestScoreTrack', bestScoreNum);
      bestScore.innerHTML = bestScoreNum;
    }
    
    localStorage.setItem('deadTrack', 1);
    localStorage.removeItem('currentScoreTrack');

    // Reset inputs
    document.querySelector('.hunger-stat').innerHTML = '/';
    document.querySelector('.water-stat').innerHTML = '/';
    document.querySelector('.exercise-stat').innerHTML = '/';
    document.querySelector('.bladder-stat').innerHTML = '/';
    document.querySelector('.hygiene-stat').innerHTML = '/';
    document.querySelector('.fun-stat').innerHTML = '/';
    document.querySelector('.energy-stat').innerHTML = '/';

    setTimeout(function() {
      document.querySelector('.age-bar').style.width = '0%';
      document.querySelector('.hunger-bar').style.width = '0%';
      document.querySelector('.water-bar').style.width = '0%';
      document.querySelector('.exercise-bar').style.width = '0%';
      document.querySelector('.bladder-bar').style.width = '0%';
      document.querySelector('.hygiene-bar').style.width = '0%';
      document.querySelector('.fun-bar').style.width = '0%';
      document.querySelector('.energy-bar').style.width = '0%';
    }, 1000);
  }

  // Music
  function checkMusic() {
    if (music == undefined || music == null) {
      localStorage.setItem('musicTrack', 1);
      music = localStorage.getItem('musicTrack');
    } else {
      music = localStorage.getItem('musicTrack');
    }
    musicPlay();
  }

  /*
   * Special gifts 🎁
   */
  function special() {
    if (age > 15) {
      if (extraPointsText == 0) {
        dialog('Check your screen for 🎁', 'animate__pulse');
        setTimeout(function() { dialog('U can get some extra points!', 'animate__pulse'); }, 5000);
        extraPointsText = 1;
      }
      var height = document.querySelector('.container').clientHeight,
          width = document.querySelector('.container').clientWidth;
          topSpecial = Math.floor(Math.random() * height) + 1;
          leftSpecial = Math.floor(Math.random() * width) + 1;
      
      if (topSpecial >= 10 && topSpecial <= (height - 50) && leftSpecial >= 10 && leftSpecial <= (width - 50)) {
        specialBtn.style.top = topSpecial + 'px';
        specialBtn.style.left = leftSpecial + 'px';
        specialBtn.style.visibility = 'visible';
      }

      setTimeout(function() {
        specialBtn.style.visibility = 'hidden';
        specialClick = 0;
      }, 3000);
    }
  }

  function specialLogic() {
    if (specialClick == 0) {
      audio04.play();
      var months = ['hunger', 'water', 'exercise', 'bladder', 'hygiene', 'fun', 'energy',];
      var random = Math.floor(Math.random() * months.length);

      if (months[random] == 'hunger') {
        dialog('🍏 +25, Score +50', 'animate__pulse');
        if (hunger <= 75) { hunger = Number(hunger) + 25; } else { hunger = 100; }

        scoreNum = Number(scoreNum) + 50;
        document.querySelector('.score-number').innerHTML = scoreNum;
      }

      if (months[random] == 'water') {
        dialog('💧 +25, Score +50', 'animate__pulse');
        if (water <= 75) { water = Number(water) + 25; } else { water = 100; }

        scoreNum = Number(scoreNum) + 50;
        document.querySelector('.score-number').innerHTML = scoreNum;
      }

      if (months[random] == 'exercise') {
        dialog('⚽️ +25, Score +50', 'animate__pulse');
        if (exercise <= 75) { exercise = Number(exercise) + 25; } else { exercise = 100; }

        scoreNum = Number(scoreNum) + 50;
        document.querySelector('.score-number').innerHTML = scoreNum;
      }

      if (months[random] == 'bladder') {
        dialog('🚽 +25, Score +50', 'animate__pulse');
        if (bladder <= 75) { bladder = Number(bladder) + 25; } else { bladder = 100; }

        scoreNum = Number(scoreNum) + 50;
        document.querySelector('.score-number').innerHTML = scoreNum;
      }

      if (months[random] == 'hygiene') {
        dialog('🛀 +25, Score +50', 'animate__pulse');
        if (hygiene <= 75) { hygiene = Number(hygiene) + 25; } else { hygiene = 100; }

        scoreNum = Number(scoreNum) + 50;
        document.querySelector('.score-number').innerHTML = scoreNum;
      }
      
      if (months[random] == 'fun') {
        dialog('🎲 +25, Score +50', 'animate__pulse');
        if (fun <= 75) { fun = Number(fun) + 25; } else { fun = 100; }

        scoreNum = Number(scoreNum) + 50;
        document.querySelector('.score-number').innerHTML = scoreNum;
      }

      if (months[random] == 'energy') {
        dialog('🛌 +25, Score +50', 'animate__pulse');
        if (energy <= 75) { energy = Number(energy) + 25; } else { energy = 100; }

        scoreNum = Number(scoreNum) + 50;
        document.querySelector('.score-number').innerHTML = scoreNum;
      }

      gameLogic();
      specialClick == 1;
    }
  }


  /*
   * Droppage over time
   */
  function ageRise() {
    // age = Number(age) + 1;
    if (age <= 99) { age = Number(age) + 1; } else { age = 100; die(); }
    gameLogic();
  }

  function hungerDecay() {
    if (hunger >= 4) { hunger = Number(hunger) - 4; } else { hunger = 0; }
    gameLogic();
  }

  function waterDecay() {
    if (water >= 6) { water = Number(water) - 6; } else { water = 0; }
    gameLogic();
  }

  function exerciseDecay() {
    if (exercise >= 2) { exercise = Number(exercise) - 2; } else { exercise = 0; }
    gameLogic();
  }

  function bladderDecay() {
    if (bladder >= 6) { bladder = Number(bladder) - 6; } else { bladder = 0; }
    gameLogic();
  }

  function hygieneDecay() {
    if (hygiene >= 4) { hygiene = Number(hygiene) - 4; } else { hygiene = 0; }
    gameLogic();
  }

  function funDecay() {
    if (fun >= 4) { fun = Number(fun) - 4; } else { fun = 0; }
    gameLogic();
  }

  function energyDecay() {
    if (energy >= 1) { energy = Number(energy) - 1; } else { energy = 0; }
    gameLogic();
  }
  

  /*
   * Buttons
   */

  // Restart/reset btn
  function restart() {
    audio01.play();
    stop();

    age = Number(0);
    hunger = Number(50);
    water = Number(50);
    exercise = Number(50);
    bladder = Number(50);
    hygiene = Number(50);
    fun = Number(50);
    energy = Number(50);
    scoreNum = Number(0);

    dead = 0;
    localStorage.setItem('deadTrack', 0);
    
    hungerText01 = 0;
    hungerText02 = 0;
    hungerText03 = 0;
    hungerText04 = 0;
    hungerText05 = 0;
    briliantText = 0;
    excellentText = 0;
    verygoodText = 0;
    scoreHelp = 0;
    growText01 = 0;
    growText02 = 0;
    growText03 = 0;
    growText04 = 0;
    growText05 = 0;
    rndText01 = 0;
    rndText02 = 0;
    rndText03 = 0;
    rndText04 = 0;
    rndText05 = 0;
    extraPointsText = 0,
    specialClick = 0;

    start();
    modalMenu.style.display = 'none';
  }

  // Pause btn
  function pause() {
    audio01.play();
    if (ageTimer == null) {
      start();
      dialog('Game resumed. ▶️', 'animate__pulse');
      pauseBtn.innerHTML = 'PAUSE';
      modalMenu.style.display = 'none';
      scoreTimerPause = 0;
    } else {
      stop();
      dialog('Game paused. ⏸', 'animate__pulse');
      pauseBtn.innerHTML = 'RESUME';
      scoreTimerPause = 1;
    }
  }

  // Music btn
  function musicPlay() {
    audio01.play();
    if (music == 0) {
      bgMusic.muted = true;
      localStorage.setItem('musicTrack', 0);
      dialog('Music is muted. 🔇', 'animate__pulse');
      musicBtn.innerHTML = 'MUSIC ON';
      music = 1;
    } else {
      bgMusic.muted = false;
      localStorage.setItem('musicTrack', 1);
      dialog('Music is ON. 🔈', 'animate__pulse');
      musicBtn.innerHTML = 'MUSIC OFF';
      music = 0;
    }
  }

  /*
   * Check All Game Progress
   */
  function gameLogic() {
    // Local storage data
    localStorage.setItem('ageTrack', age);
    localStorage.setItem('hungerTrack', hunger);
    localStorage.setItem('waterTrack', water);
    localStorage.setItem('exerciseTrack', exercise);
    localStorage.setItem('bladderTrack', bladder);
    localStorage.setItem('hygieneTrack', hygiene);
    localStorage.setItem('funTrack', fun);
    localStorage.setItem('energyTrack', energy);

    document.querySelector('.age-stat').innerHTML = age;
    document.querySelector('.hunger-stat').innerHTML = hunger;
    document.querySelector('.water-stat').innerHTML = water;
    document.querySelector('.exercise-stat').innerHTML = exercise;
    document.querySelector('.bladder-stat').innerHTML = bladder;
    document.querySelector('.hygiene-stat').innerHTML = hygiene;
    document.querySelector('.fun-stat').innerHTML = fun;
    document.querySelector('.energy-stat').innerHTML = energy;

    // Bonus status
    if (hunger >= 95 && water >= 95 && exercise >= 95 && bladder >= 95 && hygiene >= 95 && fun >= 95) {
      if (briliantText == 0) {
        dialog('Brilliant play!', 'animate__tada');
        briliantText = 1;
      }
      bonus.innerHTML = '🌟🌟🌟🌟🌟';
      timerScoreReset(1);
    } else if (hunger >= 85 && water >= 85 && exercise >= 85 && bladder >= 85 && hygiene >= 85 && fun >= 85) {
      if (excellentText == 0) {
        dialog('Excellent play!', 'animate__tada');
        excellentText = 1;
      }
      bonus.innerHTML = '🌟🌟🌟🌟';
      timerScoreReset(10);
    } else if (hunger >= 75 && water >= 75 && exercise >= 75 && bladder >= 75 && hygiene >= 75 && fun >= 75) {
      if (verygoodText == 0) {
        dialog('Very good play!', 'animate__tada');
        verygoodText = 1;
      }
      bonus.innerHTML = '🌟🌟🌟';
      timerScoreReset(100);
    } else if (hunger >= 65 && water >= 65 && exercise >= 65 && bladder >= 65 && hygiene >= 65 && fun >= 65) {
      if (scoreHelp == 0) {
        dialog('Play better and get faster score count!');
        scoreHelp = 1;
      }
      bonus.innerHTML = '🌟🌟';
      timerScoreReset(500);
    } else {
      bonus.innerHTML=('🌟');
      timerScoreReset(1000);
    }

    // Special sounds
    if (age == 2 && babySound01 == 0) {
      audio06.play();
      babySound01 = 1;
    }

    if (age == 3 && babySound02 == 0) {
      audio07.play();
      babySound02 = 1;
    }

    // Age
    if (age <= 3 && growText01 == 0) {
      growText01 = 1;
      dialog('New baby is born! 👶🏻', 'animate__swing');
      setTimeout(function() { dialog('Baby name is ' + name + '. 😇', 'animate__pulse'); }, 5000);
      audio02.play();
      avatar.innerHTML=('👶🏻');

    } else if (age > 3 && age <= 10 && growText02 == 0) {
      growText02 = 1;
      dialog(name + ' is now child! 🧒🏻', 'animate__swing');
      audio02.play();
      avatar.innerHTML=('🧒🏻');
      
      // Reset timers based on age
      timerHungerReset(10000);
      timerWaterReset(10000);
      timerExerciseReset(10000);
      timerBladderReset(10000);
      timerHygieneReset(10000);
      timerFunReset(10000);
    } else if (age > 10 && age <= 20 && growText03 == 0) {
      growText03 = 1;
      dialog(name +' is now girl! 👧🏻', 'animate__swing');
      audio02.play();
      avatar.innerHTML=('👧🏻');
      document.querySelector('.dog').style.display = 'block';
      
      // Reset timers based on age
      timerHungerReset(5000);
      timerWaterReset(5000);
      timerExerciseReset(5000);
      timerBladderReset(5000);
      timerHygieneReset(5000);
      timerFunReset(5000);
    } else if (age > 20 && age <= 60 && growText04 == 0) {
      growText04 = 1;
      dialog(name + ' is now woman! 👩🏻', 'animate__swing');
      audio02.play();
      avatar.innerHTML=('👩🏻');
      document.querySelector('.vacation').style.display = 'block';
      
      // Reset timers based on age
      timerHungerReset(3000);
      timerWaterReset(3000);
      timerExerciseReset(3000);
      timerBladderReset(3000);
      timerHygieneReset(3000);
      timerFunReset(3000);
    } else if (age > 60 && age <= 100 && growText05 == 0) {
      growText05 = 1;
      dialog(name + ' is now grandmother! 👩🏻‍🦳', 'animate__swing');
      audio02.play();
      avatar.innerHTML=('👩🏻‍🦳');
      document.querySelector('.gifts').style.display = 'block';

      // Reset timers based on age
      timerHungerReset(1500);
      timerWaterReset(1500);
      timerExerciseReset(1500);
      timerBladderReset(1500);
      timerHygieneReset(1500);
      timerFunReset(1500);
    } else if (age == 100) {
      die();
    }


    // If bleeder 0
    if (bladder <= 0 && dead != 1) {
      setTimeout(function() { dialog('Yucky! 🚽🥴', 'animate__swing'); }, 5000);
      hygiene = 10;
      bladder = 100;
    }

    // If 0
    if (hunger <= 0 || water <= 0 || exercise <= 0 || hygiene <= 0 || fun <= 0 || energy <= 0) {
      die();
    }


    /*
     * Progress bar colors
     */

    // Hunger
    if (hunger <= 100 && hunger > 30 ) {
      document.querySelector('.hunger-bar').style.background = '#A0C633';
      hungerBtn.classList.remove('animate__flash');
    } else if (hunger <= 30 && hunger > 15) {
      document.querySelector('.hunger-bar').style.background = 'orange';
      audio05.play();
      hungerBtn.classList.add('animate__flash');
    } else if (hunger <= 15) {
      dialog('🍏? 🥵', 'animate__swing');
      document.querySelector('.hunger-bar').style.background = '#ff7373';
      audio05.play();
    }

    // Water
    if (water <= 100 && water > 30 ) {
      document.querySelector('.water-bar').style.background = '#A0C633';
      waterBtn.classList.remove('animate__flash');
    } else if (water <= 30 && water > 15) {
      document.querySelector('.water-bar').style.background = 'orange';
      audio05.play();
      waterBtn.classList.add('animate__flash');
    } else if (water <= 15) {
      document.querySelector('.water-bar').style.background = '#ff7373';
      audio05.play();
      dialog('💧? 🥵', 'animate__swing');
    }

    // Exercise
    if (exercise <= 100 && exercise > 30 ) {
      document.querySelector('.exercise-bar').style.background = '#A0C633';
      exerciseBtn.classList.remove('animate__flash');
    } else if (exercise <= 30 && exercise > 15) {
      document.querySelector('.exercise-bar').style.background = 'orange';
      audio05.play();
      exerciseBtn.classList.add('animate__flash');
    } else if (exercise <= 15) {
      document.querySelector('.exercise-bar').style.background = '#ff7373';
      audio05.play();
      dialog('⚽️? 🥵', 'animate__swing');
    }

    // Bladder
    if (bladder <= 100 && bladder > 30 ) {
      document.querySelector('.bladder-bar').style.background = '#A0C633';
      bladderBtn.classList.remove('animate__flash');
    } else if (bladder <= 30 && bladder > 15) {
      document.querySelector('.bladder-bar').style.background = 'orange';
      audio05.play();
      bladderBtn.classList.add('animate__flash');
    } else if (bladder <= 15) {
      document.querySelector('.bladder-bar').style.background = '#ff7373';
      audio05.play();
      dialog('🚽? 🥵', 'animate__swing');
    }

    // Hygiene
    if (hygiene <= 100 && hygiene > 30 ) {
      document.querySelector('.hygiene-bar').style.background = '#A0C633';
      hygieneBtn.classList.remove('animate__flash');
    } else if (hygiene <= 30 && hygiene > 15) {
      document.querySelector('.hygiene-bar').style.background = 'orange';
      audio05.play();
      hygieneBtn.classList.add('animate__flash');
    } else if (hygiene <= 15) {
      document.querySelector('.hygiene-bar').style.background = '#ff7373';
      audio05.play();
      dialog('🛀? 🥵', 'animate__swing');
    }

    // Fun
    if (fun <= 100 && fun > 30 ) {
      document.querySelector('.fun-bar').style.background = '#A0C633';
      funBtn.classList.remove('animate__flash');
    } else if (fun <= 30 && fun > 15) {
      document.querySelector('.fun-bar').style.background = 'orange';
      audio05.play();
      funBtn.classList.add('animate__flash');
    } else if (fun <= 15) {
      document.querySelector('.fun-bar').style.background = '#ff7373';
      audio05.play();
      dialog('🎲? 🥵', 'animate__swing');
    }

    // Energy
    if (energy <= 100 && energy > 30 ) {
      document.querySelector('.energy-bar').style.background = '#A0C633';
      energyBtn.classList.remove('animate__flash');
    } else if (energy  <= 30 && energy  > 15) {
      document.querySelector('.energy-bar').style.background = 'orange';
      audio05.play();
      energyBtn.classList.add('animate__flash');
    } else if (energy  <= 15) {
      document.querySelector('.energy-bar').style.background = '#ff7373';
      audio05.play();
      dialog('🛌? 🥵', 'animate__swing');
    }


    /*
     * Progress bar position
     */
    document.querySelector('.age-bar').style.width = age + '%';
    document.querySelector('.hunger-bar').style.width = hunger + '%';
    document.querySelector('.water-bar').style.width = water + '%';
    document.querySelector('.exercise-bar').style.width = exercise + '%';
    document.querySelector('.bladder-bar').style.width = bladder + '%';
    document.querySelector('.hygiene-bar').style.width = hygiene + '%';
    document.querySelector('.fun-bar').style.width = fun + '%';
    document.querySelector('.energy-bar').style.width = energy + '%';


    /*
     * Chat dialogs
     */
    if (age >= 1 && age <= 3) {
      if (hungerText01 == 0) {
        dialog('Hi, friend. 👋', 'animate__pulse');
        hungerText01 = 1;
      }
      
      if (hungerText01 == 1 && hungerText02 == 0) {
        setTimeout(function() { dialog('I am hungry! 😔', 'animate__pulse'); }, 5000);
        hungerText02 = 1;
      }

      if (hungerText02 == 1 && hungerText03 == 0) {
        setTimeout(function() {
          dialog('Click on 🍏 icon, to feed me.', 'animate__pulse');
          hungerBtn.disabled = false;
          hungerText03 = 1;
        }, 11000);
      }
    }

    if (hungerText01 == 1 && hungerText02 == 1 && hungerText03 == 1 && hungerText04 == 1 && hungerText05 == 0) {
      setTimeout(function() {
        dialog('Continue now with 💧, ⚽️, and so on ...', 'animate__pulse');
        waterBtn.disabled = false;
        exerciseBtn.disabled = false;
        bladderBtn.disabled = false;
        hygieneBtn.disabled = false;
        funBtn.disabled = false;
        energyBtn.disabled = false;
      }, 5000);

      hungerText05 = 1;
    }

    if (age == 11 && rndText01 == 0) {
      dialog('How are you?', 'animate__pulse');
      rndText01 = 1;
    }

    if (age == 21 && rndText02 == 0) {
      dialog('What a beautiful day. ☺️', 'animate__pulse');
      rndText02 = 1;
    }

    if (age == 31 && rndText03 == 0) {
      dialog('What a time to be alive!', 'animate__pulse');
      rndText03 = 1;
    }

    if (age == 41 && rndText04 == 0) {
      dialog('You doing very good. 👍', 'animate__pulse');
      rndText04 = 1;
    }

    if (age == 51 && rndText05 == 0) {
      dialog('You are my hero. 💪', 'animate__pulse');
      rndText05 = 1;
    }
  } //: check health

}