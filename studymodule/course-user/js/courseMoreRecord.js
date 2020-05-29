layui.use('laypage', function(){
    var laypage = layui.laypage;

    function pageFenye(count,catId,titl){
        laypage.render({
                elem: 'fenye' //注意，这里的 test1 是 ID，不用加 # 号
                ,count:count //数据总数，从服务端得到
                
                ,layout: ['count', 'prev', 'page', 'next', ]
                ,jump: function(obj,first){
                    
                if(!first){
                        $.ajax({
                        url:"/seeyon/paperController.do?method=userSelPaperPage&title="+titl+"&catId="+catId+"&page="+obj.curr+"&limit=10",
                        type:"get",
                        success:function(data){
                        
                            
                            var course =JSON.parse(data)
                            var code=course.code
                            if(code==0){
                                app.courseAll=course.data;
                                
                                
                            }else{
                                alert(course.msg)
                            }
                            
                            
                        },
                    });
                }
                }

            });
        $('.layui-laypage-count').css('padding','0px 15px')
    }
    // 推荐接口
            // $.ajax({
            //   url:"/seeyon/resource.do?method=getResourcePlayTimes&limit=3&page=1",
            //   type:"get",
            
            //   success:function(data){
            // 	var course =JSON.parse(data)
            // 	var code=course.code
            // 	if(code==0){
            // 		app.recommendAll=course.data;
                    
            // 	}else{
            // 		alert(course.msg)
            // 	}
                
                
            //   },
            // });
    //分页接口
            $.ajax({
                url:"/seeyon/paperController.do?method=userSelPaperPage&page=1&limit=10",
                        type:"get",
                        success:function(data){
                            var course =JSON.parse(data)
                            var code=course.code
                            if(code==0){
                                app.courseAll=course.data;
                                app.count=course.count
                                pageFenye(course.count,'','')
                            }else{
                                alert(course.msg)
                            }
                            
                        },
                    })
                
    
    $.ajax({
      url:"/seeyon/paperCategory.do?method=getAllCategoryTree",
      type:"post",
      data:"",
      success:function(data){
        
          app.branch=data;
          
      },
    });

    
    
    
    var app=new Vue({
        el:"#course-online",
        data:{
            branch:[],
            count:0,
            recommendAll:[
                
            ],
            
            courseAll:[
            
            ],
            currentId:"all",
        },
        methods:{
            
            viewDetail:function(exid){
                window.location.href='/seeyon/exammodule/exam-user/examDetail.html?exid='+exid;
            },
            getFenlei:function(e){
                var target=e.target;
                var id=$(target).attr('id');
                app.currentId=id;
                $.ajax({
                    url:"/seeyon/paperController.do?method=userSelPaperPage&catId="+id+"&page=1&limit=10",
                    type:"get",
                    
                    success:function(data){
                        var course =JSON.parse(data)
                        var code=course.code
                        if(code==0){
                            app.courseAll=course.data;
                            app.count=course.count
                            pageFenye(course.count,id,'')
                        }else{
                            alert(course.msg)
                            
                        }
                    
                        
                    },
                });
                
            },
            gsTime:function(s) {
                var result=s*60
                var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
                var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
                var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
                return result = h + ":" + m + ":" + s;
            },
            searchTitle:function(){
                var title=$('#title-zq').val();
                var name=$("#searchCourse").val();
                app.currentId="";
                $.ajax({
                        url:"/seeyon/paperController.do?method=userSelPaperPage&title="+title+"&page=1&limit=10",
                        type:"get",
                        success:function(data){
                            var course =JSON.parse(data)
                            var code=course.code
                            if(code==0){
                                app.courseAll=course.data;
                                app.count=course.count
                                pageFenye(course.count,all,title)
                            }else{
                                alert(course.msg)
                            }
                            
                        },
                    })
                
            }
        },
        computed:{},
        mounted:function(){

        }
    })

});
