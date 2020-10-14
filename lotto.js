function analysisLotto() {
  // 무작위 추출
  let lotto = [];
  while(lotto.length < 6) {
    let temp = Math.floor(Math.random() * 45) + 1;
    if(!lotto.includes(temp)) {
      lotto.push(temp);
    };
  };
  // 정렬
  lotto.sort((a, b) =>  a - b);
  return lotto;
};

function analysis() {
  // 다시 눌렀을 때 초기화 해주기 위해
  document.querySelector("#analysisLotto").innerHTML = ``;
  document.querySelector("#lottoTable").innerHTML = ``;
  let allRaffle = [];
  let time = document.querySelector("#lottoInput").value;
  let result = [0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let recommand = [];
  // 입력란이 비어있으면 경고 창
  if(time === "") {
    alert("숫자를 입력해 주세요.")
  } else {
    // 입력한 숫자 만큼의 로또 번호를 allRaffle에 넣어준다.
    for(let i = 1; i <= time; i++) {
      allRaffle.push(analysisLotto());
    };
    // allRaffle을 돌면서 1~45번 까지 숫자에 카운트롤 올려준다.
    for(let i = 0; i <= allRaffle.length - 1; i ++) {
      for(let j = 1; j <= 45; j++) {
        if(allRaffle[i].includes(j)) {
          result[j - 1] += 1;
        }
      }
    }
    // 1~45까지에서 제일 많이 나온 수를 추출해주는 로직
    for(let j = 0; j <= 5; j++) {
      // 최대값의 인덱스 번호를 받아온다.
      let maxIndex = result.indexOf(Math.max.apply(null, result));
      // 추천값에 넣어준다. +1하는 이유는 인덱스번호와 실제번호 맞추기 위해
      recommand.push(maxIndex + 1);
      // 그래프 만들어주는 로직
      for(let i = 0; i <= result.length - 1; i++) {
        // 최대 값은 빨간색으로 그려준다.
        if(result[i] === Math.max.apply(null, result)) {
          document.querySelector("#analysisLotto").innerHTML += `<div style="border: 1px solid red; float: left; position: absolute; left: ${i * 20}px; bottom: 0; width: 16px; height: ${result[i]/ 10}vh; max-height: ${result[i] / 10}vh; background: red; font-size: xx-small">${result[i]} ${i + 1}<br></div>`
        } else {
          // 다음 최대 값을 구하기 위해 만들어준 0값이 나오면 통과한다.
          if(result[i] === 0) {
            continue;
          }
          // 마지막 j번째에서 최대 일반 그래프 막대를 그려준다.
          if(j === 5) {
            document.querySelector("#analysisLotto").innerHTML += `<div style="border: 1px solid grey; float: left; position: absolute; left: ${i * 20}px; bottom: 0; width: 16px; height: ${result[i] / 10}vh; max-height: ${result[i] / 10}vh; background: grey; font-size: xx-small">${result[i]} ${i + 1}<br></div>`
          }
        }
      }
      // 다음 최대 값을 구하기 위해 이미 그려진 그래프의 최대 값은 0으로 만들어 준다.
      result[maxIndex] = 0;
    };
    // 부모 div 태그의 높이를 자식 div 태그의 높이로 맞춰준다.
    document.getElementById("analysisLotto").style.height = `${Math.max.apply(null, result) / 10}vh`;
    recommand.sort((a, b) =>  a - b);
    // 추천 번호 색을 넣어서 이미지화 시켜준다.
    for(let i = 0; i <= recommand.length - 1; i ++) {
      if(recommand[i] <= 10) {
        document.querySelector("#lottoTable").innerHTML += `<div id="yellow">${recommand[i]}</div>`
      } else if(recommand[i] <= 20) {
        document.querySelector("#lottoTable").innerHTML += `<div id="blue">${recommand[i]}</div>`
      } else if(recommand[i] <= 30) {
        document.querySelector("#lottoTable").innerHTML += `<div id="red">${recommand[i]}</div>`
      } else if(recommand[i] <= 40) {
        document.querySelector("#lottoTable").innerHTML += `<div id="grey">${recommand[i]}</div>`
      } else {
        document.querySelector("#lottoTable").innerHTML += `<div id="green">${recommand[i]}</div>`
      }
    };
    return recommand;
  };
};