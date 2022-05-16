const expect = chai.expect;

describe("Pokemon API", () => {
  it("should get pokemon names", async () => {
    const pokeQuiz = new quizManeger();
    // 5匹のポケモンの名前を取ってこれるか
    expect(await pokeQuiz.getPokemonNames(5)).to.deep.equal(
      testData.slice(0, 5)
    );
  });

  it("should get pokemon data in names array", async () => {
    const pokeQuiz = new quizManeger();
    const list = await pokeQuiz.getPokemonNames(5);
    expect(await pokeQuiz.getPokemonDataInList(list, 2)).to.deep.equal(
      testPokemonObj
    );
  });

  it("should get random 3 demmy names", async () => {
    const pokeQuiz = new quizManeger();
    // 正解のNumberを算出
    const succsessNum = getRandomInt(30);

    // 30体のリストを持ってくる
    const list = await pokeQuiz.getPokemonNames(30);

    // リストと正解のNumberを渡すと不正解の3つの名前をリストで返してくれる
    const result = pokeQuiz.getDummyNames(list, succsessNum);
    console.log("list", list);
    console.log("successnum", succsessNum);
    console.log("result", result);

    // 帰ってきたリストに正解と同じ名前がないこと
    const cehckArray = [];
    for (const name of result) {
      if (name === list[succsessNum]) {
        cehckArray.push(name);
      }
    }
    // 正解のものが入っていないか
    expect(cehckArray.length).to.equal(0);

    // 帰ってきたリストの中に重複したものがないこと
    let hasDublicate = false;
    for (const name of result) {
      let count = 0;
      for (const name2 of result) {
        if (name === name2) {
          count++;
        }
      }
      if (count > 1) {
        hasDublicate = true;
      }
    }

    // ダブりがないか
    expect(hasDublicate).to.be.false;
  });

  it("should get random 3 demmy names", async () => {
    const pokeQuiz = new quizManeger();
    // 正解のNumberを算出
    const succsessNum = getRandomInt(5);

    // 30体のリストを持ってくる
    const list = await pokeQuiz.getPokemonNames(5);

    // リストと正解のNumberを渡すと不正解の3つの名前をリストで返してくれる
    const result = pokeQuiz.getDummyNames(list, succsessNum);
    console.log("list", list);
    console.log("successnum", succsessNum);
    console.log("result", result);

    // 帰ってきたリストに正解と同じ名前がないこと
    const cehckArray = [];
    for (const name of result) {
      if (name === list[succsessNum]) {
        cehckArray.push(name);
      }
    }
    // 正解のものが入っていないか
    expect(cehckArray.length).to.equal(0);

    // 帰ってきたリストの中に重複したものがないこと
    let hasDublicate = false;
    for (const name of result) {
      let count = 0;
      for (const name2 of result) {
        if (name === name2) {
          count++;
        }
      }
      if (count > 1) {
        hasDublicate = true;
      }
    }

    // ダブりがないか
    expect(hasDublicate).to.be.false;
  });

  it("should return string Array", async () => {
    const pokeQuiz = new quizManeger();
    // 正解のNumberを算出
    const succsessNum = getRandomInt(5);

    // リストを持ってくる
    const list = await pokeQuiz.getPokemonNames(5);

    const result = pokeQuiz.getDummyNames(list, succsessNum);

    for (const element of result) {
      expect(typeof element).to.equal("string");
    }
  });
});
