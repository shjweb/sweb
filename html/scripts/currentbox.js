/**
 * Created by Administrator on 2016/1/20 0020.
 */
$(document).ready(function () {
    var currentbox = {
        //初始化
        init: function () {
            //活期宝盒数据统计
            this.render_top();
            //"我的收益"渲染
            this.mygetingrender();
            //tab效果
            this.tabqiehuan();
            //认购记录
            this.rengoujilu();
            //赎回记录
            this.shuhuijilu();
            //奖息记录
            this.jiangxijilu();
            //七日年化收益率
            //this.sevendays();
            //记录提示框
            this.notestip();
            //合同


        },
        render_top: function () {
            var _param = {};
            $.ajax({
                type: "post",
                url: IPort + "/mbapi/user/userDemandBasicData?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (args) {
                    if (args.code == "200") {
                        if ($.isEmptyObject(args.data)) {
                            console.log("2.103接口后台返回空数据，请联系后台人员");
                        } else {
                            $("#hq_01").find("li").eq(0).find("p:last").text(args.data.totalPrincipal);
                            $("#hq_01").find("li").eq(1).find("p:last").text(args.data.totalUserProfit);
                            $("#hq_01").find("li").eq(2).find("p:last").text(args.data.currentHold);
                            $("#hq_01").find("li").eq(3).find("p:last").text(args.data.dueInEarnings);
                            $("#hq_01").find("li").eq(4).find("p:last").text(args.data.earningsYsd);

                        }
                    } else  if(args.code == "499"){
												window.location.href = "/pages/front/login.html?callbackurl="+document.location.href;
										}else{
                        console.log(args.message);
                    }
                },
                error: function (args) {
                    console.log("服务器错误，ajax发生error错误或者timeout");
                }
            });
        },
        mygetingrender: function () {
            var _n = "";
            var _j = "";

            var _param = {};
            $.ajax({
                type: "post",
                url: IPort + "/mbapi/product/demandBasicData?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (args) {
                    if (args.code == "200") {
                        if ($.isEmptyObject(args.data)) {
                            console.log("2.102接口后台返回空数据，请联系后台人员");
                        } else {
                            _n = parseFloat(args.data.aldYldTdyProduct / 100).toFixed(2);
                            _j = parseFloat(args.data.award / 100).toFixed(2);
                            window.aldYldTdyProduct = args.data.aldYldTdyProduct;
                            window.demandProductId = args.data.demandProductId;
                            currentbox.sevendays();
                        }
                    } else  if(args.code == "499"){
												window.location.href = "/pages/front/login.html?callbackurl="+document.location.href;
										}else{
                        console.log(args.message);
                    }
                },
                error: function (args) {
                    console.log("服务器错误，ajax发生error错误或者timeout");
                }
            });
            //计算器
            //X按钮
            $(".close").on("click", function () {
                $(this).siblings("input").val("");
            });

            $("#amountVal").on("keyup", function () {
                var _val = $(this).val();
                if (_val > 50000) {
                    $(this).val("50000")
                    $("#rengouerrormsg").show();
                } else {
                    $("#rengouerrormsg").hide();
                }
            });

            $("#askId").on("hover", function () {
                $(".send").toggle();
            });

            //开始计算按钮
            $(".count").on("click", function () {
                $(".income").show();
                var _a = $("#amountVal").val();
                var _b = $("#daysVal").val();
                var _r = $(".award");
                var _result = "";
                if (_b < 90) {
                    _r.hide();
                    //_result = _a*_n/365*90;

                } else {
                    _result = parseFloat(_a * _j / 365 * 90 * parseInt(_b / 90)).toFixed(2);
                    _r.show();
                    $(".award").find("i").text(_result);
                }
                $(".money").text(parseFloat(_a * _n / 365 * _b).toFixed(2));
            });


        },
        tabqiehuan: function () {
            $(".tab-tit").find("li").on("click", function () {
                if ($(this).hasClass("on")) {
                    return
                } else {
                    $(this).addClass("on").siblings("li").removeClass("on");
                    $(".tab-con").eq($(this).index()).show().siblings(".tab-con").hide();
                }

            })
        },
        rengoujilu: function () {
            var _param = {};
            $.ajax({
                type: "post",
                url: IPort + "/mbapi/product/demandSubRecord?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (args) {
                    if (args.code == "200") {
                        if ($.isEmptyObject(args.data.list)) {
                            console.log("认购记录后台返回空数据，请联系后台人员");
                        } else {
                            var _html = "<tr>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td><a href='javascript:void(0)' class='hetong' target='_blank' style='color: #00ADEE'>查看合同》</a></td>" +
                                "</tr>";
                            var _box = $("#rengoujilu");
                            for (var i = 0; i < args.data.list.length; i++) {
                                _box.append(_html);
                                var _trlast = _box.find("tr:last")
                                var _productName = args.data.list[i].productName || "";
                                _trlast.find("td").eq(2).text(_productName);
                                var _investAmount = args.data.list[i].investAmount || "";
                                if (_investAmount != "") {
                                    _investAmount = common_fn.outputFloatmoney(_investAmount, "float");
                                }
                                _trlast.find("td").eq(1).text(_investAmount);
                                var _investTime = args.data.list[i].investTime || "";
                                if (_investTime != "") {
                                    _investTime = common_fn.timecycle(args.data.list[i].investTime, 'yyyy-MM-dd HH:mm:ss')
                                }
                                _trlast.find("td").eq(0).text(_investTime);
                                var _status = args.data.list[i].subscriptionStatus;
                                switch (_status) {
                                    case 0:
                                        _status = "投资中";
                                        break;
                                    case 1:
                                        _status = "成功";
                                        break;
                                    case 2:
                                        _status = "失败";
                                        break;
                                    default:
                                        _status = "";
                                }
                                _trlast.find("td").eq(3).text(_status);

                                _trlast.find("td").eq(4).find("a").attr("href", args.data.list[i].contractUrl);
                            }

                        }
                    } else  if(args.code == "499"){
												window.location.href = "/pages/front/login.html?callbackurl="+document.location.href;
										}else{
                        console.log(args.message);
                    }
                },
                error: function (args) {
                    console.log("服务器错误，ajax发生error错误或者timeout");
                }
            });
        },
        shuhuijilu: function () {
            var _param = {};
            $.ajax({
                type: "post",
                url: IPort + "/mbapi/product/demandRedeemRecord?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (args) {
                    if (args.code == "200") {
                        if ($.isEmptyObject(args.data.list)) {
                            console.log("赎回后台返回空数据，请联系后台人员");
                        } else {
                            var _html = "<tr>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td><a href='javascript:void(0)' class='hetong' target='_blank' style='color: #00ADEE'>查看合同》</a></td>" +
                                "</tr>";
                            var _box = $("#shuhuijilu");
                            for (var i = 0; i < args.data.list.length; i++) {
                                _box.append(_html);
                                var _trlast = _box.find("tr:last");
                                var _redeemTime = args.data.list[i].redeemTime || "";
                                if (_redeemTime != "") {
                                    _redeemTime = common_fn.timecycle(args.data.list[i].redeemTime, 'yyyy-MM-dd HH:mm:ss');
                                }

                                _trlast.find("td").eq(0).text(_redeemTime);
                                var _redeemAmount = args.data.list[i].redeemAmount || "";
                                if (_redeemAmount != "") {
                                    _redeemAmount = common_fn.outputFloatmoney(args.data.list[i].redeemAmount, "float");
                                }

                                _trlast.find("td").eq(1).text(_redeemAmount);
                                var _redeemFee = args.data.list[i].redeemFee || "0";
                                _trlast.find("td").eq(2).text(_redeemFee);
                                var _status = args.data.list[i].redeemStatus;
                                if (_status == "未支付" || _status == "受理中") {
                                    _status = "受理中";
                                }
                                _trlast.find("td").eq(3).text(_status);
                                var _actualAmount = args.data.list[i].actualAmount || "";
                                if (_actualAmount != "") {
                                    _actualAmount = common_fn.outputFloatmoney(args.data.list[i].actualAmount, "float");
                                }
                                _trlast.find("td").eq(4).text(_actualAmount);
                                /*var _redeemReturnTime = args.data.list[i].redeemReturnTime || "";
                                if (_redeemReturnTime != "") {
                                    _redeemReturnTime = common_fn.timecycle(args.data.list[i].redeemReturnTime, 'yyyy-MM-dd HH:mm:ss');
                                }
                                _trlast.find("td").eq(5).text(_redeemReturnTime);*/
                                _trlast.find("td").eq(5).find("a").attr("href", args.data.list[i].contractUrl);
                            }
                        }
                    } else {
                        console.log(args.message);
                    }
                },
                error: function (args) {
                    console.log("服务器错误，ajax发生error错误或者timeout");
                }
            });
        },
        jiangxijilu: function () {
            var _param = {};
            $.ajax({
                type: "post",
                url: IPort + "/mbapi/product/demandRewardRecored?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (args) {
                    if (args.code == "200") {
                        if ($.isEmptyObject(args.data.list)) {
                            console.log("奖息后台返回空数据，请联系后台人员");
                        } else {
                            var _html = "<tr>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "</tr>";
                            var _box = $("#jiangxijilu");
                            for (var i = 0; i < args.data.list.length; i++) {
                                _box.append(_html);
                                var _trlast = _box.find("tr:last")
                                _trlast.find("td").eq(0).text(common_fn.timecycle(args.data.list[i].rewardInterestBeginTime, 'yyyy-MM-dd'));
                                _trlast.find("td").eq(1).text(common_fn.timecycle(args.data.list[i].rewardInterestEndTime, 'yyyy-MM-dd'));
                                _trlast.find("td").eq(2).text(args.data.list[i].rewardCycle);
                                _trlast.find("td").eq(3).text(common_fn.outputFloatmoney(args.data.list[i].holdPrincipalDays, "float"));
                                _trlast.find("td").eq(4).text(common_fn.outputFloatmoney(args.data.list[i].rewardInterestAmount, "float"));
                            }
                        }
                    } else {
                        console.log(args.message);
                    }
                },
                error: function (args) {
                    console.log("服务器错误，ajax发生error错误或者timeout");
                }
            });
        },
        sevendays: function () {
            var _param = {};
            _param.demandProductId = demandProductId;
            $.ajax({
                type: "post",
                url: IPort + "/mbapi/data/weekRate?ts=" + new Date().getTime(),
                dataType: "json",
                data: _param,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (args) {
                    if (args.code == "200") {
                        if ($.isEmptyObject(args.data)) {
                            console.log("七日年化收益率后台返回空数据，请联系后台人员");
                        } else {
                            var arrayDateArray = [];
                            var arrayRateArray = [];
                            if (args.data.rates != null) {
                                var rates = args.data.rates;
                                var j = rates.length;
                                for (var i = 0; i < rates.length; i++) {
                                    j--;
                                    var arraySon = rates[i].split(':');
                                    arrayDateArray[j] = arraySon[0];
                                    arrayRateArray[j] = arraySon[1] - 0;
                                }
                            }

                            arrayDateArray.splice(0, 1);
                            arrayRateArray.splice(0, 1);
                            var max = arrayRateArray[0];
                            for (var i = 1; i < arrayRateArray.length; i++) {
                                if (max < arrayRateArray[i]) {
                                    max = arrayRateArray[i];
                                }
                            }
                            var min = arrayRateArray[0];
                            for (var i = 1; i < arrayRateArray.length; i++) {
                                if (min > arrayRateArray[i]) {
                                    min = arrayRateArray[i];
                                }
                            }
                            max += 0.5;
                            min -= 0.5;
                            highCharts(arrayDateArray, arrayRateArray, max, min);
                        }
                    } else {
                        console.log(args.message);
                    }
                },
                error: function (args) {
                    console.log("服务器错误，ajax发生error错误或者timeout");
                }
            });
        },
        notestip: function () {
            $(".w").hover(function () {
                var _index = $(".on").index();
                if (_index == 0) {
                    $(".rgsend").show();
                } else if (_index == 1) {
                    $(".rgsend_2").show();
                } else if (_index == 2) {
                    $(".rgsend_1").show();
                }
            }, function () {
                $(".rgsend").hide();
                $(".rgsend_1").hide();
                $(".rgsend_2").hide();
            })
        }
    };
    //方法执行
    currentbox.init();

});


