/**
 * Created by Administrator on 2016/1/5 0005.
 * author   QQ:190884513
 */
$(document).ready(function () {
    window.userinfo = "";
    window.islogin = false;
    //插入头尾,左侧
    var _headeremplate = $("#header_emplate");
    var _headeremplate_index = $("#header_emplate_index");
    var _footerremplate = $("#footer_emplate");
    var _footerremplate_index = $("#footer_emplate_index");
    var _lefttemplate = $("#left_emplate");


    if (_lefttemplate.length > 0) {
        _lefttemplate.load("/html/left.html", function () {
            var t = setInterval(function () {
                if (userinfo != "") {
                    clearInterval(t);
                    leftFn();
                }
            }, 200);
        });
    }
    if (_headeremplate_index.length > 0) {
        _headeremplate_index.load("/html/header_index.html", function () {
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
        });
    }
    if (_headeremplate.length > 0) {
        _headeremplate.load("/html/header.html", function () {
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
                        successrender();
                    } else {
                        $("#notlogin").show();
                        $("#logined").hide();
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        });
    }


    if (_footerremplate.length > 0) {
        _footerremplate.load("/html/footer.html", function () {
            /*var new_element=document.createElement("script");
             new_element.setAttribute("type","text/javascript");
             new_element.setAttribute("src","../scripts/lib/artdialog/jquery.artDialog.js?skin=hs");
             document.body.appendChild(new_element);*/
            $("#contact_us_btn").bind("click", function () {
                $("#contact_us_dialog").load('contact_us.html', function (req) {
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

            $("#weixin_box_btn").bind("click", function () {

                $("#weixin_gz_dialog").load('weixin_box.html', function (req) {
                    art.dialog({
                        id: 'panel-caculate-1',
                        title: '关注MB官方微信',
                        content: document.getElementById("weixin_gz_dialog"),
                        width: 370,
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
        });
    }
    if (_footerremplate_index.length > 0) {
        _footerremplate_index.load("/html/footer_index.html", function () {
            $("#contact_us_btn").bind("click", function () {
                $("#contact_us_dialog").load('contact_us.html', function (req) {
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


        });
    }

    //左侧边栏
    var leftFn = function () {
        $("#usernameleft").text(userinfo.data.fullName)

        var _mobile = userinfo.data.mobile;
        if (_mobile != undefined) {
            $(".link-box").find("a").eq(0).attr("title", "您已完成手机绑定：" + _mobile);
        }
        var auth = "您还没有开通第三方资金托管账户,<br><a href='/pages/front/ump_open/open_account.html' target='_blank'>点击开通</a>";
        var authDesc = "/pages/front/ump_open/open_account.html";
        if (userinfo.data.authStatus == 1) {
            auth = "您已成功在托管账户开户";
            authDesc = "#";
        }
        $(".link-box").find("a").eq(1).attr("title", auth);
        $(".link-box").find("a").eq(1).attr("href", authDesc);

        var isBindCard = "您还未绑定提现银行卡<br><a href='/pages/front/bankinfo/addBankCard.html'>去绑定</a>";
        var isBindCardDesc = "/pages/front/bankinfo/addBankCard.html";
        if (userinfo.data.isBindCard != 1 && userinfo.data.authStatus == 0) {
            isBindCard = "您还未绑定提现银行卡<br><a href='/pages/front/ump_open/open_account.html'>去绑定</a>";
            isBindCardDesc = "/pages/front/ump_open/open_account.html";
        } else if (userinfo.data.isBindCard == 1) {
            isBindCard = "您已绑定提现银行卡";
            isBindCardDesc = "/pages/front/bankinfo/bank.html";
        } else {
            isBindCard = "您还未绑定提现银行卡<br><a href='/pages/front/bankinfo/addBankCard.html'>去绑定</a>";
            isBindCardDesc = "/pages/front/bankinfo/addBankCard.html";
        }
        $(".link-box").find("a").eq(2).attr("title", isBindCard);
        $(".link-box").find("a").eq(2).attr("href", isBindCardDesc);

        var emailStatus = "没有绑定邮箱 <br><a href='/pages/front/account/auth/email_status.html' >去绑定</a>";
        var emailStatusDesc = "/pages/front/account/auth/email_status.html";
        if (userinfo.data.emailStatus == 1) {
            var email = userinfo.data.email;
            emailStatus = "您已通过邮箱" + (email || "") + "验证<a href='/pages/front/account/auth/email_status.html'></a>";
            emailStatusDesc = "#";
        }
        $(".link-box").find("a").eq(3).attr("title", emailStatus);
        $(".link-box").find("a").eq(3).attr("href", emailStatusDesc);

        var securitystatus = userinfo.data.security;
        var security = "低";
        var percent = "30%";
        if (securitystatus == 2) {
            security = "中";
            percent = "80%";
        } else if (securitystatus == 3) {
            security = "高";
            percent = "100%";
        }
        $("i.dis_block").css("width", percent);
        $(".security").find("i").text(security);

        $("#keyongjine").html(userinfo.data.availableAmount == null ? '0.00' : common_fn.outputFloatmoney(userinfo.data.availableAmount.toFixed(2), "float"));

        $.ajax({
            type: "get",
            url: IPort + "/mbapi/user/authUserInfo?ts=" + new Date().getTime(),
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (data) {
                if (data.code == "200") {
                    if(data.data.regChannel=="baihe"){
                        $("#lovebankleft").show();
                    }
                } else {
                }
            },
            error: function (data) {
                console.log(data);
            }
        });

        $(".skip_fn").on("click", function (e) {
            var _this = $(e.target);
            click_href(_this);
        });

        $('.ToolTips').tooltipster({
            animation: 'shake',
            contentAsHTML: true,
            interactive: true,
            theme: "tooltipster-info"
        });

    };

    //头部如果用户登录进行的渲染
    var successrender = function () {
        $("#logined").show();
        $("#notlogin").hide();
        $(".head-message-nums").html(userinfo.data.messageUnreadAounts);
        $(".head-investIncome").html(userinfo.data.totalInterest);
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

    var click_href = function (_this) {
        if (islogin == true) {
            //登录状态
            if (_this.hasClass("chargeBtn")) {//--充值
                if (userinfo.data.authStatus != 1) {//联动未开户
                    window.location.href = "/pages/front/ump_open/open_account.html";
                } else {
                    window.location.href = "/pages/front/account/fund/recharge_new.html";
                }
            } else if (_this.hasClass("bankList")) {//--银行信息
                if (userinfo.data.authStatus != 1) {//联动未开户
                    window.location.href = "/pages/front/ump_open/open_account.html";
                } else {
                    window.location.href = "/pages/front/bankinfo/bank.html";
                }
            } else if (_this.hasClass("transFlow")) {//--资产交易流水
                window.location.href = "/pages/front/account/log/fund.html";
            } else if (_this.hasClass("sysMsgs")) {//--消息中心
                window.location.href = "/pages/front/account/user/system_messages.html";
            } else if (_this.hasClass("investRecord")) {//--投资记录
                window.location.href = "/pages/front/account/log/investment.html";
            } else if (_this.hasClass("myAccount")) {//--我的账户
                window.location.href = "/html/account_index.html";
            } else if (_this.hasClass("couponList")) {//--优惠券
                window.location.href = "/pages/front/account/log/coupon.html";
            } else if ($(this).hasClass("promoReward")) {//--邀请好友
                window.location.href = "/pages/front/account/log/promotion_reward.html";
            } else if (_this.hasClass("cashInBtn")) {//--提现
                if (userinfo.data.authStatus != 1) {//联动未开户
                    window.location.href = "/pages/front/ump_open/open_account.html";
                } else if (userinfo.data.isBindCard != 1) {//未绑卡
                    window.location.href = "/pages/front/bankinfo/addBankCard.html";
                } else {
                    window.location.href = "/pages/front/account/fund/cashIn.html";
                }
            } else if (_this.hasClass("logoutBtn")) {
                $.ajax({
                    type: "get",
                    url: IPort + "/mbapi/user/logout?ts=" + new Date().getTime(),
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (data) {
                        if (data.code == "200") {
                            window.location.href = "/html/login.html";
                        } else {
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            } else if (_this.hasClass("chargeBtn")) {

            }
        } else {
            //未登录
            window.location.href = "/html/login.html";
        }
    }
});