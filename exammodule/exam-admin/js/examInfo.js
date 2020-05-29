$(function(){

         function ajaxCommon(url,entity){
            $.ajax({
                url:url,
                type:"post",
                async:false,
                data:entity,
                success:function(data){
                  var res=JSON.parse(data)
                  if(res.code==0){
                    alert('保存成功')
                    window.location.href='/seeyon/exammodule/exam-admin/examList.html'
                  }else{
                    alert(res.mgs)
                  }
                 
                },
              });
         }
          var reqparams = new Object();  
  　      var url = location.search; //获取url中"?"符后的字串
          if(url.indexOf("?") != -1){  
           var str = url.substr(1);  
           strs = str.split("&");  
           for(var i = 0; i < strs.length; i ++){ 
                reqparams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
          　　  }
        　　} 
          var examId=reqparams["examId"];  //修改 查看必须传id
          if(examId!=null&&examId!=""&examId!=undefined){
            $.ajax({
              url:'/seeyon/paperController.do?method=getPaperById&&exid='+examId,
              type:"get",
              
              success:function(data){
                var res=JSON.parse(data)
                var exam=res.data;
                if(res.code==0){
                  app.exam=exam;
                  $("#keywor01").tagsinput('add',app.exam.keywords);
                }else{
                  alert(res.mgs)
                }
               
              },
            });
          }

          $('#saveBtn').click(function(){
            
            var a={};
            var obj={}
           
            a.paper_baseinfo=app.exam;
            
            obj._json_params=JSON.stringify(a);
            
            ajaxCommon('/seeyon/paperController.do?method=saveOrUpdatePaper',obj)
          })
          $('#updatePage').click(function(){
            layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
              type: 2, 
              title:"修改封面",
              content: '/seeyon/studymodule/cover/cover.html' ,
              area: ['800px', '600px'],
              btn: [ '确定', ],
              yes: function(index, layero){
                
                var body = layer.getChildFrame('body', index);
                
              
                var imgpath=body.find('#imgPath').val();
                console.log(imgpath);
                app.exam.imgUrl=imgpath;
                
                layer.close(index);
              
                  }
                  
              ,btnAlign: 'r'


            });
          })
        })
         $('#selectFenlei').click(function(){
          layui.use('layer', function(){

            layer.open({
              type: 2, 
              title:"课程分类",
              content: '/seeyon/exammodule/exam-admin/examClassify2.html' ,
              area: ['350px', '400px'],
              btn: ['确定', '取消', ],
              yes: function(index, layero){
                var body = layer.getChildFrame('body', index);
                  

                var sonId=body.find('#sonId').val();
                var sonText=body.find('#sonText').val();
                app.exam.catName=sonText
                app.exam.catid=sonId
                layer.close(index);
                
                    
                     
                  }
                  
               ,btn1: function(index, layero){
                   
                      layer.close();
              }
              ,btnAlign: 'r'


            });
          })

        })
        $('#saveExam').click(function(){
            
            var k=$("#keywor01").val();
            console.log(k)
            app.exam.keywords=k;
            
            var a={};
            var obj={}
            a.paper_baseinfo=app.exam;
           
            obj._json_params=JSON.stringify(a);
            
            ajaxCommon('/seeyon/paperController.do?method=saveOrUpdatePaper',obj)
          })
})