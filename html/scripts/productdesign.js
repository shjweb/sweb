/**
 * Created by Administrator on 2016/1/18 0018.
 */
$(document).ready(function () {
    var productdesign = {
        init: function () {
            this.mblistrender();
            this.sanbiao();
        },
        mblistrender: function () {
            var onemonth = common_fn.getMonthDays(1);
            var threemonth = common_fn.getMonthDays(3);
            var sixmonth = common_fn.getMonthDays(6);
            var twelvemonth = common_fn.getMonthDays(12);

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
                        var _li = $(".sec-3-2").find(".con");
                        for (var i = 0; i < data.data.length; i++) {
                            _li.eq(data.data.length - 1 - i).find(".name").html(data.data[i].productName);
                            _li.eq(data.data.length - 1 - i).find(".per").html(data.data[i].interest);
                            _li.eq(data.data.length - 1 - i).find("em.sdqx").html(data.data[i].termRecruit);
                            if (i > 0) {//1月标不可点击
                                _li.eq(data.data.length - 1 - i).find("a").attr("href", "/pages/front/project/mb_detail.html?productId=" + data.data[i].id);
                            }
                        }

                        //起始金额100来渲染页面
                        var _valhtml = 100;

                        _li.eq(0).find(".mon").html((_valhtml * data.data[3].interest / 100 / 365 * twelvemonth).toFixed(2));
                        _li.eq(1).find(".mon").html((_valhtml * data.data[2].interest / 100 / 365 * sixmonth).toFixed(2));
                        _li.eq(2).find(".mon").html((_valhtml * data.data[1].interest / 100 / 365 * threemonth).toFixed(2));
                        //焦点事件，输入数值事件
                        $("#invest_money_input").on("keyup", function () {
                            var _val = $(this).val();
                            $("#show_error").hide().html("");
                            _li.eq(0).find(".mon").html((_val * data.data[3].interest / 100 / 365 * twelvemonth).toFixed(2));
                            _li.eq(1).find(".mon").html((_val * data.data[2].interest / 100 / 365 * sixmonth).toFixed(2));
                            _li.eq(2).find(".mon").html((_val * data.data[1].interest / 100 / 365 * threemonth).toFixed(2));


                        })
                    } else {

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
                        var _html = '<li class="con">' +
                            '<span class="wid-1">周转贷ICP150730ICP150730</span>' +
                            '<span class="wid-2"><img src="../imgs/chanpinwanshanimg/icon_1.png"></span>' +
                            '<span class="wid-3">12.2<i>%</i></span>' +
                            '<span class="wid-4">7万元</span>' +
                            '<span class="wid-5">一个月</span>' +
                            '<span class="wid-6"><span><em style="width:60%"></em></span>' +
                            '<i>60%</i></span>' +
                            '<span class="wid-7"><a href="javascript:;">立即投资</a></span>' +
                            '</li>';

                        for (var i = 0; i < 5; i++) {
                            $("#sanbiaolist").append(_html);
                            $(".wid-1").eq(i+1).html(data.data.list[i].productName);
                            $(".wid-3").eq(i+1).html(data.data.list[i].interest + "<i>%</i>");
                            $(".wid-4").eq(i+1).html(common_fn.outputFloatmoney(data.data.list[i].planAmount));
                            $(".wid-5").eq(i+1).html(data.data.list[i].termRecruit);
                            $(".wid-6").eq(i+1).find("em").css("width", data.data.list[i].progress);
                            $(".wid-6").eq(i+1).find("i").html(parseFloat(data.data.list[i].progress).toFixed(2) + "%");
                            //$(".wid-7").eq(i+1).find("li.style-6").find("p").html(data.data.list[i].progress);

                            var _status = "";
                            if (data.data.list[i].status == 0) {
                                _status = "未开标"
                                $(".wid-7").eq(i+1).find("a").addClass("grey");
                            } else if (data.data.list[i].status == 1) {
                                _status = "投标中"
                                $(".list-2").find("li.style-80").addClass("style-7").removeClass("style-8");
                            } else if (data.data.list[i].status == 2) {
                                _status = "募集结束"
                                $(".wid-7").eq(i+1).find("a").addClass("grey");
                            } else if (data.data.list[i].status == 3) {
                                _status = "满标"
                                $(".wid-7").eq(i+1).find("a").addClass("grey");
                            } else if (data.data.list[i].status == 4) {
                                _status = "还款中"
                                $(".wid-7").eq(i+1).find("a").addClass("grey");
                            } else if (data.data.list[i].status == 5) {
                                _status = "还款结束"
                                $(".wid-7").eq(i+1).find("a").addClass("grey");
                            } else {

                            }
                            $(".wid-7").eq(i+1).find("a").html(_status);
                        }
                    } else {
                        console.log(data);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }

    };
    productdesign.init();

});