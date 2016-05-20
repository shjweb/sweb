/**
 * Created by Administrator on 2016/1/22
 * author MG   QQ:286204694
 */
$(document).ready(function () {
    var informationList = {
    	init: function(){
    		this.toggleTab();
    	},
    	
    	toggleTab:function(){
    		
    		$(".tabs li").on("click",function(){
    			var tabtitle = $(this).data("tabs");
    			$(this).parent().find('li').removeClass('on');
    			
    			$(this).addClass("on");
    			$(this).parent().next().find('ul').hide();
    			$(this).parent().next().find("."+tabtitle).show();
    		})
    	}
    };
    
    informationList.init();
  })