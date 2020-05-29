layui.use('layer', function(){
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





      var catid=reqparams["catid"];  //修改 查看必须传id

            var grantObj={};
            var a={}
            var id=catid;
            a.role_baseinfo={};
            a.role_baseinfo.catid=id;
    if(catid!=''&&catid!=null&&catid!=undefined){
        
            $.ajax({    
                   url:"/seeyon/resourceCategory.do?method=getCategoryRole",
                   type:"post",             
                    data:{'catid':catid},
                    success:function(data){
                        var res=JSON.parse(data)
                        var code=res.code;
                        if(code==0){
                            var arr=res.data.member;
                            var type=res.data.allType;
                            var mem=''
                            if(type){
                                $("#grantdiv").css('display','none')
                                $('#all').prop('checked',type);
                            }else{
                                $("#grantdiv").css('display','block')
                                $('#all').prop('checked',type);
                            }
                          
                            for(var i=0;i<arr.length;i++){
                                mem=mem+arr[i].name+',';
                            }
                            $('#grant').val(mem)
                        }else{
                            alert('加载历史记录错误')
                        }
                       
                      
                     },
                    })
    }
    
      
    $("#all").change(function(e){
        var state=$(this).prop('checked');
        if(state==true){
            $("#grantdiv").css('display','none')
        }else{
            $("#grantdiv").css('display','block')
        }
    })
    $("#queding").click(function(e){
        var flag=$("#all").prop('checked')
        if(flag==true){
            a.role_baseinfo.allType=true;
            grantObj._json_params=JSON.stringify(a);
        }
            $.ajax({    
                   url:"/seeyon/resourceCategory.do?method=saveOrUpdateRole",
                   type:"post",             
                    data:grantObj,
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

    $("#grant").click(function(){
        
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
                a.role_baseinfo.member=arr;
              
                grantObj._json_params=JSON.stringify(a);
                var mem=''
                for(var i=0;i<arr.length;i++){
                    mem=mem+arr[i].name+',';
                }
                $('#grant').val(mem)
                parent.layer.close(index);
              }
              
          ,btnAlign: 'r'


        });
      })
    })