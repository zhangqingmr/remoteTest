function tanchuang(msg){
    layui.use(['layer','laypage'], function(){
        
        var layer = layui.layer;
        layer.open({
            title: '提示'
            ,content:msg
          });     
        
    })
}
     var app=new Vue({
        el:"#app",
        data:{
            entity:{"data":[],"count":"","state":"","total":"",'code':''},
            hasData:false,
            selectId:[],
            
            sonId:"",//子页面传给父页面参数
            isSelect:false,
           
            
            
        },
        methods:{
            fabu:function(course,state){
                var tijiao=JSON.parse(JSON.stringify(course));//没有返回对象实体，如果code不为0，错了，但是前端还是把显示改掉了。所以深拷贝一下
                if(state){
                    tijiao.status=1;
                }else{
                    tijiao.status=0;
                }
           
                var getObj={
                };
               var a={}
               a.train_public=tijiao;
               getObj._json_params=JSON.stringify(a);
                $.ajax({
                    url:"/seeyon/trainProgram.do?method=releaseTrain",
                    type:"post",
                    data:getObj, 
                    success:function(data){
                       var retObj=JSON.parse(data);
                       if(retObj.code==0){
                        if(state){
                            course.status=1;
                        }else{
                            course.status=0;
                        }
                       }else{
                        tanchuang(retObj.mgs)
                       }
                    },
        
                })
            }
               , openPage:function(e){
                    var target=e.target;
                    var s=$(target).attr('data-id')
                    window.location.href="/seeyon/trainmodule/train-admin/trainInfo.html?trainId="+s
                },
                checkedSome:function(juanzi){
                    //点击checkbox，判断是不是对勾
                   var is= $("#"+juanzi.trid).prop("checked")
                  
                   if(is){
                       //是 push
                       app.selectId.push(juanzi.trid);
                   }else{
                       $("#checkAll-zq").prop("checked",false);
                       //不是，判断有这个Id吗，从id去掉
                       if(app.selectId.indexOf(juanzi.trid)!=-1){
                           for(var i=0;i<app.selectId.length;i++){
                               if(app.selectId[i]==juanzi.trid){
                                   app.selectId.splice(i,1)
                               }
                           }
                          
                       }
                   }
                  
                },
                isSelected:function(){
                   if(app.selectId.length!=0){
                       app.isSelect=true;
                   }else{
                       app.isSelect=false;
                   }
                },
                checkedAll:function(){
                    //全选
                    var is=$("#checkAll-zq").prop("checked");
                   
                    if(is){
                       
                       for(var i=0;i<app.entity.data.length;i++){
                           //改变所有对勾的状态为true
                           $("#"+app.entity.data[i].trid).prop("checked",true);
                           //在selectId中没有时候，才加入
                           if(app.selectId.indexOf(app.entity.data[i].trid)==-1){
                               app.selectId.push(app.entity.data[i].trid);
                           }
                    }
                    }else{
                       
                       for(var i=0;i<app.entity.data.length;i++){
                           //改变所有对勾状态为false
                           $("#"+app.entity.data[i].trid).prop("checked",false);
                           //在selectId中去掉
                           app.selectId.splice(app.entity.data[i],1)
                    }
                    }
                    console.log(app.selectId);
                        
                },
               
                
            }
    })
   