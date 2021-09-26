var count = 2;
window.onscroll = function (e) {
  /* window.innerHeight = 브라우저에서 실제로 표시되고 있는 영역의 높이
   * window.scrollY = 스크롤이 Y축으로 얼마만큼 이동했는지
   * document.body.offsetHeight = 요소의 실제 높이
   */
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    count++;
    var addContent = document.createElement("div");
    addContent.classList.add("box")
    addContent.innerHTML = `<p>${++count}번째 블록</p>`
    document.querySelector('article').appendChild(addContent);
  }
}