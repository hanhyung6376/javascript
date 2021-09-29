import { Wave } from "./wave.js";

class App {
  constructor() {
    // 캔버스 엘리먼트 생성 
    this.canvas = document.createElement("canvas");


    this.ctx = this.canvas.getContext("2d");

    // 현재 html 문서의 body에 캔버스 엘리먼트 추가
    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), {
      once: false,
      passive: false,
      capture: false,
    });

    /* 웨이브 객체 생성 */
    this.wave = new Wave();

    // 초기 사이즈를 기준으로 resize 함수 실행 
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  // 사이즈가 변했을 때 실행될 콜백 
  resize() {
    // 레티나 디스플레이에서 올바른 화면을 보여주기 위해 설정 
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);

    this.wave.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.wave.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

// 브라우저에 window가 로드 됐을 때, 객체 생성
window.onload = () => {
  new App();
};
