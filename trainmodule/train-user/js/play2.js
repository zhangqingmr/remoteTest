
    var readUrl=''
    var readPath=''
    var typeName=''
    var reqparams = new Object();  
　      var url = location.search; //获取url中"?"符后的字串  
      var app=new Vue({
        el:'#course',
        data:{
          name:''
        },
        methods:{
          stepLast:function(){
            window.history.back(-1); 
          }
        }
      })


    if(url.indexOf("?") != -1)  

  　　{  
    

  　　 var str = url.substr(1);  
     
  　　　strs = str.split("&");  
  

  　　　for(var i = 0; i < strs.length; i ++)  

    　　 {  
      
        reqparams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
    
    　　  }  

  　　} 





    var rsId=reqparams["rsId"];  //修改 查看必须传id
    var state=reqparams["state"];  //修改 查看必须传id
   
    
  //新接口，得到实体
  $.ajax({
        url:'/seeyon/resource.do?method=getResourceById',
        type:"post",
        async:false,
        data:{"rsId":rsId},
        success:function(data){
          var obj=JSON.parse(data);

           readUrl=obj.readUrl;
          typeName=obj.reTypeName;

          app.name=obj.fileName
         
          console.log(readUrl)
          console.log(typeName)
          if(obj!=null&&obj!=""){
            $.ajax({
                url:readUrl,
                type:"post",
                async:false,
                data:"",
                success:function(data){
                  var s=JSON.parse(data)
                  var code=s.code;
                  if(code==1){
                    readPath=s.readPath;
                    $('#readUp').val(readPath)
                    console.log(readPath);
                        if(typeName.indexOf("图片")!=-1){
                          
                            $("#bofang").attr("src","../resource/videoimg.html")  //图片进入新的ifram去放入
                            
                        }else if(typeName.indexOf("OFFICE")!=-1){
                          console.log(readPath)
                            $("#bofang").attr("src",readPath)  //word、excel直接放这里
                        }else if(typeName.indexOf("PDF")!=-1){
                            $("#bofang").attr("src",readPath)  //word、excel直接放这里
                        }else{
                            alert("不支持此类型文件")
                        }
                     
                     
                  }else{
                    if(s.mgs.indexOf('文件正在转换。')!=-1){
                      alert(s.mgs);
                      setTimeout(function(){
                        window.location.reload();
                      },3000)
                    }else if(s.mgs.indexOf('文件转换服务未启动。')!=-1){
                      alert('文件转换服务未启动,请开启OfficeTrans后重新尝试打开。')
                    }else{
                      alert(s.mgs);
                    }
                    
                    
                  }
                  
                },
                
              })
              
            }
            
        },

      })
        
        
        

      let timer=null;
      var timeout=false
      if(state=="study"){

          $("#videoTime").css('display','block');
           $.ajax({
                url:'/seeyon/learnResource.do?method=startLearnResource',
                type:"post",
                data:{"rsid":rsId},
                success:function(data){
                   var obj=JSON.parse(data);
                   var sec=obj.duration;
                   $("#start").val(obj.startTime)
                   $("#duzq").val(obj.duration)
                   if(sec>=60){
                     var min=parseInt(sec/60);
                     var sec1=parseInt(sec%60);
                     $("#min").text(min);
                     $("#sec").text(sec1);

                   }else{
                     $("#min").text(0);
                     $("#sec").text(sec.toString());

                   }
                },

              })

            
            
            function getCountDown() {
              timer=setInterval(function(){
              var min=$("#min").text();
              var sec=$("#sec").text();
              min1=parseInt(min)
              sec1=parseInt(sec);
              sec1=sec1+1;
              if(sec1==60){
                min1=min1+1;
                sec1=0
              }
              $("#min").text(min1);
              $("#sec").text(sec1);
            

            },1000)
            }
            
            //关闭时候
            window.onbeforeunload=function(e){   
                var st=$("#start").val(); 
                var min=$("#min").text();
                var sec=$("#sec").text();
                var duzq=$("#duzq").val();
                var dura=parseInt(min)*60+parseInt(sec)-parseInt(duzq);
                var du=dura.toString();
                $.ajax({
                url:'/seeyon/learnResource.do?method=saveLearnDetail',
                type:"post",
                async: false, //同步方式发送请求，true为异步发送
                data:{"reid":rsId,"startTime":st,"duration":du},
                success:function(data){
                  var obj=JSON.parse(data);
                  alert(obj)
                  
                },

              })
            }
      }
      
       
        if(state=='study'){
            $("#jishi").css('display','inline-block')
            getCountDown()
          document.addEventListener(
              "visibilitychange",
              function () {
                if (document.visibilityState == "hidden") {
                  //切换网页时候计时器停止，播放停止
                  clearInterval(timer)
                  layui.use('layer', function(){
                    var layer = layui.layer;
                   
                    layer.open({
                        type: 1, 
                        title:"提示",
                        shade: 0,
                        content: $('#tips'),
                        area: ['300px', '180px']
                        
              
              
                      });

                  })

                }else {
                  getCountDown();
                }
              },
              false
          );
        }
  
      $('#queding').click(function(e){
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.closeAll(); //再执行关闭 
        
        
      })
      $('#cancel').click(function(e){
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.closeAll(); //再执行关闭 
      })
    
        
