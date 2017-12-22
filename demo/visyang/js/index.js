/**
 * Created by HP on 2017/7/11.
 */
/********************顶部开始***********************/
//为close按钮注册缓慢关闭top的程序
$("#topClose").click(function () {
    //让顶部隐藏
    $("#top").slideUp(1000);
    //让导航移动到顶部
    $("#nav").animate({"top": "0px"}, 1000);
});
//为wechat微信添加鼠标进入移出的事件
$("#wechat").mouseenter(function () {
    //微信图标改变颜色
    $(this).css("background", "url(images/wechatsmallhover.png) no-repeat");
    //微信出现二维码
    $("#wechatbig").css("display", "block");
    //微信图标鼠标离开事件
}).mouseleave(function () {
    //微信图标改变颜色
    $(this).css("background", "url(images/wechatsmall.png) no-repeat");
    //微信隐藏二维码
    $("#wechatbig").css("display", "none");
});
/********************顶部结束***********************/
var index = 0;
//子导航显示隐藏 start ----------------------------
//子导航位置调整
$("#nav-ul>li:gt(1)").find("i").css({"left":"-15px"});
$("#nav-ul .wrong").prev().css({"bottom":"30px"});
//设置鼠标进入显示子导航
$("#nav-ul>li:gt(0)").mouseenter(function () {
    //当鼠标进入其他li时，让第一个li的下划线长度变小
    $("#nav-ul>li").first().find("i").stop().animate({"width": "0px"}, 800);
    //选中的li的下划线变宽
    $(this).find("i").stop().animate({"width": "88px"}, 800);
    //如果li里有子导航，则显示出来
    $(this).find(".hide").toggleClass("hide").css("top", "90px").stop().animate({"top": "70px"});
}).mouseleave(function () {
    //当鼠标离开时，还原下划线长度
    $("#nav-ul>li>.first").stop().animate({"width": "88px"}, 800);
    //选中的li的下划线还原
    $("#nav-ul>li:gt(0)").find("i").stop().animate({"width": "0px"}, 800);
    //隐藏元素
    $("#nav-ul .s").addClass(" hide");
});

//导航显示隐藏 end ----------------------------

