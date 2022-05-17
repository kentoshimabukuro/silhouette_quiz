function shuffle(arr) {
  const tmp = arr.slice();
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(tmp.splice(getRandomInt(tmp.length), 1).shift());
  }

  return result;
}

async function makeQuiz(quizName, offset = 0) {
  // ポケモンのリストを取ってくる

  const pokeQuiz = new quizManeger();

  const list = await pokeQuiz.getPokemonNames(50, offset);

  // 正解のポケモンを決める
  const successNum = getRandomInt(list.length);
  const succsessPokemonObj = await pokeQuiz.getPokemonDataInList(
    list,
    successNum
  );

  // 正解と不正解の解答をli要素に設定する
  const dummyNameList = pokeQuiz.getDummyNames(list, successNum);

  function setHtml() {
    // ポケモン名
    const h1 = document.querySelector("h1");
    h1.textContent = "????";

    // 正解のポケモンの画像パスをimgタグに設定する
    const img = document.getElementById("pokemonImage");
    img.src =
      succsessPokemonObj.sprites.other["official-artwork"].front_default;
    if (quizName === "シルエットクイズ") {
      img.style.filter = "brightness(0%)";
    } else {
      img.style.filter = "blur(1.3rem) grayscale(100%)";
    }

    // リストアイテム
    const answerButtons = document.querySelectorAll("li button");
    const answerList = dummyNameList.slice();
    answerList.push(succsessPokemonObj.name);
    const showAnswerList = shuffle(answerList);
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].style.backgroundColor = "#21294e";
      answerButtons[i].textContent = showAnswerList[i];
      answerButtons[i].addEventListener("click", (event) => {
        // クリック時に正解と不正解がconsole.logされる
        console.log(event);
        if (event.target.textContent === succsessPokemonObj.name) {
          console.log("Success !!!");
          event.target.style.backgroundColor = "springgreen";
        } else {
          console.log("Failed !!!");
          event.target.style.backgroundColor = "red";
        }
        h1.textContent = succsessPokemonObj.name;
        if (quizName === "シルエットクイズ") {
          img.style.animation = "fadeBrightness 1s ease 0s 1 normal";
          img.style.filter = "brightness(100%)";
        } else {
          img.style.animation = "fade 1s ease 0s 1 normal";
          img.style.filter = "";
        }
      });
    }
  }

  setHtml();
}

makeQuiz("シルエットクイズ");

function getOffsetValue() {
  const offsetTextBox = document.getElementById("offsetValue");
  let value = Number(offsetTextBox.value);

  if (Number.isNaN(value)) {
    value = 0;
    offsetTextBox.value = 0;
  } else if (value > 830) {
    value = 800;
    offsetTextBox.value = 800;
  } else if (value < 0) {
    value = 0;
    offsetTextBox.value = 0;
  }
  return value;
}

const quiz1Btn = document.getElementById("quiz1");
quiz1Btn.addEventListener("click", () => {
  const offset = getOffsetValue();
  makeQuiz("シルエットクイズ", offset);
});

const quiz2Btn = document.getElementById("quiz2");
quiz2Btn.addEventListener("click", () => {
  const offset = getOffsetValue();
  makeQuiz("高難易度クイズ", offset);
});
