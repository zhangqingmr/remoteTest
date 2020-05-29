var readUrl=''
var readPath=''
var reqparams = new Object();  
　      var url = location.search; //获取url中"?"符后的字串  
    var app=new Vue({
          el:'#course',
          data:{
              name:''
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

              app.name=obj.fileName
              var typeName=obj.typeName;
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
                              
                          },

                      })
                  }
      }
      
          
      
             
                     
      var url = [readPath, 'video/mp4', '中文标清', 0];
          
          var videoObject = {
              container: '#video', //容器的ID或className
              variable: 'player',//播放函数名称
              poster: 'material/poster.jpg',//封面图片
              autoplay: true,
              video: [//视频地址列表形式
              ],
              loaded: 'LisPly', //当播放器加载后执行的函数	
          };
          videoObject.video.push(url);
          var player = new ckplayer(videoObject);
          
          function LisPly(){
              
              player.addListener('pause', pause); //监听暂停
              player.addListener('play', play); //监听播放
              player.addListener('ended', ended); //监听播放
          
          }
          function pause() {
              if(state=="study"){
                  //暂停清除计时器
                  
                  clearInterval(timer);
              }
          
          }
          function play() {
              if(state=="study"){
                  //点击开始计时
                  getCountDown();
              }
          }
          function ended() {
              if(state=="study"){
                  //点击开始计时
                  clearInterval(timer);
              }
          }
          if(state='study'){
              document.addEventListener(
                      "visibilitychange",
                      function () {
                          if (document.visibilityState == "hidden") {
                              //切换网页时候计时器停止，播放停止
                              
                              player.videoPause();
                              layui.use('layer', function(){
                                  var layer = layui.layer;
                                  layer.open({
                                          type: 1, 
                                          title:"提示",
                                          content: $('#tips'),
                                          area: ['300px', '200px']
                                          
                      
                      
                                      });

                              })

                          }else {
                              
                          }
                      },
                      false
              );
          }

      $('#queding').click(function(e){
          var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
          parent.layer.closeAll(); //再执行关闭 
          
          player.videoPlay();
      
          
      })
      $('#cancel').click(function(e){
          var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
          parent.layer.closeAll(); //再执行关闭 
      })
  
          