//侧边导航显示隐藏页面 start ----------------------------
var uD = 0;//设置一个锁，给页面触发事件
//默认选中第一个小圆点变大
$("#dot ul :first-child").find("i").css({"width": "8px", "height": "8px", "marginTop": "4px", "marginLeft": "-4px"})
//小圆点说明默认隐藏
$("#dot ul>li").find("span").css("opacity", 0);
//鼠标进入事件
$("#dot ul>li").find("i").css({"marginLeft": "-4px"}).end().mouseenter(function () {
    //小圆点说明显示
    $(this).find("span").stop().animate({"opacity": 1}, 200);
    //鼠标离开事件
}).mouseleave(function () {
    //小圆点说明隐藏
    $(this).find("span").stop().animate({"opacity": 0}, 200);
    //鼠标点击事件
}).click(function () {
    //先让所有圆点恢复默认
    $("#dot ul>li").find("i").stop().animate({"width": "0px", "height": "0px"}, 200);
    // //选定的圆点变大
    $(this).find("i").stop().animate({"width": "8px", "height": "8px", "marginTop": "4px", "marginLeft": "-4px"});
    //获取小圆点下标
    index = $(this).index();
    //所点击的圆圈对应的主页显示出来
    $("#banner1").stop().animate({"marginTop": -768 * index + "px"}, 1000);
    //连接第二页加载事件,点击控制,设置条件，如果是当前页面重新加载，则不触发
    if (index == 1 && uD != 1) {
        load1();
        uD = index;//记录此时小圆点的下标，如果已经是本页面，则不会让条件触发进来
    } else if (index == 3 && uD != 3) {
        load2();
        uD = index;
    } else if (index == 4 && uD != 4) {
        load3();
        uD = index;
    } else {//当所有条件不满足的时候也要记录当前的下标
        uD = index;
    }
});
var flag = true;
var flagDot = true;
//滚轮翻页效果
document.onmousewheel = function (e) {
    //滚轮向下
    if (e.wheelDelta <= -120 && index <= 3 && flagDot == true) {
        flagDot = false;
        index++;
        //页面移动
        $("#banner1").stop().animate({"marginTop": -768 * index}, 1000, function () {
            flagDot = true;
        });
        //先让所有圆点恢复默认
        $("#dot ul>li").find("i").stop().animate({"width": "0px", "height": "0px"}, 200);
        // //选定的圆点变大
        $("#dot ul>li:eq(" + index + ")").find("i").stop().animate({
            "width": "8px",
            "height": "8px",
            "marginTop": "4px",
            "marginLeft": "-4px"
        }, 200);
    }
    //滚轮向上
    if (e.wheelDelta >= 120 && index >= 1 && flagDot == true) {//向下
        flagDot = false;
        index--;
        $("#banner1").stop().animate({"marginTop": -768 * index}, 1000, function () {
            flagDot = true;
        });
        //先让所有圆点恢复默认
        $("#dot ul>li").find("i").stop().animate({"width": "0px", "height": "0px"}, 200);
        // //选定的圆点变大
        $("#dot ul>li:eq(" + index + ")").find("i").stop().animate({
            "width": "8px",
            "height": "8px",
            "marginTop": "4px",
            "marginLeft": "-4px"
        }, 200);
    }
//这是当页面到对应的层时，启动页面加载效果，滚轮控制
    if (e.wheelDelta >= 120 || e.wheelDelta <= -120) {
        if (index == 1 && uD != 1) {
            load1();
            uD = index;//记录此时小圆点的下标，如果已经是本页面，则不会让条件触发进来
        } else if (index == 3 && uD != 3) {
            load2();
            uD = index;
        } else if (index == 4 && uD != 4) {
            load3();
            uD = index;
        } else {
            uD = index;
        }
    }
};
//设置导航logo翻转,上锁
var step = 0;
var flagLogo = true;
my$("logo").onmouseover = function () {
    if (flagLogo == true) {//锁打开的时候才运行定时器
        flagLogo = false;//进来就上锁
        var timeId = setInterval(function () {
            if (step < 180) {
                step++;
                my$("logo").style.transform = "rotateY(" + step + "deg)";
            } else {
                clearInterval(timeId);
                timeId = setInterval(function () {
                    if (step > 0) {
                        step--;
                        my$("logo").style.transform = "rotateY(" + step + "deg)";
                    } else {//当整个动画运行完毕后，停止定时器，并把锁打开
                        clearInterval(timeId);
                        flagLogo = true;
                    }
                }, 1);
            }
        }, 1);
    }

};
//侧边导航显示隐藏页面 end ----------------------------

//banner1 底部小圆点,焦点,自动轮播   start--------------------
//小圆点点击事件
var indexB1 = 0;
$("#banner1>.dotNav>ul>li").click(function () {
    //小圆点颜色排他
    $("#banner1>.dotNav>ul>li").removeClass("opaMax").addClass("opaMin");
    //点击变色
    $(this).removeClass("opaMin").addClass("opaMax");
    indexB1 = $(this).index();
    //对应图片变换
    $("#bannerImg").stop().animate({"left": -indexB1 * 1366}, 800);
});
//焦点按钮点击事件
$("#banner1>.btn-both>.btn-left").click(function () {
    //最小图片位置，和锁
    if (indexB1 == 0 && flag == true) {
        indexB1 = $("#bannerImg>a").length - 1;
        //如果最小了，跳转图片
        $("#bannerImg").css("left", -indexB1 * 1366 + "px");
    }
    if (flag) {
        flag = false;
        indexB1--;
        //移动图片
        $("#bannerImg").stop().animate({"left": -indexB1 * 1366}, 800, function () {
            flag = true;
        });
    }
    //小圆点颜色排他
    $("#banner1>.dotNav>ul>li").removeClass("opaMax").addClass("opaMin");
    //点击变色
    $("#banner1>.dotNav>ul>li:eq(" + indexB1 + ")").removeClass("opaMin").addClass("opaMax");
});
//右侧按钮
$("#banner1>.btn-both>.btn-right").click(f1);
function f1() {
    //到最后一张，跳转到第一张
    if (indexB1 == ($("#bannerImg>a").length - 1) && flag == true) {
        indexB1 = 0;
        $("#bannerImg").css("left", -indexB1 * 1366 + "px");
    }
    //图片移动
    if (flag == true) {
        flag = false;
        indexB1++;
        $("#bannerImg").stop().animate({"left": -indexB1 * 1366}, 800, function () {
            flag = true;
        });
    }
    //小圆点颜色排他
    $("#banner1>.dotNav>ul>li").removeClass("opaMax").addClass("opaMin");
    //对应小点变色
    if (indexB1 == ($("#bannerImg>a").length - 1)) {
        $("#banner1>.dotNav>ul>li:eq(0)").removeClass("opaMin").addClass("opaMax");
    }
    $("#banner1>.dotNav>ul>li:eq(" + indexB1 + ")").removeClass("opaMin").addClass("opaMax");
}

