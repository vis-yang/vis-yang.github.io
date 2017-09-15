define(function (require, exports, module) {
  var Score = function (ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.addScore = 1;
    this.x = 0;
    this.y = 0;
  };
  Score.prototype.draw = function () {
    this.score += this.addScore;
    var str = '飞行距离:'+this.score;
    this.ctx.font = '20px 仿宋';
    this.ctx.fillText(str, 20, 20);
  };
  module.exports = Score;
});
