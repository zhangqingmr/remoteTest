var reqparams = new Object();
var url = location.search; //获取url中"?"符后的字串  

var zzcatId=""
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
        reqparams[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
}
var ZcatId = reqparams["id"];  //修改 查看必须传id
if (ZcatId != null && ZcatId != "" & ZcatId != undefined) {
    zzcatId=ZcatId;
}else{	
    zzcatId='all';
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
                    url:"/seeyon/learnResource.do?method=selUserCouser&courseName="+titl+"&catId="+catId+"&page="+obj.curr+"&pageSize=8",
                    type:"get",
                    success:function(data){
                    
                        
                        var course =JSON.parse(data)
                        var code=course.code
                        if(code==0){
                            app.courseAll=course.data;
                            
                            
                        }else{
                            alert(course.msg)
                        }
                        
                        
                    },
                });
            }
            }

        });
    $('.layui-laypage-count').css('padding','0px 15px')
}

        $.ajax({
          url:"/seeyon/learnResource.do?method=findBestCouser&pageSize=3&page=1&type=1",
          type:"get",
        
          success:function(data){
            var course =JSON.parse(data)
            var code=course.code
            if(code==0){
                app.recommendAll=course.data;
                
            }else{
                alert(course.msg)
            }
            
            
          },
        });
//分页接口
        $.ajax({
            url:"/seeyon/learnResource.do?method=selUserCouser&page=1&pageSize=8&catId="+zzcatId,
                    type:"get",
                    success:function(data){
                        var course =JSON.parse(data)
                        var code=course.code
                        if(code==0){
                            app.courseAll=course.data;
                            app.count=course.count
                            pageFenye(course.count,'','')
                        }else{
                            alert(course.msg)
                        }
                        
                    },
                })
            

$.ajax({
  url:"/seeyon/coursecategory.do?method=getAllCategoryTree",
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
        recommendAll:[
            
        ],
        
        courseAll:[
        
        ],
        currentId:"all",
        
    },
    methods:{
        
        
        viewDetail:function(coid){
            window.location.href='/seeyon/studymodule/course-user/centerView.html?coid='+coid
        },
        getFenlei:function(e){
            var target=e.target;
            var id=$(target).attr('id');
            app.currentId=id;
            app.state=0;
            $.ajax({
                url:"/seeyon/learnResource.do?method=selUserCouser&catId="+id+"&page=1&pageSize=8",
                type:"get",
                
                success:function(data){
                    var course =JSON.parse(data)
                    var code=course.code
                    if(code==0){
                        app.courseAll=course.data;
                        app.count=course.count
                        pageFenye(course.count,id,'')
                    }else{
                        alert(course.msg)
                    }
                
                    
                },
            });
            
        },
        gsTime:function(result) {
            var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
            var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
            return result = h + ":" + m + ":" + s;
        },
        searchTitle:function(){
            var title=$('#title-zq').val();
            var name=$("#searchCourse").val();
            app.currentId="";
            $.ajax({
                    url:"/seeyon/learnResource.do?method=selUserCouser&courseName="+title+"&page=1&pageSize=8",
                    type:"get",
                    success:function(data){
                        var course =JSON.parse(data)
                        var code=course.code
                        if(code==0){
                            app.courseAll=course.data;
                            app.count=course.count
                            pageFenye(course.count,all,title)
                        }else{
                            alert(course.msg)
                        }
                        
                    },
                })
            
        }
    },
    computed:{},
    mounted:function(){
        if(zzcatId!=null){
            this.currentId=zzcatId;
        }
        
    }
    
})

});