//自动轮播
var timeId = setInterval(f1, 3000);
//鼠标进入停止
$("#banner1").mouseenter(function () {
    clearInterval(timeId);
});
//鼠标离开继续
$("#banner1").mouseleave(function () {
    timeId = setInterval(f1, 3000);
});
//banner1 底部小圆点,焦点,自动轮播   end--------------------

// banner2部分 start-------------------------
// 加载完毕，图片向上移动位置动画 函数
var flagB2 = true;
function load1() {
    //初始化图片位置
    $("#banner2-pro>li").css("marginTop", "300px");
    flagB2 = false;
    var pic = 0;
    var time = 50;
    //图片移动定时器
    var timeId = setInterval(function () {
        clearInterval(timeId);
        f1();
        var timeId2 = setInterval(f1, time);
        //图片移动函数
        function f1() {
            if (pic == $("#banner2-pro>li").length) {
                clearInterval(timeId2);
                return;
            }
            $("#banner2-pro>li:eq(" + pic + ")").stop().animate({"marginTop": 0},600, function () {
                flagB2 = true;
            });
            pic++;
            time += 100;
        };
    }, 1000);
}
//中间轮播图，获取元素，按钮等---
var ban2Pic = 0;
var flagB2 = true;
//右边按钮
$("#banner2-btn>li:last").click(function () {
    //判断图片是否到头，判断动画运行完毕没
    if (ban2Pic < $("#banner2-pro>li").length - 4 && flagB2 == true) {
        flagB2 = false;
        ban2Pic++;
        $("#banner2-pro").stop().animate({"left": -ban2Pic * 315}, 800, function () {
            flagB2 = true;
        });
    }
});
//左边按钮
$("#banner2-btn>li:first").click(function () {
    if (ban2Pic > 0 && flagB2 == true) {
        flagB2 = false;
        ban2Pic--;
        $("#banner2-pro").stop().animate({"left": -ban2Pic * 315}, 800, function () {
            flagB2 = true;
        });
    }
});
//图片文字右箭头滑动动画
$("#banner2-pro>li").mouseenter(function () {
    //img,父元素的下一个兄弟元素，下一个兄弟元素。。。鼠标进入设置属性，离开后还原属性
    $(this).find("img").first().stop().animate({
        "width": 315,
        "height": 200,
        "marginLeft": -15,
        "marginTop": -15
    }, 500).parent().next().stop().animate({"left": 10}, 500).next().stop().animate({"right": 10}, 500).next().stop().animate({"width": 295}, 500);
}).mouseleave(function () {
    $(this).find("img").first().stop().animate({
        "width": 295,
        "height": 185,
        "marginLeft": 0,
        "marginTop": 0
    }, 500).parent().next().stop().animate({"left": 0}, 500).next().stop().animate({"right": -20}, 500).next().stop().animate({"width": 0}, 500);
});
// banner2部分 end-------------------------

