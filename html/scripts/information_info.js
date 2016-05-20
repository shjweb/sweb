/**
 * Created by Administrator on 2016/1/22
 * author MG   QQ:286204694
 */
$(document).ready(function () {
    var informationInfo = {
    	init: function(){
    		this.toggleTab();
    		this.upvote();
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
    	upvote:function(){
    		$(".upvote span").on("click",function(){
    			if(!$(this).hasClass('active')){
	    			var num = parseInt($(".upvote").find("em").html());
	    			$(".upvote em").html(num+1);
	    			$(this).addClass("active");
    			}
    		})
    	}
    };
    
    informationInfo.init();
  })