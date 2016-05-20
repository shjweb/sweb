/**
 * Created by Administrator on 2016/1/28 0005.
 * author MG
 */
var registerUrl = IPort + "/mbapi/user/register?ts=" + new Date().getTime();
var sendXxCodePath = IPort + "/mbapi/smsValidCode?ts=" + new Date().getTime(); //短信验证码
var sendttcodepath = IPort + "/mbapi/picValidCode?ts=" + new Date().getTime(); //图形验证码

$(document).ready(function() {

	var register_third_bh = {
		sending: false,
		sendtext: "",
		registXieFlag: false,
		eyError: true,
		init: function() {
			var that = this;
			that.validateForm();
			that.sendimgCode();
			that.sendimgCodefn();
			that.sendValidCode();
			that.submitData();
			that.remoteCheckPhone();

			
			$("#channelUid").val(that.getQueryString("baiheID"));
			$("#sign").val(that.getQueryString("sign"));
			//去掉空格
			$("[type=password]").keyup(function() {
				$(this).val($.trim($(this).val()));
			});
			$("#reg_agreement").click(function() {
				that.setRegistXieFlag();
			})
		},
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		},
		sendimgCode: function() { //发送图形验证码
			$.ajax({
				type: "get",
				url: sendttcodepath,
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(response) {
					if (response.code == 200) {
						var _imgurl = response.data.codePic;
						$("#imgcode").attr("src", "data:image/png;base64," + _imgurl);
					} else {}
				},
				error: function(data) {
					console.log(data);
				}
			});
		},
		sendimgCodefn: function() { //重新发送图形验证码
			var that = this;
			$("#imgcode").click(function() {
				that.sendimgCode();
			})

		},
		sendValidCode: function() { //发送短信验证码
			var that = this;

			var sendtext = that.sendtext = "发送验证码";
			$("#get_code_btn").click(function() {

				$.ajax({
					type: "get",
					url: sendXxCodePath + "&mobile=" + $("#phone").val() + "&codeuse=1&verificationCode=" + $("#validcode").val(),
					dataType: "json",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(response) {
						if (response.code == 200) {
							that.sending = true;
							var time = 60;

							var t = setInterval(function() {
								that.sendtext = (time) + "秒后可重发";
								$("#get_code_btn").val(that.sendtext);
								time -= 1;
								if (time <= 0) {
									that.sendtext = "发送验证码";
									that.sending = false;
									$("#get_code_btn").val(that.sendtext);
									clearInterval(t);
								}
							}, 1000);

							$("#show_msg_success").text("验证码发送成功");
							$("#show_msg_error").text("");
						} else {
							$("#show_msg_success").text("");
							$("#show_msg_error").text(response.message);
							that.sendimgCode();
						}
					},
					error: function(data) {
						console.log(data);
					}
				});
			})

		},
		/**
		 * 验证表单
		 */
		validateForm: function() {
			var _this = this;
			$('#register_form').validate({
				ignore: "#invitephone",
				messages: {
					"username": {
						required: "请输入用户名"
					},
					"phone": {
						required: "请输入手机号码"
					},
					"password": {
						required: "请输入密码"
					},
					"repassword": {
						required: "请输入确认密码",
						equalTo: "请再次输入相同的密码"
					},
					"regAgreement": {
						required: '注册本网站必须同意服务协议'
					},
					"phoneCheckCode": {
						required: '请输入验证码'
					}
				},
				submitHandler: function(form, e) {
					if (!$(form).data('submiting')) {
						$(form).data('submiting', true);
						//	_this.saveInfo(form);
						$("#registerAgSpan").click();
					}
					return false;
				},
				success: function(label, element) {
					var parentEle = $(element).parent();
					var errorBox = parentEle.find(".error-pos");
					if ($(element).attr("id") != "invitephone") {
						errorBox.html('');
					}
				},
				errorPlacement: function(error, element) {
					if ($(element).attr("id") != "invitephone") {
						var parentEle = $(element).parent(),
							text = $(error).text();
						var errorBox = parentEle.find(".error-pos");
						errorBox.text(text);
					}
				},
				focusInvalid: false
			});
		},
		submitData: function() {
			var that = this;

			$("#submitBtn").bind("click", function() {
				if ($(this).hasClass("disabled")) {
					return;
				}
				if ($("#register_form").valid()) {
					/*if($('#invitephone').val().length>0){
						if(($('#invitephone').val().length==11||$('#invitephone').val().length==7) && $('#invitephone').attr("data-valid")=="1"){
							//$("#register_form").submit();
							$("#registerAgSpan").click();
						}
					}else{*/
					//$("#register_form").submit();
					that.toRegister();
					//}
				}
			});
		},

		/**
		 * 远程验证手机号
		 */
		remoteCheckPhone: function() {
			var $phone = $('#phone');

			//如果验证通过就显示
			$phone.bind("blur", function() {
				if ($(this).valid()) {
					$("#get_code_btn").show();
					$(".voic_field").show();
				} else {
					$("#get_code_btn").hide();
					$(".voic_field").hide();
				}
			}).bind("keyup", function() {
				if (!$(this).valid()) {
					$("#get_code_btn").hide();
					$(".voic_field").hide();
				} else {
					$(this).parent().find(".error-pos").text('');
				}
			});
		},
		insertDate: function() {
			alert("aaaa");
			var param = {};
			param = $scope.verifyO;
			var urlPath = IPort + "/mbapi/user/register";

			$.ajax({
				type: "get",
				url: urlPath,
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(data) {
					if (data.code == 200) {
						window.location.href = "/html/account_index.html";
					} else {

						$("#registerErrorSpan").text("注册失败：" + data.message);
					}
				},
				error: function(data) {
					console.log(data);
				}
			});

		},
		toRegister: function() { //注册

			console.log("注册");
			var that = this;
			if (that.registXieFlag == true) {
				//that.eyError = true;

				var urlPath = IPort + "/mbapi/user/register";

				$.ajax({
					type: "POST",
					url: urlPath,
					dataType: "json",
					data: $("#register_form").serialize(),
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data) {
						console.log(data);
						if (data.code == 200) {
							window.location.href = "/html/account_index.html";
						} else {

							$("#registerErrorSpan").text("注册失败：" + data.message);
						}
					},
					error: function(data) {
						console.log(data);
					}
				});
			} else {
				//that.eyError = false;
			}
		},
		setRegistXieFlag: function() {
			if (this.registXieFlag == false) {
				this.registXieFlag = true;
			} else {
				$scope.registXieFlag = false;
			}
		}
	}
	register_third_bh.init();
});