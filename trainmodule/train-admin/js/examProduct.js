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
            var problemId=reqparams["problemId"];  //修改 查看必须传id
            if(problemId!=null&&problemId!=""&problemId!=undefined){
                $.ajax({
                  url:"/seeyon/questionController.do?method=getQuesById",
                  type:"post",
                  data:{"qid":problemId},
                  success:function(data){
                    
                    var s=JSON.parse(data);
                   
                    var problemObj=s.data;
                     
                      if (problemObj!= undefined && problemObj != null && problemObj != "false") {			
                        app.problem=problemObj;
                        $("#listType").find("li").each(function(){
                            var id= $(this).attr("qtid");
                            $(this).removeClass("selected");
                            if(id==app.problem.qtype){
                                $(this).addClass("selected");
                            }
                         })
                        if(problemObj.qtype=='1'||problemObj.qtype=='2'||problemObj.qtype=='6'){
                            app.option=problemObj.options
                        }else if(problemObj.qtype=='3'){
                            app.judge=problemObj.options
                        }else if(problemObj.qtype=='4'){
                            app.fill=problemObj.options
                        }else if(problemObj.qtype=='5'){
                            app.Key=problemObj.options
                        }

                       
                        
                        $("#taginput").tagsinput('add',app.problem.labels);
                       
                      }
                  },
                });
               
                
               
              }
              
    function checkValidate(arr,m){
       
        var k=0;
        for(var i=0;i<arr.length;i++){
            if(arr[i].isRight==true){
                k=k+1;
                
            }
           
        }
        
        if(k==0){
            alert("请勾选正确答案")
            return false;
        }else if(m>k){
           
            alert("至少勾选"+m+"项答案")
            return false;
        }
       
            return true;
    }
    //保存
    $("#savelink").click(function(e){
       
        if(app.problem.title==""){
            alert("题干不能为空")
            return false
        }
        console.log("题类型"+app.problem.qtype)
        
        //提交选项
       if(app.problem.qtype=="1"||app.problem.qtype=="2"||app.problem.qtype=="6"){
        if(app.problem.qtype=="1"){
            console.log(app.option)
            
           var m= checkValidate(app.option,1);
           console.log("校验方法返回"+m)
           if(m==false){
               return false;
           }
        }
        if(app.problem.qtype=="2"){
            var m= checkValidate(app.option,2);
            if(m==false){
                return false;
            }
        }
        console.log(app.problem.qtype)
        if(app.problem.qtype=="6"){
            var m= checkValidate(app.option,1);
            if(m==false){
                return false;
            }
        }
         app.problem.options=app.option;
       }else if(app.problem.qtype=="3"){
        var m= checkValidate(app.judge,1);
        
        if(m==false){
            return false;
        }else{
            app.problem.options=app.judge;
        }
      
       }else if(app.problem.qtype=="4"){
        app.problem.options=app.fill;
       }else if(app.problem.qtype=="5"){
        console.log(app.problem.qtype)
        app.problem.options=app.Key;
       }
       //提交labels
       var labels=$("#taginput").val()
        app.problem.labels=labels
        //转成他需要的格式
          var problemObj={
          };
         var a={}
         a.question_baseinfo=app.problem;
         problemObj._json_params=JSON.stringify(a);
         console.log( problemObj._json_params)
          
          
          
          $.ajax({
            url:"/seeyon/questionController.do?method=saveOrupdateQues",
            type:"post",
            data:problemObj,
            success:function(data){
                var s= JSON.parse(data);
                if(s.code==0){
                    alert("保存成功")
                    window.location.href='/seeyon/exammodule/exam-admin/examAdmin.html'
                }else{
                    alert("保存失败");
                }
            },
          });
        
  }) 
  //增加填空
    $(document).on('click', '#addTK', function() {
        var obj={"isRight":true,"sort":"","score":"1","title":"","qid":"","opid":""};
        
       
         var num=65+app.fill.length ; 
         var s=String.fromCharCode(num);
         
         obj.sort=s;
        app.fill.push(obj)
    })
    //增加选项
    $(document).on('click', '#addNewOp', function() {
        var obj={"isRight":false,"sort":"","score":"1","title":"","qid":"","opid":""};
        var num=65+app.option.length ;
         var s=String.fromCharCode(num);
       
         obj.sort=s;
        app.option.push(obj)
    })
    //选择分类
    $(document).on('click', '#choose-category', function() {
        layui.use('layer', function(){
            var layer = layui.layer;
            
                layer.open({
                    type: 2, 
                    title:"试题分类",
                    content: '/seeyon/exammodule/exam-admin/examClassify.html' ,
                    area: ['350px', '400px'],
                    btn: ['确定', '取消', ],
                    yes: function(index, layero){
                        var body = layer.getChildFrame('body', index);
                        app.problem.catId=body.find('#sonId').val();
                        app.problem.catname=body.find('#sonText').val();
                           
                        layer.close(index);
                        }
                        
                     ,btn1: function(index, layero){
                         
                            layer.close(index);
                    }
                    ,btnAlign: 'r'


                  });
          }); 
    })
    //添加关键字
    $(document).on('click', '#addKeys', function() {
        var obj={"isRight":false,"sort":"","score":"1","title":"","qid":"","opid":""};
        var num=65+app.Key.length ;
         var s=String.fromCharCode(num);
         
         obj.sort=s;
        app.Key.push(obj)
    })
    $(document).on('click', '#easy-zq', function() {
        $("#taginput").tagsinput('add',"简单");
                       
    })
    $(document).on('click', '#more-zq', function() {
        $("#taginput").tagsinput('add',"较难");
                       
    })
    $(document).on('click', '#difficult-zq', function() {
        $("#taginput").tagsinput('add',"很难");
                       
    })
    $(document).on('click', '.up-zq', function() {
        
        var o=$(this).parent().attr('data-laiyua')
        var id=$(this).parent().attr('id')
        var sort=$(this).parent().attr('sort')
        
        if(o=="keywords"){
          up(app.Key,sort)
        }else if(o=="selectOp"){
            up(app.option,sort)
        }else if(o=="tiankong"){
            up(app.fill,sort)
        }
        
    })
    $(document).on('click', '.down-zq', function() {
        var o=$(this).parent().attr('data-laiyua')
        var id=$(this).parent().attr('id')
        var sort=$(this).parent().attr('sort')
        
        if(o=="keywords"){
          down(app.Key,sort)
        }else if(o=="selectOp"){
            down(app.option,sort)
        }else if(o=="tiankong"){
            down(app.fill,sort)
        }
    })
    //删除
    $(document).on('click', '.delete-zq',function() {
        var o=$(this).parent().attr('data-laiyua')
        var id=$(this).parent().attr('id')
        var sort=$(this).parent().attr('sort')
       
        if(o=="keywords"){
          removeZ(app.Key,sort)
        }else if(o=="selectOp"){
            removeZ(app.option,sort)
        }else if(o=="tiankong"){
            removeZ(app.fill,sort)
        }
        
    })
    function  removeZ(s,k){
        for(var i=0;i<s.length;i++){
            if(s[i].sort==k){
                s.splice(i,1);
            }
        }
        for(var i=0;i<s.length;i++){
            var num=65+i;
            var m=String.fromCharCode(num);
            s[i].sort=m;
        }
    }
    function up(s,k){
        for(var i=0;i<s.length;i++){
            if(s[i].sort==k){
                if(i==0){
                    alert("已经移动到顶端啦")
                    return false;
                }
                var temp=s[i-1];
                s[i-1]=s[i];
                s[i]=temp;

               s[i-1].sort=temp.sort;
                s[i].sort=k;
            }
        }
    }
    function down(s,k){
        for(var i=0;i<s.length;i++){
            if(s[i].sort==k){
                if(i==s.length-1){
                    alert("已经移动到最底部啦")
                    return false;
                }
                var temp=s[i+1];
                s[i+1]=s[i];
                s[i]=temp;

               s[i+1].sort=temp.sort;
                s[i].sort=k;
            }
        }
    }
    $(document).on('click','input[name=optionselect]',function (){ //获得所有的name=names的input，并给他们添加click监听事件
        　　　if(app.problem.qtype=="1"){
                            
                           $("input[name=optionselect]").not($(this)).prop("checked",false)
                             for(var i=0;i<app.option.length;i++){
                                 app.option[i].isRight=false;
                             }
                           var m= $("input[name=optionselect]").index(this)
                           app.option[m].isRight=true;
                         
                           
                          // var check= $(this).prop("checked",true);    
                            


                            // for(var i=0;i<app.option.length;i++){
                            //      app.option[i].isRight=false;
                            //  }
                            // if($(this).prop("checked")){
                            //     $('input[name=optionselect]').not($(this)).prop("checked",false);
                            //     $('input[name=optionselect]').not($(this)).attr("value","false");
                            // }
                            //  for(var i=0;i<app.option.length;i++){
                            //     console.log( app.option[i].isRight)
                            // }
            }
            if(app.problem.qtype=="3"){
                       
                $("input[name=optionselect]").not($(this)).prop("checked",false)
                for(var i=0;i<app.judge.length;i++){
                    app.judge[i].isRight=false;
                }
                var m= $("input[name=optionselect]").index(this)
                app.judge[m].isRight=true;
            }
    
    });
})