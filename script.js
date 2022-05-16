async function makeQuiz() {
  // ポケモンのリストを取ってくる

  const pokeQuiz = new quizManeger();

  const list = await pokeQuiz.getPokemonNames(50);

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
    const img = document.querySelector("img");
    img.src =
      succsessPokemonObj.sprites.other["official-artwork"].front_default;

    // リストアイテム
    const answerButtons = document.querySelectorAll("li");
    const answerList = dummyNameList.slice();
    answerList.push(succsessPokemonObj.name);
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].textContent = answerList[i];
      answerButtons[i].addEventListener("click", (event) => {
        // クリック時に正解と不正解がconsole.logされる
        console.log(event);
        if (event.target.textContent === succsessPokemonObj.name) {
          console.log("Success !!!");
        } else {
          console.log("Failed !!!");
        }
        h1.textContent = succsessPokemonObj.name;
      });
    }
  }

  setHtml();
}

makeQuiz();
