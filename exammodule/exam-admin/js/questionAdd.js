$(function(){

    var examId=[];
    var reqparams = new Object();  
  　      var url = location.search; //获取url中"?"符后的字串
          if(url.indexOf("?") != -1){  
           var str = url.substr(1);  
           strs = str.split("&");  
           for(var i = 0; i < strs.length; i ++){ 
                reqparams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
          　　  }
        　　} 
          var exid=reqparams["exid"];  //修改 查看必须传id
          if(exid!=null&&exid!=""&exid!=undefined){
            $.ajax({
                url:'/seeyon/paperController.do?method=getPaperById',
                type:"post",
                data:{'exid':exid},
                success:function(data){
                  var entity=JSON.parse(data);
                  if(entity.code==0){
                      app.exam=entity.data;
                      app.type=entity.data.selectQuestionType
                      if(app.exam.examTime==0||app.exam.examTime==0.0){
                          app.exam.examTime=30;
                      }
                   //   app.questions=entity.data.questions;
                   if(app.type==0){
                    for(var i=0;i<entity.data.questions.length;i++){
                        
                        entity.data.questions[i].question.score=entity.data.questions[i].score
                        app.questions.push(entity.data.questions[i].question)
                        
                      }
                     
                      
                   }else{
                    app.randomCatS=entity.data.randomCatS;
                   }
                     
                  }
                 
                },
              });
          }
    function ajaxCommon(url,entity){
        $.ajax({
            url:url,
            type:"post",
            data:entity,
            success:function(data){
              var entity=JSON.parse(data);
         //     app.exam.questions=entity.questions;
                if(entity.code==0){
                  alert('保存成功')
                  window.location.href='/seeyon/exammodule/exam-admin/examList.html'
                }else{
                    alert(entity.mgs)
                }
             
            },
          });
     }
     $('#addSort').click(function(e){
        layui.use('layer',function(e){
            var layer=layui.layer
            layer.open({
                type: 2, 
                title:"试题选择",
                content: '/seeyon/exammodule/exam-admin/examClassify3.html' ,
                area: ['400px', '400px'],
                btn: ['确定', '取消', ],
                yes: function(index, layero){
                    var strzq=""
                            for(var i=0;i<examId.length;i++){
                                strzq=strzq+examId[i]+",";
                            }
                            
                        var body = layer.getChildFrame('body', index);
                        var sonId=body.find('#sonId').val();
                        
                
                    $.ajax({
                        url:"/seeyon/paperController.do?method=getStatisticsQuestion",
                        type:"post",
                        data:{'catid':sonId,'label':''},
                        success:function(data){
                          var entity=JSON.parse(data);
                          if(entity.code==0){
                             var record=""
                            for(var i=0;i<app.randomCatS.length;i++){
                               record=record+ app.randomCatS[i].catId;
                            }
                            console.log(record)
                            for(var i=0;i<entity.data.length;i++){
                                console.log(entity.data[i].catId)
                                if(record.indexOf(entity.data[i].catId)!=-1){
                                    alert("不允许添加重复的分类:"+entity.data[i].catName);
                                }else if(entity.data[i].randomQues.length==0){
                                    
                                    alert("分类:"+entity.data[i].catName+"下没有试题，添加失败");
                                }else{
                                    app.randomCatS.push(entity.data[i]);
                                }
                            }
                           
                          }else{
                              alert(entity.mgs)
                          }
                          
                            
                         
                        },
                      });
                
                 layer.close(index);
                    
                } 
                ,btn1: function(index, layero){
                    
                        layer.close(index);
                }
                ,btnAlign: 'r'


            });
        })
    })
    $('#addQuestion').click(function(e){
        layui.use('layer',function(e){
            var layer=layui.layer
            layer.open({
                type: 2, 
                title:"试题选择",
                content: '/seeyon/exammodule/exam-admin/selectExam.html' ,
                area: ['1250px', '700px'],
                btn: ['确定', '取消', ],
                yes: function(index, layero){
                    
                    var m=0;
                 layer.close(index);
                 var s='';
                 for(var j=0;j<app.questions.length;j++){
                   s=s+app.questions[j].qid+',';
                }
                 for(var i=0;i<app.questionSon.length;i++){
                     if(s.indexOf(app.questionSon[i].qid)==-1){
                        
                         app.questions.push(app.questionSon[i])
                     }else{
                         m=m+1
                     }
                 }
                 if(m==0){

                 }else{
                    alert("重复"+m+"道题，已做去重。")
                 }
               

                    
                } 
                ,btn1: function(index, layero){
                    
                        layer.close(index);
                }
                ,btnAlign: 'r'


            });
        })
    })
    
    $('#distinctQuestion').click(function(e){
        alert('1')
    })
    $('#updateQuestion').click(function(e){
        alert('1')
    })
    $('#step').click(function(e){
        var a={}
        var obj={}
        if(app.type==0){
            app.exam.questions=app.questions
           
        }else{
            
            app.exam.randomCatS=app.randomCatS
        }
        
       
        a.paper_baseinfo=app.exam;
    
        obj._json_params=JSON.stringify(a);
        
       ajaxCommon('/seeyon/paperController.do?method=saveOrUpdatePaper',obj)
    })
    $('#step2').click(function(e){
        var a={}
        var obj={}
        if(app.type==0){
            
            app.exam.questions=app.questions
        }else{
            app.exam.randomCatS=app.randomCatS
        }
        app.exam.examScore=app.allScore;
        a.paper_baseinfo=app.exam;
    
        obj._json_params=JSON.stringify(a);
        
       ajaxCommon('/seeyon/paperController.do?method=saveOrUpdatePaper',obj)
    })

    $('#saveBtn').click(function(e){
        alert('1')
    })
    $('#saveBtn2').click(function(e){
        alert('1')
    })
    $('#updateScore').click(function(e){
        if(app.selectId.length==0){
            alert('至少勾选一项');
            return;
        }
        layui.use('layer',function(e){
            var layer=layui.layer
            layer.prompt({offset: 'auto'},function(value, index, elem){
            
                    for(var k=0;k<app.selectId.length;k++){
                        for(var i=0;i<app.questions.length;i++){
                            if(app.selectId[k]==app.questions[i].qid){
                                app.questions[i].score=value;
                                break;
                            }
                            
                        }
                    }
                
                
                layer.close(index);
              });
        })
    })
   
    
        layui.use('layer',function(e){
            var layer=layui.layer
            $('.edit-exam-time').click(function(e){
            layer.open({
                type: 1, 
                title:"时间设置",
                content:$('#timeSetting'),
               
                area: ['330px', '200px'],
                
                yes: function(index, layero){
                    

                    layer.close(index);
                } 
                ,btn1: function(index, layero){
                    
                        layer.close(index);
                }
                ,btnAlign: 'r'


            });
        })
            $('#setTime').click(function(e){
            
                    var layer=layui.layer
                    layer.open({
                        type: 1, 
                        title:"时间设置",
                        content:$('#timeSetting'),
                    
                        area: ['330px', '200px'],
                        
                        yes: function(index, layero){
                        
        
                            layer.close(index);
                        } 
                        ,btn1: function(index, layero){
                            
                                layer.close(index);
                        }
                        ,btnAlign: 'r'
        
        
                    });
                
            })
            $('.cancel').click(function(e){
                layer.closeAll();
            })
    
            $('.confirm').click(function(e){
                layer.closeAll();
            })
            
    })

    
    $('.time-setting li').click(function(e){
       var boo= $(this).hasClass('active');
        $(this).siblings().removeClass('active');
        if(boo==true){

        }else{
            $(this).addClass('active');
        }
        var m=$(this).find('a').attr('href');
        var n=$(m).hasClass('active');
        if(n==true){

        }else{
            $(m).addClass('active');
        }
        $(m).siblings('.tab-pane').removeClass('active');
    })

})