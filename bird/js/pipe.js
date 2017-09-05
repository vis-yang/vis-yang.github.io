(function(fb){
  var Pipe = function (ctx, topImg, botImg, x) {
    this.ctx = ctx;
    this.topImg = topImg;
    this.botImg = botImg;
    //预留空白区域
    this.x = x + 400;
    //速度
    this.speed = 3;
    //管道上下距离
    this.space = 200;
    //图片高度
    this.imgHeight = this.topImg.height;
    this.imgWidth = this.topImg.width;
    //初始化管道高度
    this.initHeight();
  };
  Pipe.prototype.initHeight = function () {
    //上管道随机坐标
    var randomH = 200 * Math.random();
    var minH = 40;
    var h = randomH + minH;
    this.topY = -this.imgHeight + h;
    //下面图片的坐标
    this.botY = h + this.space;
  };
  Pipe.prototype.draw = function () {
    //绘制
    this.ctx.drawImage(this.topImg, this.x, this.topY);
    this.ctx.drawImage(this.botImg, this.x, this.botY);
    //绘制路径
    this.ctx.rect(this.x, this.topY, this.imgWidth, this.imgHeight);
    this.ctx.rect(this.x, this.botY, this.imgWidth, this.imgHeight);
    //动起来
    this.x -= this.speed;

    //判断管道出去移到最后，重新生成新管道
    if (this.x 