// banner3部分 start-------------------------
var idx = 0;
//图片拉下，显示，数字爆破
    $("#banner3-ul>li").mouseenter(function () {
        idx = $(this).index();
        if ($("#banner3-ul").offset().left < 150) {
            idx = $(this).index() - 1;
        }
        //数字变大消失等等
        $(this).find("span").first().stop().animate({
            "fontSize": "200px",
            "left": "50px",
            "opacity": 0
        }, 500).next().stop().animate({"marginTop": 180, "opacity": 1}, 800, function () {
            //执行动画后执行背景变白
            $("#zd li:eq(" + idx + ")").stop().animate({"opacity": 1}, 800);
        });
    }).mouseleave(function () {
        //全部还原
        $(this).find("span").first().stop().animate({
            "fontSize": 60,
            "left": 100,
            "opacity": 1
        }, 500).next().stop().animate({"marginTop": 150, "opacity": 0}, 800);
        //还原背景变白
        $("#zd li:eq(" + idx + ")").stop().animate({"opacity": 0}, 800);
    });
//按钮焦点轮播,先右后左,移动ul控制图片
var ban3Pic = 0;
$("#banner3-btn :last").click(function () {
    if (ban3Pic < $("#banner3-ul>li").length - 3) {
        ban3Pic++;
        $("#banner3-ul").stop().animate({"left": -ban3Pic * 297}, 800);
    }
});
$("#banner3-btn :first").click(function () {
    if (ban3Pic > 0) {
        ban3Pic--;
        $("#banner3-ul").stop().animate({"left": -ban3Pic * 297}, 800);
    }
});
// banner3部分 end-------------------------

// banner4部分 start-------------------------
var banner4Pic = 0;
var flagB4 = true;
//右边按钮,轮播图
$("#banner4-btn :last").click(function () {
    if (flagB4 == true) {
        flagB4 = false;
        if (banner4Pic == $("#banner4-ul>li").length - 1) {
            banner4Pic = 0;
            $("#banner4-ul").css("left", -banner4Pic * 770 + "px");
        }
        banner4Pic++;
        $("#banner4-ul").stop().animate({"left": -banner4Pic * 770}, 1000, function () {
            flagB4 = true;
        });
    }
});
//左边按钮,轮播图
$("#banner4-btn :first").click(function () {
    if (flagB4 == true) {
        flagB4 = false;
        if (banner4Pic == 0) {
            banner4Pic = $("#banner4-ul>li").length - 1;
            $("#banner4-ul").css("left", -banner4Pic * 770 + "px");
        }
        banner4Pic--;
        $("#banner4-ul").stop().animate({"left": -banner4Pic * 770}, 1000, function () {
            flagB4 = true;
        });
    }
});
//页面加载后，文字向上移动到指定位置，设置延时定时器
function load2() {
    flagB4 = false;
    $("#banner4>div:last").css("marginTop", "800px");
    var timeId4 = setInterval(function () {
        clearInterval(timeId4)
        $("#banner4>div:last").stop().animate({"marginTop": "220px"}, 1000, function () {
            flagB4 = true;
        });
    }, 1000);
}
//琐碎的移动,首先是MORE的箭头，鼠标离开还原
$("#last").mouseenter(function () {
    $(this).find("b").stop().animate({"opacity": 1, "marginLeft": 10}, 500);
}).mouseleave(function () {
    $(this).find("b").stop().animate({"opacity": 0, "marginLeft": 0}, 500);
});
//然后是文字的移动,之后鼠标离开还原
$("#banner4 .con-r>.min").mouseenter(function () {
    $("#banner4 .con-r>.min").find("p").first().stop().animate({"marginLeft": 10}, 300, function () {
        $("#banner4 .con-r>.min").find("p").last().stop().animate({"marginLeft": 10}, 500);
    });
}).mouseleave(function () {
    $("#banner4 .con-r>.min").find("p").first().stop().animate({"marginLeft": 0}, 300, function () {
        $("#banner4 .con-r>.min").find("p").last().stop().animate({"marginLeft": 0}, 500);
    });
});
// banner4部分 end-------------------------
// banner5部分 start-------------------------
function load3() {
    $("#banner5>.left dl").css("left", "120%");
    $("#banner5>.right").css("right", "120%");
    $("#banner5>.left dl").stop().animate({"left": "130px"}, 1500);
    $("#banner5>.right").stop().animate({"right": "10%"}, 1500);
};
// banner5部分 end-------------------------