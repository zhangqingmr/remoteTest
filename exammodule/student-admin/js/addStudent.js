layui.use('layer', function(){
                
        
    var nodeIds=[];    
  

  $("#queding").click(function(e){
      var mmId=$('#memberId').val()
      var caid=''
      for(var i=0;i<nodeIds.length;i++){
          if(i==nodeIds.length-1){
              caid=caid+nodeIds[i]
          }else{
              caid=caid+nodeIds[i]+","
          }
         
      }
          
          $.ajax({    
                 url:"/seeyon/examinee.do?method=saveOrUpdateExaminee",
                 type:"post",             
                  data:{'userid':mmId,'catid':caid},
                  success:function(data){
                      var res=JSON.parse(data)
                      var code=res.code
                      var msg=res.mgs
                      if(code==0){
                          alert('保存成功')
                          var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                           parent.layer.close(index); //再执行关闭 
                      }else{
                          alert(msg)
                      }
                     
                    
                   },
                  })
  })
  $("#cancel").click(function(e){
      var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
       parent.layer.close(index); //再执行关闭 
  })

  $("#member").click(function(){
      
      var layer = layui.layer;
      parent.layer.open({
        type: 2, 
        title:"选择人员",
        content:'/seeyon/selOrg/page/selPerson/people.html',
        area: ['750px', '500px'],
        btn: [ '确定', ],
        
        yes: function(index, layero){
          
             
              var body = layer.getChildFrame('body', index);
              var iframeWin = parent.window[layero.find('iframe')[0]['name']];
              var arr= iframeWin.getSelPeople();
              
              var mem=''
              var memId=''
              for(var i=0;i<arr.length;i++){
                  mem=mem+arr[i].name+',';
              }
              for(var i=0;i<arr.length;i++){
                  if(i==arr.length-1){
                      memId=memId+arr[i].id
                  }else{
                      memId=memId+arr[i].id+',';
                  }
                 
              }
              $('#member').val(mem)
              $('#memberId').val(memId)
              parent.layer.close(index);
            }
            
        ,btnAlign: 'r'


      });
    })
    $("#fenlei").click(function(){
      
      var layer = layui.layer;
      parent.layer.open({
        type: 2, 
        title:"选择分类",
        content:'/seeyon/exammodule/student-admin/studentClassify.html',
        area: ['750px', '500px'],
        btn: [ '确定', ],
        yes: function(index, layero){
              
          //   
          var body = layer.getChildFrame('body', index);
          var iframeWin = parent.window[layero.find('iframe')[0]['name']];
          //获取勾选的值id
           nodeIds=iframeWin.sel;
           $('#fenlei').val(iframeWin.selName)
          
          console.log(nodeIds)
          
          parent.layer.close(index);
                 
              }
            
        ,btnAlign: 'r'


      });
    })
  })