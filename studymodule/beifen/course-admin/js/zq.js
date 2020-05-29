$(function(){
 


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





          var courseId=reqparams["courseIdx"];  //修改 查看必须传id
        

          function savechapter(courseId){
            
            var chapterObj={
            };
           var a={}
           a.chapter_baseinfo=app.list;
            chapterObj._json_params=JSON.stringify(a);
            $.ajax({
              url:"/seeyon/courseadmin.do?method=saveOrUpdateChapter&coid="+courseId,
              type:"post",
              data:chapterObj,
              success:function(data){
                var chapterObj=JSON.parse(data);
                if (chapterObj!= undefined && chapterObj != null && chapterObj != "false") {			
                  app.list.push(chapterObj);
                  app.selected=chapterObj;
                  app.isview=true;
                  
                  }
              },
            });
          }
          $(".page-btn").click(function(e){
            
            savechapter(courseId);
            var m=app.list.length-1;
            app.viewZj("",m);
          })
            //鼠标离开触发。
          $(".input-zq").mouseout(function(){
            if(app.isview){
              var index=app.index;
              var chid=app.list[index].chid;
              updateChapter(chid);
            }
          });
            function updateChapter(id){

              var chapterObj={
              };
             var a={}
             a.chapter_baseinfo=app.list[index];
              chapterObj._json_params=JSON.stringify(a);
              $.ajax({
                url:"/seeyon/courseadmin.do?method=saveOrUpdateChapter&coid="+courseId+"&chid="+id,
                type:"post",
                data:chapterObj,
                success:function(data){
                  var chapterObj=JSON.parse(data);
                  if (chapterObj!= undefined && chapterObj != null && chapterObj != "false") {			
                    app.list[index].title=chapterObj.title;
                    app.list[index].description=chapterObj.description;
                    app.isview=true;
                    }
                },
              });
            }
            //保存封面
            $("#saveBtn").click(function(e){
             
              step1next(courseId)
            })
            //删除章节
            $(".deleteChampter").click(function(e){
              deleteChapter()
            })
            function deleteChapter(){
                alert("删除章节")
            }
            $(".fileinput-zq").click(function(e){
              fileinput();
            })
            function fileinput(){
              alert("上传课件")
          }
          function  step1next(couseId){

            //下一步--新建
            if(couseId==null||couseId==""||couseId==undefined){
              var courseObj={
              };
             var a={}
             a.course_baseinfo=app.course;
              courseObj._json_params=JSON.stringify(a);
              
              
              
              $.ajax({
                url:"/seeyon/courseadmin.do?method=saveCourse",
                type:"post",
                data:courseObj,
                success:function(data){
                  var courseObj=JSON.parse(data);
                  if (courseObj!= undefined && courseObj != null && courseObj != "false") {			
                    app.course=courseObj;
                    courseId=courseObj.coid;}
                },
              });
            }else{
              
              var courseObj={
              };
             var a={}
             a.course_baseinfo=app.course;
              courseObj._json_params=JSON.stringify(a);
              
              
              
              $.ajax({
                url:"/seeyon/courseadmin.do?method=saveCourse&coid="+courseId,
                type:"post",
                data:courseObj,
                success:function(data){
                  var courseObj=JSON.parse(data);
                  if (courseObj!= undefined && courseObj != null && courseObj != "false") {			
                    app.course=courseObj;
                    courseId=courseObj.coid;}
                },
              });
            }
            
          }

 //修改查看时候将后台数据返给course
          if (courseId!= undefined && courseId != null ){
            $.ajax({
              url:""+courseId,
              type:"post",
              data:{},
              success:function(data){
              try{
                var courseObj=JSON.parse(data); 
                          if (courseObj!= undefined && courseObj != null && courseObj != "false") {			
                              app.course=courseObj;
                              courseId=courseObj.coid;
                          
                          if (app.course.courseId!= undefined && app.course.courseId != null ) {
                            app.have=true;
                          }
                        }
                    }catch(err){
              
                    }
              },

            });
          }else{
            //新建
            
          }

  //记录当前页
            
              var page=1;
              $(".mt-step-col").click(function(e){
                var index=$(this).attr("data-index");
                //新建时候第一页没保存杜绝导航栏变化
                if(courseId== undefined ||courseId == null || courseId == ""){
                  if(index>1){
                    return false;
                  }
                }
                
                    page=index;
                    
                //导航栏颜色变化
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
                //区域变化
                    $(".page-zq").each(function(){
                      var pageIndex= $(this).attr("data-num")
                      if(pageIndex==index){
                          $(this).css("display","block");
                      }else{
                        $(this).css("display","none");
                      }
                    })
                //通知按钮

                if(page==1){
                  $("#course_btn1").css("display","none");
                  $("#course_btn2").text("下一步");
                }
                if(page==2){
                  $("#course_btn1").css("display","inline-block");
                  $("#course_btn2").text("下一步");
                }
                if(page==3){
                  $("#course_btn1").css("display","inline-block");
                  $("#course_btn2").text("保存");
                }
              
              })
   //上一页
              $("#course_btn1").click(function(e){
                    var m=0;
                        //区域变化'
                    $(".page-zq").each(function(){
                      var pageIndex= $(this).attr("data-num")
                      if(pageIndex==page-1){
                          m=pageIndex;
                          if(m==1){
                            $("#course_btn1").css("display","none")
                            $("#course_btn2").text("下一步")
                            
                          }else if(m==3){
                            $("#course_btn2").text("保存")
                          }else{
                            $("#course_btn2").text("下一步")
                          }
                          
                          $(this).css("display","block");
                      }else{
                        $(this).css("display","none");
                      }
                    })
                    //记录当前页
                    page=m;
                    
                    //导航颜色变化
                    $(".mt-step-col").each(function(){
                      var index=$(this).attr("data-index");
                      if(page==index){
                        $(this).addClass("active");
                        $(this).siblings(".active").removeClass("active");
                      }
                    })
              })

              $("#course_btn2").click(function(e){
                if($("#course_btn2").text()=="保存"){
                 step1next(courseId);
                  return false;
                }
                var m=0;
                
                        //各个页面的按钮2的功能
                            if(app.course.title==null||app.course.title==""||app.course.title==undefined){
                              return false;
                            }
                            if(page==1){
                            
                              step1next("");
                              
                           }
                //导航颜色变化
                $(".mt-step-col").each(function(){
                  var index=$(this).attr("data-index");
                  
                  if(page==index-1){
                  
                    m=index;
                    $(this).addClass("active");
                    $(this).siblings(".active").removeClass("active");
                  }
                })
                //记录当前页
                page=m;
              
                //区域变化'
                $(".page-zq").each(function(){
                  
                  var pageIndex= $(this).attr("data-num")
                
                  if(pageIndex==page){
                      if(page==3){
                        $("#course_btn2").text("保存");
                        
                      }
                      $("#course_btn1").css("display","inline-block")
                      $(this).css("display","block");
                  }else{
                    
                      $(this).css("display","none");
                    
                    
                  }
                })
              
                

              })


             


           
   
})