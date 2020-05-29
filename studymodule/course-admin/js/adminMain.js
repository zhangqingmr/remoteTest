   
  
   
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
          if(courseId!=null&&courseId!=""&courseId!=undefined){
            $.ajax({
              url:"/seeyon/courseadmin.do?method=getCourse",
              type:"post",
              async:false,
              data:{"coid":courseId},
              success:function(data){
                var courseObj=JSON.parse(data);
                 
                  if (courseObj!= undefined && courseObj != null && courseObj != "false") {			
                    app.course=courseObj;
                    console.log(courseObj.duration)
                    app.course.duration=parseInt(courseObj.duration)/60
                   
                    courseId=courseObj.coid;
                   
                    
                    $("#tagainput").tagsinput('add',courseObj.keywords);
                   
                   
                  
                  }
              },
            });
            $.ajax({
              url:"/seeyon/courseadmin.do?method=getChapterByCoid",
              type:"post",
              async:false,
              data:{"coid":courseId},
              success:function(data){
                var Chapter=JSON.parse(data);
                
                  if (Chapter!= undefined && Chapter != null && Chapter != "false"&&Chapter.length!=0) {		
                    if(Chapter.length!=0){
                      app.isview=true
                    }
                   
                    for(var i=0;i<Chapter.length;i++){
                      for(var j=0;j<Chapter[i].resourceList.length;j++){
                        Chapter[i].resourceList[j].duration=parseInt(Chapter[i].resourceList[j].duration)/60
                        console.log("xqcqcqc")
                      }
                    
                       app.list.push(Chapter[i])
                    }
                    if(app.list.length>0){
                      app.selected=app.list[0];
                      app.selected.index=0
                    }
                    
                    
                    
                    
                      app.selected=Chapter[0];//初始化章节
                      app.hasResource=true;
                  
                   
                  }
              },
            });

          }

          
          
        

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
                 /* for(var i=0;i<app.list.length;i++){
                      app.list.splice(i,1);
                  }*/
                 
                  app.isview=true;
                  var selectLeng=app.list.length;
                  console.log(selectLeng)  
                  console.log("obj:"+JSON.stringify(chapterObj))
                  app.list.push(chapterObj);  
                  app.selected=chapterObj;   //变成新建的章节
                       // 在index是没有的时候
                    Vue.set(app.selected,'index',selectLeng)   //增加个index属性 方便做章节的增减
                    
                   console.log("obj2:"+ app.list[app.selected.index].resourceList)
                 
                 
                  
                  }
              },
            });
          }
          //新建章节
          $(".page-btn").click(function(e){
            
            savechapter(courseId);
            
          })
            //章节、鼠标离开触发。
          $(".input-zq").blur(function(){
            if(app.isview){
              
              var chid=app.selected.chid;
              updateChapter(chid);
            }
          });
          //附件、鼠标离开触发
          $("#saveRs-zq1").click(function(){
            
              updateOrsaveResource();
              
            
          });
          //更新附件
          function updateOrsaveResource(){
            console.log("3")
            var duration=$("#demo1").val()
            var points=$("#demo2").val()
            
            app.selectResource.duration=duration
            app.selectResource.points=points
            var resourceObj={
            };
            var m = JSON.parse(JSON.stringify(app.selectResource));
             m.duration=parseInt(duration)*60
           var a={}
           a.relation_baseinfo=m;
           resourceObj._json_params=JSON.stringify(a);
            
            $.ajax({
              url:"/seeyon/resource.do?method=saveOrUpdateRalation",
              type:"post",
              data:resourceObj,
              success:function(data){
                var resourceObj=JSON.parse(data);
                if (resourceObj!= undefined && resourceObj != null && resourceObj != "false") {			
                  
                 
                  resourceObj.duration=parseInt(resourceObj.duration)/60;
                  app.selectResource=resourceObj;
                //  alert("保存成功")
                  }else{
                    alert("保存失败")
                  }
              },
            });
          }
          //更新章节
            function updateChapter(id){

              var chapterObj={
              };
             var a={}
             a.chapter_baseinfo=app.selected;
              chapterObj._json_params=JSON.stringify(a);
              $.ajax({
                url:"/seeyon/courseadmin.do?method=saveOrUpdateChapter&coid="+courseId+"&chid="+id,
                type:"post",
                data:chapterObj,
                success:function(data){
                  var chapterObj=JSON.parse(data);
                  if (chapterObj!= undefined && chapterObj != null && chapterObj != "false") {			
                    
                    
                    app.isview=true;
                    }
                },
              });
            }
            //保存封面
            $("#saveBtn").click(function(e){
             if(app.course.title!=null&&app.course.title!=""&&app.course.title!=undefined){
              step1next(courseId)  //封面保存
             }else{
               alert("标题不能为空");
             }
              
            })
            $('#viewCourse').click(function(e){
              if(app.course.coid!=''&&app.course!=null){
                window.open('/seeyon/studymodule/course-user/centerView.html?coid='+app.course.coid);
              }else{
                alert('您的课程没有保存')
              }
             
            })
            //修改封面
            $("#updatePage").click(function(e){
              layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                  
                  type: 2, 
                  title:"修改封面",
                  content: '/seeyon/studymodule/cover/cover.html' ,
                  area: ['850px', '480px'],
                  btn: [ '确定', ],
                  yes: function(index, layero){
                    
                    var body = layer.getChildFrame('body', index);
                    
                  
                    var imgpath=body.find('#imgPath').val();
                  //   var iframeWin =window[layero.find('iframe')[0]['name']];
                  
                  //  console.log(iframeWin.getImgPath());
                    console.log(imgpath);
                    var uploadFlag=body.find('#uploadFlag').val();
                          if(uploadFlag=='false'){
                            alert("请上传图片后保存。");
                          }else{
                            app.course.imgurl=imgpath;
                          
                          layer.close(index);
                          }
                    
                  
                      }
                      
                  ,btnAlign: 'r'


                });
              })

            })
            //选择分类selectFenlei
            $("#choose-category").click(function(e){
            
              layui.use('layer', function(){

              layer.open({
                type: 2, 
                title:"课程分类",
                content: '/seeyon/studymodule/course-admin/courseClassify.html' ,
                area: ['350px', '400px'],
                btn: ['确定', '取消', ],
                yes: function(index, layero){
                  var body = layer.getChildFrame('body', index);
                    

                  var sonId=body.find('#sonId').val();
                  var sonText=body.find('#sonText').val();
                  app.course.catName=sonText
                  app.course.catid=sonId
                  layer.close(index);
                  
                      
                       
                    }
                    
                 ,btn1: function(index, layero){
                     
                        layer.close();
                }
                ,btnAlign: 'r'


              });
            })

            })
            
            //上传

            $("#upload_resource").click(function(e){
              layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                  type: 2, 
                  title:"上传文件",
                  content: '/seeyon/studymodule/resource/upload.html' ,
                  area: ['600px', '400px'],
                  btn: [ '确定', ],
                  yes: function(index, layero){
                    
                      var body = layer.getChildFrame('body', index);
                    
                      console.log("1")
                      var rsId=body.find('#rsId').val();
                      var uploadFlag=body.find('#uploadFlag').val();
                      if(uploadFlag=='false'){
                        alert("请检查文件是否上传完毕或上传成功。");
                      }else{
                        var champterId=app.selected.chid;
                          if(rsId!=null&&rsId!=""&&rsId!=undefined&&champterId!=null&&champterId!=""&&champterId!=undefined){
                            $.ajax({
                              url:"/seeyon/resource.do?method=createRalation",
                              type:"post",
                              data:{"rsIds":rsId,"charId":champterId},
                              success:function(data){
                                  resourceList1=JSON.parse(data);
                                
                                  console.log(data)
                                  if(app.isview){
                                    for(var i=0;i<resourceList1.length;i++){
                                      resourceList1[i].duration=parseInt(resourceList1[i].duration/60)
                                      console.log( resourceList1[i].duration)
                                      app.list[app.selected.index].resourceList.push(resourceList1[i]);//上传，不覆盖
                                    
                                    
                                  }
                                  //  app.selected=app.list[app.selected.index]
                                  }
                                  
                                  
                                  
                              },

                            })
                          }
                            layer.close(index);
                      }
                      
                      }
                      
                  ,btnAlign: 'r'


                });
              })
            })
            //删除章节
            $(".deleteChampter").click(function(e){
              deleteChapter()
            })
            function deleteChapter(){
              var index=app.selected.index;
              console.log(index);
              var chamId= app.list[index].chid;
              console.log(chamId);
              $.ajax({
               url:"/seeyon/courseadmin.do?method=deleteChaperById",
               type:"post",
               data:{"chapids":chamId},
               success:function(data){
                 //写回调  移除
                 app.list.splice(index,1)
   
               },
   
              })
            }
           
       /*      $(".li-zq").click(function(e){
             var css= $(this).find(".lb_item").css("display");
             console.log(css)
             if(css="none"){
              $(this).find(".lb_item").css("display","inline-block");
             }else if(css="inline-block"){
              $(this).find(".lb_item").css("display","none");
             }
            
            })*/
           
          function  step1next(couseId){
            var duration=$("#demo_vertical").val()
            var points=$("#demo_vertical2").val()
            var keywords=$("#tagainput").val()
            app.course.duration=parseInt(duration)*60
            app.course.points=points
            app.course.keywords=keywords
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
                    app.course.duration=parseInt(courseObj.duration)/60
                    courseId=courseObj.coid;
                    $("#tagainput").tagsinput(courseObj.keywords);}
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
                    courseId=courseObj.coid;
                  }
                    console.log(data.indexOf("{\"catid\"")!=-1)
                    if(data.indexOf("{\"catid\"")!=-1){
                      alert("保存成功");
                      window.location.href="/seeyon/studymodule/course-admin/courselist.html"
                    }
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
                 step1next(courseId);   //第三页保存
                
                  return false;
                }
                var m=0;
                
                        //各个页面的按钮2的功能
                            if(app.course.title==null||app.course.title==""||app.course.title==undefined){
                              alert("标题不能为空")
                              return false;
                            }
                            if(page==1){
                            
                              step1next("");  //第一页保存
                              
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