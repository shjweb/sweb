/**
 * Created by Administrator on 2016/1/25.
 */
$(document).ready(function(){
    var questionList={
        init:function(){
            //选项卡一
            this.tabs();
            this.toggleTab();
            //鼠标滑过显示title框
            this.toggleShow();
            this.zanBg();
        },
        tabs:function(){
            $('.contentTitleBd > li').click(function(){
                $(this).addClass('tabActive').siblings().removeClass('tabActive');
                $(this).parent().siblings("div").eq($(this).index()).show().siblings('div').hide();
            })
        },
        toggleTab:function(){

            $(".tabs li").on("click",function(){
                var tabtitle = $(this).data("tabs");
                $(this).parent().find('li').removeClass('on');

                $(this).addClass("on");
                $(this).parent().next().find('ul').hide();
                $(this).parent().next().find("."+tabtitle).show();
            })
        },
        toggleShow:function(){
            $('.tip').hover(function(){
                var h=$(this).offset().top +$(this).height()-$(".zh_mainInfo").offset().top;
                var l=$(this).offset().left-$(".zh_mainInfo").offset().left-$(this).innerWidth()/2;

                $('.tipTitp').css({"top":h+"px","left":l+"px"});
                $('.tipTitp').show();
            },function(){
                $('.tipTitp').hide();
            })
            $('.tipTitp').hover(function(){
                $(this).show();
            },function(){
                $(this).hide();
            })

        },
        zanBg:function(){
            $(".zanBg").click(function(){
                if(!$(this).hasClass("on")){

                    $(this).find("em").html(parseInt($(this).find("em").html()) +1);
                    $(this).addClass("on");
                }

            })
        }
    }
    questionList.init();
})