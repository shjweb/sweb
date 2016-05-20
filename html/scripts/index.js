/**
 * Created by Administrator on 2016/1/5 0005.
 * author MGY   QQ:190884513
 */
$(document).ready(function () {
    var index = {
        init: function () {
            //首页轮播图
            this.focusimg();
            //公告
            this.notice();
            //平台信息（注册数量、投资总额、利息总额）
            this.platstat();
            //MB理财风云榜TAB切换和数据渲染
            this.mbtab();
            //MB计划列表渲染
            this.mblistrender();
            //MB公司动态
            this.mbcompany();
            //MB公司媒体
            this.mbmt();
            //散标列表
            this.sanbiao();
            //浏览器检测
            this.alertdialogview();
            //根据认证去充值,去体验
            this.renzhengchongzhi();
            //飘窗
            this.piaochuang();
            //判断是否登录
            this.islogin(function () {
                $(".banner-register").show();
                $(".banner-explain").hide();
                setTimeout(function () {
                    $(".banner-mb").animate({top: -390, right: -916}, 2000, 'easeOutBounce')
                }, 100);
                $(".username").html(userinfo.data.mobile);
                $(".mb-ye").eq(0).show();
                $(".mb-left-money").eq(0).find("b").html(userinfo.data.availableAmount);
            }, function () {
                $(".banner-register").hide();
                $(".banner-explain").show();
                setTimeout(function () {
                    $(".banner-mb").animate({top: -420, right: -916}, 2000, 'easeOutBounce')
                }, 100);
                $(".mb-ye").eq(1).show();
            });
            //首页头尾
            this.headerfooter();
        },
        headerfooter: function () {
            $(".mb-wx").mouseenter(function (e) {
                $(this).find("img").show();
            })
            $(".mb-wx").find("img").mouseleave(function (e) {
                $(this).hide();
            })
            $(".mb-wx").mouseleave(function (e) {
                $(this).find("img").hide();
            })
            $(".mb-sj").mouseenter(function (e) {
                $(this).find("img").show();
            })
            $(".mb-sj").find("img").mouseleave(function (e) {
                $(this).hide();
            })
            $(".mb-sj").mouseleave(function (e) {
                $(this).find("img").hide();
            })
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/user/userInfo?ts=" + new Date().getTime(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        userinfo = data;
                        islogin = true;
                        successrender_index();
                    } else {
                        $("#notlogin").show();
                        $("#logined").hide();
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });

            $("#contact_us_btn").bind("click", function () {
                $("#contact_us_dialog").load('/html/contact_us.html', function (req) {
                    art.dialog({
                        id: 'panel-contract_us',
                        title: '联系我们',
                        content: document.getElementById("contact_us_dialog"),
                        width: '470',
                        height: 'auto',
                        lock: true,
                        drag: false,
                        resize: false,
                        left: "50%",
                        top: "50%",
                        button: []
                    });
                });
            });

            $(".foot-cod ").hover(
                function () {
                    $("#sweep").text("[ 给 你 更 多 惊 喜~]").css("color", "#d8bb58");
                },
                function () {
                    $("#sweep").text("扫一扫给你更多惊喜~").css("color", "#ccc");
                })

            $(".hezuo").on("click", function () {
                $(".friend-link").eq($(this).index()).show().siblings(".friend-link").hide()
                $(this).find("a").addClass("active").parent().siblings(".hezuo").find("a").removeClass("active")
            })

        },
        piaochuang: function () {
            $(window).scroll(function () {
                if (550 - $(window).scrollTop() > 140) {
                    $("#rightFLoatAd").css("top", 550 - $(window).scrollTop() + "px");
                }
                
            });
            $("#rightFLoatAd").on("click", function () {
                $(".fLoatAdTop").toggle();
                $(".fLoatAdBottom").toggle();
            });

        },
        islogin: function (callback, callback_no) {
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/user/userInfo?ts=" + new Date().getTime(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        if (callback) {
                            window.userinfo = data;
                            callback();
                        }
                    } else {
                        if (callback_no) {
                            callback_no();
                        }
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        banner: function () {
            //banner效果
            $(".banner-box").hover(function () {
                $(".prev,.next").stop(true, false).fadeTo("show", 1);
            }, function () {
                $(".prev,.next").stop(true, false).fadeTo("show", 0);
            })
            $(".banner-box").slide({
                titCell: ".hd ul",
                mainCell: ".bd ul",
                effect: "fade", /* fade：渐显； || top：上滚动；|| left：左滚动；|| topLoop：上循环滚动；|| leftLoop：左循环滚动；||fold 淡入淡出 slideDown：下拉效果*/
                interTime: 2000, /*毫秒；自动运行间隔*/
                delayTime: 200, /*毫秒；切换效果持续时间*/
                autoPlay: true,
                autoPage: true,
                trigger: "click" /*titCell触发方式 || mouseover：鼠标移过触发；|| click：鼠标点击触发；*/
            });
        },
        notice: function () {
            var _param = {}
            _param.articleType = 2
            $.ajax({
                type: "get",
                url: IPort + "/notice/newTop?ts=" + new Date().getTime(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        $(".mb-gonggao").find("a").eq(0).html(data.data.articleTitle).attr("href", '/front/notice/notice_' + data.data.id + '.html');
                    } else {

                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });

        },
        focusimg: function () {
            var _param = {}
            _param.bannerType = 3;
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/data/indexBannerList?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        $(".banner-box").find("ul").html("");
                        for (var i = 0; i < data.data.length; i++) {
                            $(".banner-box").find("ul").append("<li><a href=''></a></li>");
                            $(".banner-box").find("li").eq(i).css("background-image", "url(" + data.data[i].bannerPicUrl + ")");
                            $(".banner-box").find("a").eq(i).attr("href", data.data[i].targetUrl);
                        }
                        //banner效果
                        index.banner();
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        platstat: function () {
            var _param = {}
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/data/platStat?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        $(".cp-num").eq(0).html(common_fn.outputFloatmoney(data.data.totalRegUser));
                        $(".cp-num").eq(1).html("￥" + common_fn.outputFloatmoney(data.data.totalInvestMoney, 'float'));
                        $(".cp-num").eq(2).html("￥" + common_fn.outputFloatmoney(data.data.totalProfitMoney, 'float'));
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        mbtab: function () {
            $("#fyb_ul li").hover(function () {
                var currentType = $(this).attr("data");
                $(this).siblings().removeClass("active");
                $(this).addClass("active");

                $(".div_fyb").each(function (i) {
                    if ($(this).attr("data") == currentType) {
                        $(this).css("display", "block");
                    } else {
                        $(this).css("display", "none");
                    }
                });
            });

            /*var _listem = $(".fyb-list").find("em");
             for (var i = 0; i < _listem.length; i++) {
             _listem.eq(i).html("￥" + common_fn.outputFloatmoney(parseInt(_listem.eq(i).html().replace(/[^0-9]+/g, ''))));
             }*/

            var _param = {};
            _param.investTime = 0;
            _param.pageSize = 5;
            _param.currentPageNumber = 1;

            $.ajax({
                type: "get",
                url: IPort + "/mbapi/product/investTopList?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        var _liem = $(".list-con").eq(0).find("em");
                        var _lii = $(".list-con").eq(0).find("i");
                        for (var i = 0; i < _liem.length; i++) {
                            _liem.eq(i).html("");
                            _lii.eq(i).html("");
                            if (data.data[i] != undefined) {
                                _liem.eq(i).html("￥" + common_fn.outputFloatmoney(data.data[i].investAmount));
                                _lii.eq(i).html(data.data[i].mobile);
                            }

                        }
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
            _param.investTime = 1;
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/product/investTopList?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        var _liem = $(".list-con").eq(1).find("em");
                        var _lii = $(".list-con").eq(1).find("i");
                        for (var i = 0; i < _liem.length; i++) {
                            _liem.eq(i).html("");
                            _lii.eq(i).html("");
                            if (data.data[i] != undefined) {
                                _liem.eq(i).html("￥" + common_fn.outputFloatmoney(data.data[i].investAmount));
                                _lii.eq(i).html(data.data[i].mobile);
                            }

                        }
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
            _param.investTime = 2;
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/product/investTopList?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        var _liem = $(".list-con").eq(2).find("em");
                        var _lii = $(".list-con").eq(2).find("i");
                        for (var i = 0; i < _liem.length; i++) {
                            _liem.eq(i).html("");
                            _lii.eq(i).html("");
                            if (data.data[i] != undefined) {
                                _liem.eq(i).html("￥" + common_fn.outputFloatmoney(data.data[i].investAmount));
                                _lii.eq(i).html(data.data[i].mobile);
                            }

                        }
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });


        },
        mblistrender: function () {
            var onemonth = common_fn.getMonthDays(1);
            var threemonth = common_fn.getMonthDays(3);
            var sixmonth = common_fn.getMonthDays(6);
            var twelvemonth = 365;

            var _param = {};
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/product/mbList?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        var _li = $(".mb-plan-con").find("ul");
                        for (var i = 0; i < data.data.length; i++) {
                            _li.eq(i).find("em.sdqx").html(data.data[i].termRecruit);
                            if ($(".mb-buyid").eq(i).length > 0) {
                                $(".mb-buyid").eq(i).find("a").attr("href", "/pages/front/project/mb_detail.html?productId=" + data.data[i + 1].id);
                            }
                            if (i > 0) {//1月标不可点击
                                _li.eq(i).find("strong").html(data.data[i].interest);
                                _li.eq(i).siblings("p").html(data.data[i].productName);

                            }
                        }

                        //起始金额100来渲染页面
                        var _valhtml = 100;

                        //$(".money-value").eq(0).html((_valhtml * data.data[0].interest / 100 / 365 * onemonth).toFixed(2));
                        $(".money-value").eq(1).html((_valhtml * data.data[1].interest / 100 / 365 * threemonth).toFixed(2));
                        $(".money-value").eq(2).html((_valhtml * data.data[2].interest / 100 / 365 * sixmonth).toFixed(2));
                        $(".money-value").eq(3).html((_valhtml * data.data[3].interest / 100 / 365 * twelvemonth).toFixed(2));
                        //焦点事件，输入数值事件
                        $("#invest_money_input").focus(function () {
                            $("#invest_money_input").addClass("inputBorder2").removeClass("inputBorder1");
                        }).blur(function () {
                            $("#invest_money_input").addClass("inputBorder1").removeClass("inputBorder2");
                        }).on("keyup", function () {
                            var _val = $(this).val();
                            if (_val < parseInt($(this).attr("data-min"))) {
                                $("#show_error").show().html("亲，起投金额￥" + $(this).attr("data-min") + "元哦！");
                                $(".money-value").eq(1).html("0.00");
                                $(".money-value").eq(2).html("0.00");
                                $(".money-value").eq(3).html("0.00");
                            } else if (_val > parseInt($(this).attr("data-max"))) {
                                $("#show_error").show().html("亲，金额好大啊，请保持在" + $(this).attr("data-max") + "元以内吧！");
                                $(".money-value").eq(1).html("0.00");
                                $(".money-value").eq(2).html("0.00");
                                $(".money-value").eq(3).html("0.00");
                            } else {
                                $("#show_error").hide().html("");

                                //$(".money-value").eq(0).html((_val*data.data[0].interest/100/365*onemonth).toFixed(2));
                                $(".money-value").eq(1).html((_val * data.data[1].interest / 100 / 365 * threemonth).toFixed(2));
                                $(".money-value").eq(2).html((_val * data.data[2].interest / 100 / 365 * sixmonth).toFixed(2));
                                $(".money-value").eq(3).html((_val * data.data[3].interest / 100 / 365 * twelvemonth).toFixed(2));
                            }

                        })

                        /* //把第1个放到最后
                         $(".plan-contain").eq(0).parent().append($(".plan-contain").eq(0));
                         $(".plan-contain").eq(0).addClass("plan-mg-right");
                         $(".plan-contain").eq(1).removeClass("plan-mg-right").removeClass("plan-mg-top");
                         $(".plan-contain").eq(2).addClass("plan-mg-right");
                         $(".plan-contain").eq(3).removeClass("plan-mg-right").addClass("plan-mg-top");;*/


                    } else {

                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/product/demandBasicData?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        $(".huoqi-jx").html(data.data.aldYldTdyPrdocuct);
                    } else {

                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        mbcompany: function () {
            var _param = {}
            _param.articleType = 1;
            _param.currentPageNumber = 1;
            _param.pageSize = 5;
            $.ajax({
                type: "get",
                url: IPort + "/notice?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        $(".mb-news-list").eq(0).find("ul").html("");
                        for (var i = 0; i < data.data.list.length; i++) {
                            $(".mb-news-list").eq(0).find("ul").append("<li><a href=''></a></li>");
                            $(".mb-news-list").eq(0).find("ul").find("a").eq(i).html(data.data.list[i].articleTitle);
                            $(".mb-news-list").eq(0).find("ul").find("a").eq(i).attr("href", "/front/news/news_" + data.data.list[i].id + '.html');
                        }
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        mbmt: function () {
            var _param = {}
            _param.articleType = 3;
            _param.currentPageNumber = 1;
            _param.pageSize = 5;
            $.ajax({
                type: "get",
                url: IPort + "/notice?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        $(".mb-news-list").eq(1).find("ul").html("");
                        for (var i = 0; i < data.data.list.length; i++) {
                            $(".mb-news-list").eq(1).find("ul").append("<li><a href=''></a></li>");
                            $(".mb-news-list").eq(1).find("ul").find("a").eq(i).html(data.data.list[i].articleTitle);
                            $(".mb-news-list").eq(1).find("ul").find("a").eq(i).attr("href", "/front/media/media_" + data.data.list[i].id + '.html');
                        }
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        sanbiao: function () {
            var _param = {}
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/product/looseList?ts=" + new Date().getTime(),
                data: _param,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    if (data.code == "200") {
                        var _html = '<div class="list-2" ng-repeat="sbObj in sbList | limitTo: 5">'
                            + '<ul><li class="style-1"></li><li class="style-2"><img src="/resources/front/imgs/newindex/aa.png"></li>'
                            + '<li class="style-3"><span>%</span></li>'
                            + ' <li class="style-4"></li>'
                            + '<li class="style-5"></li>'
                            + '<li class="style-6">'
                            + '<div class="progress" data-process="">'
                            + '<span class="jindu"></span>'
                            + '</div>'
                            + '<p style="margin-left:14px;"></p>'
                            + '</li>'
                            + '<a href="" class="style-7"></a>'
                            + '<li class="style-80"></li>'
                            + '</ul>'
                            + '</div>';

                        $("#sanbiaolist").html("");
                        for (var i = 0; i < 5; i++) {
                            $("#sanbiaolist").append(_html);
                            $(".list-2").eq(i).find("li.style-1").html(data.data.list[i].productName);
                            $(".list-2").eq(i).find("li.style-3").html(data.data.list[i].interest + "%");
                            $(".list-2").eq(i).find("li.style-4").html(common_fn.outputFloatmoney(data.data.list[i].planAmount));
                            $(".list-2").eq(i).find("li.style-5").html(data.data.list[i].termRecruit);
                            $(".list-2").eq(i).find("li.style-6").attr("data-process", data.data.list[i].progress);
                            $(".list-2").eq(i).find("li.style-6").find("span").css("width", parseFloat(data.data.list[i].progress).toFixed(2) + "%");
                            $(".list-2").eq(i).find("li.style-6").find("p").html(data.data.list[i].progress);
                            $(".list-2").eq(i).find("li.style-80").addClass("style-8");
                            var _status = "";
                            if (data.data.list[i].status == 0) {
                                _status = "未开标"
                            } else if (data.data.list[i].status == 1) {
                                _status = "投标中"
                                $(".list-2").find("li.style-80").addClass("style-7").removeClass("style-8");
                            } else if (data.data.list[i].status == 2) {
                                _status = "募集结束"
                            } else if (data.data.list[i].status == 3) {
                                _status = "满标"
                            } else if (data.data.list[i].status == 4) {
                                _status = "还款中"
                            } else if (data.data.list[i].status == 5) {
                                _status = "还款结束"
                            } else {

                            }
                            $(".list-2").eq(i).find("li.style-80").html(_status);
                        }
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        renzhengchongzhi: function () {
            $(".mb-chongzhi").find("a").on("click", function (e) {
                e.preventDefault();
                if (userinfo.data.authStatus == 1) {
                    window.location.href = "/pages/front/account/fund/recharge_new.html";
                } else if (userinfo.data.authStatus == 0) {
                    window.location.href = "/pages/front/ump_open/open_account.html";
                }
            })
        },
        alertdialogview: function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            if (isIE) {
                var IE55 = IE6 = IE7 = IE8 = IE9 = IE10 = false;
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                IE55 = fIEVersion == 5.5;
                IE6 = fIEVersion == 6.0;
                IE7 = fIEVersion == 7.0;
                IE8 = fIEVersion == 8.0;
                IE9 = fIEVersion == 9.0;
                IE10 = fIEVersion == 10.0;
                if (IE55 || IE6 || IE7 || IE8 || IE9) {
                    $("#dialog_shengji").load('dialog_shengji.html', function (req) {
                        art.dialog({
                            id: 'panel-contract_us',
                            title: '请升级您的浏览器',
                            content: document.getElementById("dialog_shengji"),
                            width: '470',
                            height: 'auto',
                            lock: true,
                            drag: false,
                            resize: false,
                            left: "50%",
                            top: "50%",
                            button: []
                        });
                    });
                }
            }
        }
    };
    index.init();
});

var successrender_index = function () {
    $("#loginEd").show();
    $("#loginIng").hide();
    $(".mb-loginLeft10").show();
    $(".head-message-nums").html(userinfo.data.messageUnreadAounts);
    $(".mb-loginLeft10").html('累计收益(' + userinfo.data.totalInterest + '元)');
    $("#sml_box").find("li:eq(0)").find("span").html(userinfo.data.mobile);

    //我的账户悬浮窗
    $("#box").hover(function () {
        $("#sml_box").css("display", 'block');
    }, function () {
        $("#sml_box").css("display", 'none');
    });
    //各种点击链接事件，根据2个class名来判断
    $(".skip_fn").on("click", function (e) {
        var _this = $(e.target).parent();
        click_href(_this);
    })
}

//jQuery Easing v1.3
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (0 == b)return c;
        if (1 == (b /= e))return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (0 == b)return c;
        if (1 == (b /= e))return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (0 == b)return c;
        if (2 == (b /= e / 2))return c + d;
        if (g || (g = e * .3 * 1.5), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (a, b, c, d, e) {
        return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
    }
});