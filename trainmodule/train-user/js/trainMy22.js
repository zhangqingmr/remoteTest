var reqparams = new Object();
var url = location.search; //获取url中"?"符后的字串  
var myState=""
var myUrl=""

if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
        reqparams[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
}
var stateZq = reqparams["state"];  //修改 查看必须传id
if (stateZq != null && stateZq != "" & stateZq != undefined) {
    myState="2"
    myUrl='/seeyon/userTrainProgram.do?method=myTrainProgramPage&page=1&limit=10&trainState=2'
}else{
    myUrl="/seeyon/userTrainProgram.do?method=myTrainProgramPage&page=1&limit=10"
}


layui.use('laypage', function(){
var laypage = layui.laypage;

function pageFenye(count,catId,titl){
    laypage.render({
            elem: 'fenye' //注意，这里的 test1 是 ID，不用加 # 号
            ,count:count //数据总数，从服务端得到
            
            ,layout: ['count', 'prev', 'page', 'next', ]
            ,jump: function(obj,first){
                
            if(!first){
                    $.ajax({
                    url:"/seeyon/userTrainProgram.do?method=myTrainProgramPage&title="+titl+"&page="+obj.curr+"&limit=10",
                    type:"get",
                    success:function(data){
                    
                        
                        var train =JSON.parse(data)
                        var code=train.code
                        if(code==0){
                            app.trainAll=train.data;
                        }else{
                            alert(train.msg)
                        }
                        
                        
                    },
                });
            }
            }

        });
    $('.layui-laypage-count').css('padding','0px 15px')
}
$.ajax({
            url:myUrl,
                    type:"get",
                    success:function(data){
                        var train =JSON.parse(data)
                        var code=train.code
                        if(code==0){
                            app.trainAll=train.data;
                            app.count=train.count
                            pageFenye(train.count,'','')
                        }else{
                            alert(train.msg)
                        }
                        
                    },
                })
$.ajax({
  url:"/seeyon/trainProgramCategory.do?method=getAllCategoryTree",
  type:"post",
  data:"",
  success:function(data){
      app.branch=data;
  },
});




var app=new Vue({
    el:"#course-online",
    data:{
        branch:[],
        count:0,
        trainAll:[
        
        ],
        state:0,
        currentId:"all",
    },
    methods:{
        changeState:function(type){
            if(app.state==type){
                app.state=0
            }else{
                app.state=type;
            }
            
            $.ajax({
                url:"/seeyon/userTrainProgram.do?method=myTrainProgramPage&catId="+app.currentId+"&page=1&limit=10&trainState="+app.state,
                type:"get",
                
                success:function(data){
                    var train =JSON.parse(data)
                    var code=train.code
                    if(code==0){
                        app.trainAll=train.data;
                        app.count=train.count
                        pageFenye(train.count,id)
                    }else{
                        alert(train.msg)
                    }
                
                    
                },
            });
        },
        
        viewDetail:function(trainid){
            window.location.href='/seeyon/trainmodule/train-user/trainDetail.html?train='+trainid;
        },
        getFenlei:function(e){
            var target=e.target;
            var el1 = event.currentTarget;
            if(event.currentTarget == event.target){
                var id=$(target).attr('id');
            app.currentId=id;
            console.log(app.currentId)
            $.ajax({
                url:"/seeyon/userTrainProgram.do?method=myTrainProgramPage&catId="+id+"&page=1&limit=10&trainState="+app.state,
                type:"get",
                
                success:function(data){
                    var train =JSON.parse(data)
                    var code=train.code
                    if(code==0){
                        app.trainAll=train.data;
                        app.count=train.count
                        pageFenye(train.count,id)
                    }else{
                        alert(train.msg)
                    }
                
                    
                },
            });
            }
            
            
        },
        gsTime:function(result) {
            var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
            var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
            return result = h + ":" + m + ":" + s;
        },
        searchTitle:function(){
            var title=$('#title-zq').val();
            var name=$("#searchtrain").val();
            app.currentId="";
            
            $.ajax({
                    url:"/seeyon/userTrainProgram.do?method=myTrainProgramPage&title="+title+"&page=1&limit=10&trainState="+app.state,
                    type:"get",
                    success:function(data){
                        var train =JSON.parse(data)
                        var code=train.code
                        if(code==0){
                            app.trainAll=train.data;
                            app.count=train.count
                            
                            pageFenye(train.count,all,title)
                        }else{
                            alert(train.msg)
                        }
                        
                    },
                })
            
        }
    },
    computed:{},
    mounted:function(){
        if(myState=="2"){
            this.state=2;
        }
    }
})

});