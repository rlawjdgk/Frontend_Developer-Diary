// 오전 문제
// 1부터 100까지의 수를 받고 alert으로 홀수 짝수 출력해주세요 만약 받은 숫자가 1보다 작고 100보다 크면 “1에서 100사이의 숫자를 입력해주세요”라고 출력해주세요

const num = Number(prompt("숫자를 적어주세요"));

if (1 <= num && num <= 100) {
  if (num % 2 === 1) {
    alert("홀수입니다");
  } else {
    alert("짝수입니다");
  }
} else {
  alert("1에서 100사이의 숫자를 입력해주세요");
}
