/**
 * Created by Administrator on 2016/1/5 0005.
 * author MGY   QQ:190884513
 */
$(document).ready(function () {
    var login = {
        init: function () {
            //获取图片验证码
            this.getmageerification();
            //图片验证码点击事件
            this.imagecheckingcodelickevent();
            //登录按钮事件ajax
            this.loginhandler();
            //第三方登陆
            this.thirdlogin();
            //placehoder  ie 兼容
            this.placeholder();
        },
        getmageerification: function () {
            var _url = IPort + "/mbapi/picValidCode?ts=" + common_fn.getrandomnum();
            $.ajax({
                type: 'get',
                url: _url,
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: true
                },
                success: function (args) {
                    try {
                        if (args.code == "200") {
                            //success
                            var _imgurl = args.data.codePic;
                            var _imgtok = args.data.picToken;
                            $("#imagecheckingcode").attr("src", "data:image/png;base64," + _imgurl);
                            $("#imagecheckingcode").attr("data-imgtok", _imgtok);
                        } else {
                            alert(args.message);
                            console.log(args);
                        }
                    } catch (e) {
                        alert("获取图片验证码失败，数据异常");
                    }
                },
                error: function () {
                    alert("获取图片验证码失败，服务器错误");
                    console.log("获取图片验证码失败，服务器错误");
                }
            });
        },
        imagecheckingcodelickevent: function () {
            $("#imagecheckingcode").on("click", function () {
                login.getmageerification();
            })
        },
        loginhandler: function () {
            $("#sub_login").on("click", function () {
                var _url = IPort + "/mbapi/user/login?ts=" + common_fn.getrandomnum();
                var _param = {};
                _param.terminal = "PC";
                _param.channel = "";
                _param.action = "";
                _param.channelUid = "";
                _param.mobile = $("#username").val() || "";
                _param.password = $("#password").val() || "";
                _param.verificationCode = $("#checkingcode").val() || "";
                _param.picToken = $("#imagecheckingcode").attr("data-imgtok") || "";

                $.ajax({
                    type: 'get',
                    url: _url,
                    data: _param,
                    contentType: 'text/plain',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (args) {
                        //try {
                            if (args.code == "200") {
                                //success
                                $(".error-box").hide().html("");
                                var callbackurl = common_fn.getQueryString("callbackurl");
                                if (callbackurl != null) {
                                    window.location.href = callbackurl;
                                } else {
                                    window.location.href = "/html/account_index.html";
                                }
                            } else {
                                $(".error-box").show().html(args.message);
                                login.getmageerification();
                                /*alert(args.message);
                                 console.log(args);*/
                            }
                       /* } catch (e) {
                            alert("登录失败，数据异常");
                            login.getmageerification();
                        }*/
                    },
                    error: function () {
                        alert("登录失败，服务器错误");
                        console.log("登录失败，服务器错误");
                    }
                });
            })
        },
        thirdlogin: function () {
            $("#bhlogin").on("click", function () {
                var _url = IPort + "/ mbapi/user/thirdLogin?ts=" + common_fn.getrandomnum();
                var _param = {};
                _param.terminal = "PC";
                _param.channel = "baihe";
                _param.action = "";
                _param.channelUid = "";

                $.ajax({
                    type: 'get',
                    url: _url,
                    data: _param,
                    contentType: 'text/plain',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (args) {
                        try {
                            if (args.code == "200") {
                                //success
                                window.location.href = args.data;
                            } else {
                                alert(args.message);
                                console.log(args);
                            }
                        } catch (e) {
                            alert("登录失败，数据异常");
                            login.getmageerification();
                        }
                    },
                    error: function () {
                        alert("登录失败，服务器错误");
                        console.log("登录失败，服务器错误");
                    }
                });
            })
        },
        placeholder: function () {
            var JPlaceHolder = {
                //检测
                _check: function () {
                    return 'placeholder' in document.createElement('input');
                },
                //初始化
                init: function () {
                    if (!this._check()) {
                        this.fix();
                    }
                },
                //修复
                fix: function () {
                    jQuery(':input[placeholder]').each(function (index, element) {
                        var self = $(this), txt = self.attr('placeholder');
                        self.wrap($('<div></div>').css({
                            position: 'relative',
                            zoom: '1',
                            border: 'none',
                            background: 'none',
                            padding: 'none',
                            margin: 'none',
                            display:"inline-block"
                        }));
                        var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
                        var holder = $('<span></span>').text(txt).css({
                            position: 'absolute',
                            left: pos.left,
                            top: pos.top,
                            height: h+"px",
                            lineHeight: h+"px",
                            paddingLeft: paddingleft,
                            color: '#aaa'
                        }).appendTo(self.parent());
                        self.focusin(function (e) {
                            holder.hide();
                        }).focusout(function (e) {
                            if (!self.val()) {
                                holder.show();
                            }
                        });
                        holder.click(function (e) {
                            holder.hide();
                            self.focus();
                        });
                    });
                }
            };
            //执行
            jQuery(function () {
                JPlaceHolder.init();
            });
        }
    }
    login.init()
});
