
    layui.use('element', function(){
         var element = layui.element;
    });
     var reqparams = new Object();  
  　      var url = location.search; //获取url中"?"符后的字串  

  
          if(url.indexOf("?") != -1)  

        　　{  
          

        　　 var str = url.substr(1);  
           
        　　　strs = str.split("&");  
        

        　　　for(var i = 0; i < strs.length; i ++)  

          　　 {  
                
                  reqparams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
          
          　　  }  

        　　} 





          var coid=reqparams["coid"];  //修改 查看必须传id
          var has=reqparams["hasStudy"];  //修改 查看必须传id
    var app =new Vue({
        el:"#app",
        data:{
            course: {'coid':'',    'catName':'',    'title':'',   'description':'',  'catid':"",
                   'keywords':"",   'level':"",      'duration':"",    'points':""  ,  
                   'imgurl':"",
                    },
            list:[],
            where:true
        },
        computed:{
            allResource:function(){
                var k=0;
                for(var i=0;i<this.list.length;i++){
                    for(var m=0;m<this.list[i].resourceList.length;m++){
                        k=k+1;
                    }
                }
                return k;
            }
        },
        methods:{
            viewResource:function(rsid,reType){
                console.log(reType)
                    if(reType==1||reType==2){
                        window.location.href="/seeyon/studymodule/course-user/coursePlayVideo.html?rsId="+rsid
                    }else if(reType==0||reType==3||reType==4){

                        window.location.href="/seeyon/studymodule/course-user/coursePlayOthers.html?rsId="+rsid
                    }else{
                        
                        window.location.href="/seeyon/studymodule/course-user/coursePlayVideo.html?rsId="+rsid
                     }
            },
            join:function(coid){
                $.ajax({
                    url:"/seeyon/learnResource.do?method=learnCourse",
                    type:"post",
                    data:{"coid":coid},
                    success:function(data){
                        if(data=="课程已经存在，不需要重新添加。"){
                            alert(data);
                        }else{
                            window.location.href='/seeyon/studymodule/course-user/listView.html?coid='+coid
                        }
                       
                    },
                })

            },
            changeWhere:function(e){
                var target=e.target
                var b=$(target).text();
                if(b=="课程简介"){
                    app.where=true
                }else{
                    app.where=false;
                }
            },
            gsTime:function(s) {
						
						var h = Math.floor(s / 3600) < 10 ? Math.floor(s / 3600) : Math.floor(s / 3600);
						var m = Math.floor((s / 60 % 60)) < 10 ?  Math.floor((s / 60 % 60)) : Math.floor((s / 60 % 60));
                        var s = Math.floor((s % 60)) < 10 ?  Math.floor((s % 60)) : Math.floor((s % 60));
                        if(h==0){
                            return result =  m + "分" + s+ "秒";
                        }else{
                            return result = h + "小时" + m + "分" + s+ "秒";
                        }
						
					},
        }
    })
    if(has=='false'){
        $('#study').css('display','none');
    }
    if(coid!=''&&coid!=undefined&&coid!=null){
        $.ajax({
                url:"/seeyon/courseadmin.do?method=getCourse",
                type:"post",
                data:{"coid":coid},
                success:function(data){
                    var courseObj=JSON.parse(data);
                 
                 if (courseObj!= undefined && courseObj != null && courseObj != "false") {			
                   app.course=courseObj;
                   coid=courseObj.coid;
                  
                 
                 }
                   
                },
    
                })

                $.ajax({
                url:"/seeyon/courseadmin.do?method=getChapterByCoid",
                type:"post",
                data:{"coid":coid},
                success:function(data){
                    var Chapter=JSON.parse(data);
                 
                  if (Chapter!= undefined && Chapter != null && Chapter != "false"&&Chapter.length!=0) {			
                    app.list=Chapter;
                   
                  
                   
                  }
                },
    
                })

    }
       