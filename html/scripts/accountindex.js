/**
 * Created by Administrator on 2016/2/21 0005.
 * author zhangjinying
 */
$(document).ready(function () {
    var index = {
        init: function () {
            //账户认证状态
            this.userInfo();
            //优惠卷个数
            this.couponNum();
            //用户资金信息
            this.userInfoAmount();
            //用户资金图表
            this.userInfoCharts();
            //右侧边栏
            this.sidebar();
        },
        userInfo: function () {
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/user/userInfo?ts=" + new Date().getTime(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (rs) {
                    if (rs.code == 200) {
                        var userInfo=rs.data;
                        //认证状态
                        var payUserId = userInfo.payUserId;
                        var userName = userInfo.name;
                        var mobile = userInfo.mobile;
                        var idCard = userInfo.idcard;
                        var yue = userInfo.availableAmount;
                        if(userInfo.authStatus==1){
                            var _statusHtml=
                                 "<table>"
                                 + "<tbody>"
                                 + "<tr>"
                                 + "<td colspan='2'>流水账号：<span class='colordbbc6a'>"+payUserId+"</span></td>"
                                 + "</tr>"
                                 + "<tr>"
                                 + "<td>用户名：<span class='colordbbc6a'>"+userName+"</span></td>"
                                 + "<td>手机认证：<span class='colordbbc6a'>"+mobile+"</span></td>"
                                 + "</tr>"
                                 + "<tr>"
                                 + "<td>身份证号：<span class='colordbbc6a'>"+idCard+"</span></td>"
                                 + "<td>账户余额：<span class='colordbbc6a'>"+yue+"</span></td>"
                                 + "</tr>"
                                 + "</tbody>"
                                 + "</table>";
                            $("#aopen-contId").html(_statusHtml);
                        }else if(userInfo.authStatus==0){
                            //认证状态
                            $(".acc-notopen").show();
                            $(".acc-open").hide();
                        }
                    } else {
                        //认证状态
                        $(".acc-notopen").show();
                        $(".acc-open").hide();
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        couponNum: function () {
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/user/userInfo?ts=" + new Date().getTime(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (rs) {
                    if (rs.code == 200) {
                        //优惠卷个数
                        $(".rednumcoupon").html(rs.data.couponAounts);//优惠卷个数
                        $(".rednum").html(rs.data.messageUnreadAounts);//未读信息个数

                    } else {
                        //优惠卷个数
                        $(".rednumcoupon").html(0);//优惠卷个数
                        $(".rednum").html(0);//未读信息个数
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        userInfoAmount: function () {
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/user/userInfo?ts=" + new Date().getTime(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (rs) {
                    if (rs.code == 200) {
                        //账户余额
                        $("#earnings").html(outputFloatmoney(rs.data.expectedEarningsByMonth));//预期收益
                        $("#totalMoney").html(outputFloatmoney(rs.data.totalMoney));    //总资产
                        $("#experienceAmount").html(outputmoney(rs.data.experienceAmount));//体验金
                        $("#totalInterest").html(outputFloatmoney(rs.data.totalInterest));//累计收益

                    } else {
                        //账户余额
                        $("#earnings").html(0);//预期收益
                        $("#totalMoney").html(0);    //总资产
                        $("#experienceAmount").html(0);//体验金
                        $("#totalInterest").html(0);//累计收益
                    }
                    //不保留小数，每三位一个逗号
                    function outputmoney(number) {
                        number = String(number);
                        number = number.replace(/\,/g, "");
                        if (isNaN(number) || number == "")return "";
                        number = Math.round(number * 100) / 100;
                        if (number < 0) {
                            return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
                        } else {
                            //return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
                            return outputdollars(Math.floor(number - 0) + '');
                        }
                    }
                    //保留小数，每三位一个逗号
                    function outputFloatmoney(number) {
                        number = String(number);
                        number = number.replace(/\,/g, "");
                        if (isNaN(number) || number == "")return "";
                        number = Math.round(number * 100) / 100;
                        if (number < 0) {
                            return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
                        } else {
                            return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
                            return outputdollars(Math.floor(number - 0) + '');
                        }
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        userInfoCharts: function () {
            $.ajax({
                type: "get",
                url: IPort + "/mbapi/user/userInfo?ts=" + new Date().getTime(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (rs) {
                    if (rs.code == 200) {
                        //账户图表
                        var mapData = rs.data;
                        var totalMoney = mapData.totalMoney;//总资产
                        var availableAmount = mapData.availableAmount;//可用余额
                        var frozenAmount = mapData.frozenAmount; //冻结金额
                        var repayInterest = mapData.repayInterest; //待收收益
                        var repayPrincipal = mapData.repayPrincipal;//待收本金
                        var
                            CPi = totalMoney / 120,//改的是这里 原来是160
                            PXye = availableAmount / CPi,//可用余额
                            PXdsbj = repayPrincipal / CPi,//待收本金
                            PXdslx = repayInterest / CPi,//待收利息
                            PXdj = frozenAmount / CPi;//冻结金额

                        var _html = '<div class="assets-group">'
                            + '<div class="assets-entry">'
                            + '<div class="items">'
                            + '<div class="tracker" style="height:' + PXye + 'px">'
                            + '<div class="money">¥' + availableAmount + '</div>'  //可用余额
                            + '<div class="perbar" style="background:#dbbc6a"></div>'
                            + '</div>'
                            + '<h2>可用余额</h2>'
                            + '</div>'

                            + '<div class="items">'
                            + '<div class="tracker"  style="height:' + (PXdsbj + PXye) + 'px">'
                            + '<div class="money">¥' + repayPrincipal + '</div>'    //待收本金
                            + '<div class="perbar" style="background:#b7a573" ></div>'
                            + '<div class="fillbar" style="height:' + PXye + 'px"></div>'
                            + '</div>'
                            + '<h2>待收本金</h2>'
                            + '</div>'

                            + '<div class="items">'
                            + '<div class="tracker" style="height:' + (PXdslx + PXdsbj + PXye) + 'px">'
                            + '<div class="money">¥' + repayInterest + '</div>'//待收利息
                            + '<div class="perbar" style="background:#b7a573" ></div>'
                            + '<div class="fillbar" style="height:' + (PXdsbj + PXye) + 'px"></div>'
                            + '</div>'
                            + '<h2>待收收益</h2>'
                            + '</div>'

                            + '<div class="items">'
                            + '<div class="tracker"  style="height:' + (PXdj + PXdslx + PXdsbj + PXye) + 'px">'
                            + '<div class="money">¥' + frozenAmount + '</div>'//冻结金额
                            + '<div class="perbar" style="background:#b7a573" ></div>'
                            + '<div class="fillbar" style="height:' + (PXdslx + PXdsbj + PXye) + 'px"></div>'
                            + '</div>'
                            + '<h2>冻结金额</h2>'
                            + '</div>'

                            + '<div class="items last" >'
                            + '<div class="tracker" style="height:' + (PXdj + PXdslx + PXdsbj + PXye) + 'px">'
                            + '<div class="money">¥' + totalMoney + '</div>'//账户总资产
                            + '<div class="perbar" style="background:#dbbc6a"></div>'
                            + '</div>'
                            + '<h2>账户总资产</h2>'
                            + '<div class="line"></div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '<div class="assets-sum">'
                            + '<ul class="items">'
                            + '<li><span class="txt">可用余额</span><span class="num">¥' + availableAmount + '</span></li>'
                            + '<li><span class="txt">待收总额</spRan><span class="num">+¥' + (repayPrincipal + repayInterest) + '</span></li>'
                            + '<li><span class="txt">冻结总额</span><span class="num">+¥' + frozenAmount + '</span></li>'
                            + '</ul>'
                            + '<div class="sums"><span class="txt">账户总资产</span><span class="num">¥' + totalMoney + '</span></div>'
                            + '</div>';
                        $('#assetsStatistics').html(_html);
                    } else {

                        //账户图表
                        $('#assetsStatistics').html('<div class="record" style="color:#c00">文件加载出错，请重试!</div>');
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },
        sidebar: function () {
            $("#mbplanecalc,#sbcalc").on("click", function () {

                var _url = $(this).attr("data-url")||"";
                $("#caculate_box_dialog").load(_url, function(req){
                    var dlg=art.dialog({
                        id: 'panel-caculate-1',
                        title: '利息计算器',
                        content: document.getElementById("caculate_box_dialog"),
                        width: 646,
                        height:'auto',
                        lock:true,
                        drag:false,
                        resize:false,
                        left:"50%",
                        top:"50%",
                        button: []
                    });
                    $("input[name=money]").focus();

                });
            });
        }

    };
    index.init();

});