function highCharts(arrayDateArray, arrayRateArray, max_data, min_data) {
    var arrayNewDateArray = arrayDateArray;
    for (var i = 0; i < arrayNewDateArray.length; i++) {
        var arys1= new Array();
        arys1=arrayNewDateArray[i].split('-');     //日期为输入日期，格式为 2013-3-10
        var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
        var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        var week = weekArray[ssdate.getDay()];//
        arrayNewDateArray[i]=week+"<br/>"+arrayNewDateArray[i]
    }

    $(function () {
        $('#container').highcharts({
            colors: ['#1a9df9'],
            chart: {
                height: 450,
                backgroundColor:"#ffffff",
                reflow: true,
                type: 'spline',
                className:"highchartsbg"
            },
            title: {
                text: '最近七日年化收益率（%）',
                style: {
                    /*color: '#FF00FF',
                     fontWeight: 'bold'*/
                    /*   height: 50,
                     lineHeight: 50,
                     verticalAlign: 'middle',
                     marginTop: 10*/
                }
            },
            credits: {
                enabled: false // 禁用版权信息
            },
            xAxis: [{
                // lineColor: '#f98f1c',
                //lineWidth: 1,
                startOnTick: true,
                categories: arrayNewDateArray,

            }, {
                linkedTo: 0,
                opposite: true,
                categories: arrayRateArray,
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            }],
            yAxis: {
                //  lineColor: '#f98f1c',
                //lineWidth: 1,
                title: {
                    text: null
                },
                min: min_data,
                max: max_data,
                floor: 0,
                ceiling: 15,
                minorTickInterval: 1,
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                },
                plotBands: [{ // Light air
                    from: 6.0,
                    to: 6.25,
                    color: '#f5f5f5'
                }, { // Light breeze
                    from: 6.5,
                    to: 6.75,
                    color: '#f5f5f5'
                }, { // Gentle breeze
                    from: 7,
                    to: 7.25,
                    color: '#f5f5f5'
                }, { // Moderate breeze
                    from: 7.5,
                    to: 7.75,
                    color: '#f5f5f5'
                }, { // Fresh breeze
                    from: 8,
                    to: 8.25,
                    color: '#f5f5f5'
                }, { // Strong breeze
                    from: 8.5,
                    to: 8.75,
                    color: '#f5f5f5'
                }, { // High wind
                    from: 9,
                    to: 9.25,
                    color: '#f5f5f5'
                }, { // High wind
                    from: 9.5,
                    to: 9.75,
                    color: '#f5f5f5'
                }, { // High wind
                    from: 10,
                    to: 10.25,
                    color: '#f5f5f5'
                }, { // High wind
                    from: 10.5,
                    to: 10.75,
                    color: '#f5f5f5'
                }, { // High wind
                    from: 11,
                    to: 11.25,
                    color: '#f5f5f5'
                }, { // High wind
                    from: 11.5,
                    to: 11.75,
                    color: '#f5f5f5'
                }, { // High wind
                    from: 12,
                    to: 12.25,
                    color: '#f5f5f5'
                }]
            },
            tooltip: {
                formatter: function () {
                    return this.y + '%';
                },
                crosshairs: {
                    width: 2,
                    color: '#1a9df9',
                    dashStyle: 'shortdot'
                },
                valueDecimals: 2,
                shadow: true,
                borderWidth: 1,
                borderColor: '#1a9df9',
                backgroundColor: '#fff'

            },
            plotOptions: {},
            series: [{
                name: '年化收益率（%）',
                data: arrayRateArray
            }]
            ,
            legend: {
                enabled: false //关闭下角标签

            },
            exporting: {
                enabled: false //导出模块不可用
            },
            navigation: {
                menuItemStyle: {
                    fontSize: '54px'
                }
            }
        });
    });
}