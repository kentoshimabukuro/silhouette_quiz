// ランダムな整数を生成する
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// 与えられたリストの中でダブっているものがあるかを返す
function hasDublicate(array) {
  let result = false;
  for (const name of array) {
    let count = 0;
    for (const name2 of array) {
      if (name === name2) {
        count++;
      }
    }
    if (count > 1) {
      result = true;
    }
  }
  return result;
}

// class quiz {
//   constructor(pokemon) {
//     this.succsessPokemon = pokemon;
//     this.succsessName = pokemon.name; // 正解
//     this.dummyNames = []; // 不正解の3つの回答
//     this.done = false; // クイズを行ったか
//     this.isSuccess = false; // 正解したかどうか
//   }

//   answer(pokemonName) {
//     if (this.succsessName === pokemonName) {
//       this.isSuccess = true;
//       this.done = true;
//       return true;
//     } else {
//       this.done = true;
//       return false;
//     }
//   }
// }

class quizManeger {
  constructor() {}

  // ポケモンAPIから名前のリストを取ってくる
  getPokemonNames(numOfPokemon, offset = 0) {
    const url =
      "https://pokeapi.co/api/v2/pokemon/?limit=" +
      numOfPokemon +
      "&offset=" +
      offset;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data.results);
  }

  // 取ってきた名前のリストの中から、指定したインデックスのポケモン情報を取ってくる
  getPokemonDataInList(list, numOfPokemon) {
    return fetch(list[numOfPokemon].url).then((res) => res.json());
  }

  // 取ってきた名前のリストから、ランダムな３つの不正解の名前を返す
  getDummyNames(list, succsessNum) {
    const indexs = [0, 1, 2];
    for (let i = 0; i < 3; i++) {
      do {
        indexs[i] = getRandomInt(list.length);
      } while (
        // 正解と同じだったらもう一回
        indexs[i] === succsessNum ||
        // 重複があったらもう一回
        hasDublicate(indexs)
      );
    }
    return indexs.map((value) => list[value].name);
  }
}

window.getRandomInt = getRandomInt;
window.quizManeger = quizManeger;

// window.getPokemonNames = getPokemonNames;
// window.getPokemonDataInList = getPokemonDataInList;
// window.getDummyNames = getDummyNames;
