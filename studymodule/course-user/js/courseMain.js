

	
		$(document).on('mouseenter', '.all-course-tab', function() { 
			
			$(".all-course-tab").removeAttr("style"); //ie,ff均支持
			
			$(".all-course-tab").css("min-height","100%")
		 });
		 $(document).on('mouseleave', '.all-course-tab', function() { 
			
			$(".all-course-tab").removeAttr("style"); //ie,ff均支持
			
			$(".all-course-tab").css("height","100%")
 		});
		layui.use('carousel', function(){
			var carousel = layui.carousel;
			//建造实例
			carousel.render({
				elem: '#test1'
				,width: '100%' //设置容器宽度
				,arrow: 'always' //始终显示箭头
				,height:'341px'
				//,anim: 'updown' //切换动画方式:
				//,indicator:'none'
				,autoplay:false
			});
			});
		$.ajax({
              url:"/seeyon/learnResource.do?method=findBestCouser&pageSize=5&page=1&type=1",
              type:"get",
              
              success:function(data){
				
				
				var video =JSON.parse(data)
				var code=video.code
				if(code==0){
					app.hotAll=video.data;
				}else{
					alert(video.msg)
				}
				 
              },
			});
			//首页导航链接
			$.ajax({
              url:"/seeyon/coursecategory.do?method=getAllCategoryTree",
              type:"get",
              
              success:function(data){
				app.menu=data
				
              },
			});
			//首页个人信息
			$.ajax({
              url:"/seeyon/userlayoutController.do?method=userData",
              type:"get",
              
              success:function(data){
				var video =JSON.parse(data)
				var code=video.code
				if(code==0){
					app.member=video.data;
				}else{
					alert(video.msg)
				}
				
              },
			});
			$.ajax({
              url:"/seeyon/learnResource.do?method=findBestCouser&pageSize=5&page=1&type=2",
              type:"get",
              
              success:function(data){
				var video =JSON.parse(data)
				
				var code=video.code
				if(code==0){
					app.newAll=video.data;
				}else{
					alert(video.msg)
				}
				
			
				 
              },
			});
			
			var app=new Vue({
				el:"#home",
				data:{
					newAll:[
					
					],
					
					hotAll:[
						
					],
					menu:[],
					member:{}
				
				},
				methods:{
					viewDetail:function(coid){
						window.location.href='/seeyon/studymodule/course-user/centerView.html?coid='+coid
					},
					gsTime:function(result) {
						var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
						var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
						var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
						return result = h + ":" + m + ":" + s;
					},
					goMycourse:function(){
						var url="/seeyon/studymodule/course-user/courseMyCourse.html?state=2";
						window.location.href=url;
					},
					goMyScore:function(){
						var url="/seeyon/studymodule/course-user/courseMyGrade.html";
						window.location.href=url;
					},
					goCourse:function(id){
						var url="/seeyon/studymodule/course-user/courseMore.html?id="+id;
						window.location.href=url;
					}

				},
				computed:{
					
				},
				mounted:function(){

				}
			})
		
		
		