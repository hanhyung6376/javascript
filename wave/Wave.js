import { Point } from "./point.js";

export class Wave {
  constructor(color) {
    this.color = color;
    this.points = [];
    this.numberOfPoints = 6;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    /* 중간을 각각 넓이, 높이를 2로 나눈 값으로 지정 */
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    /* 
    각 점의 간격은 `전체 넓이 / (전체 점의 숫자 - 1)` 이 됩니다.  
    이렇게 점의 간격을 나누면 화면의 시작부터 끝까지 고른 간격으로 점을 찍을 수 있습니다.
    */
    this.pointGap = this.stageWidth / (this.numberOfPoints - 1);

    /* 초기화 함수로 넘어가기 */
    this.init();
  }

  init() {
    /* 가운데 하나의 점 만들기 */
    // this.point = new Point(this.centerX, this.centerY);

    /* 
    points에 각각의 점의 좌표와 인덱스를 넣어줍니다. 
    인덱스를 넣어주는 이유는 각 점의 위치에 따라 파동이 움직이는 모양도 다르게 하기 위해서입니다.
    */
    for (let i = 0; i < this.numberOfPoints; i++) {
      this.points[i] = new Point(i, this.pointGap * i, this.centerY);
    }
  }

  draw(ctx) {

    ctx.beginPath();
    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.numberOfPoints; i++) {

      /*
      * 각 좌표에 곡선 연결
      */
     const cx = (prevX + this.points[i].x) / 2;
     const cy = (prevY + this.points[i].y) / 2;

     ctx.quadraticCurveTo(prevX, prevY, cx, cy);

     // 이전 좌표 갱신
     prevX = this.points[i].x;
     prevY = this.points[i].y;

      /* 공의 위치 변경하기 */
      if (i != 0 && i != this.numberOfPoints - 1) {
        this.points[i].update();
      }
    }

      ctx.lineTo(prevX, prevY);
      ctx.lineTo(this.stageWidth, this.stageWidth);
      ctx.lineTo(0, this.stageHeight);
      ctx.lineTo(this.points[0].x, this.points[0].y);

      /* 색상 채우기 */
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
  }
}
