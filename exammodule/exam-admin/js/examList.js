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
               a.paper_release=tijiao;
               getObj._json_params=JSON.stringify(a);
                $.ajax({
                    url:"/seeyon/paperController.do?method=releasePaper",
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
            },
                openPage:function(e){
                    var target=e.target;
                    var s=$(target).attr('data-id')
                    window.location.href="/seeyon/exammodule/exam-admin/examInfo.html?examId="+s
                },
                checkedSome:function(juanzi){
                    //点击checkbox，判断是不是对勾
                   var is= $("#"+juanzi.exid).prop("checked")
                  
                   if(is){
                       //是 push
                       app.selectId.push(juanzi.exid);
                   }else{
                       $("#checkAll-zq").prop("checked",false);
                       //不是，判断有这个Id吗，从id去掉
                       if(app.selectId.indexOf(juanzi.exid)!=-1){
                           for(var i=0;i<app.selectId.length;i++){
                               if(app.selectId[i]==juanzi.exid){
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
                           $("#"+app.entity.data[i].exid).prop("checked",true);
                           //在selectId中没有时候，才加入
                           if(app.selectId.indexOf(app.entity.data[i].exid)==-1){
                               app.selectId.push(app.entity.data[i].exid);
                           }
                    }
                    }else{
                       
                       for(var i=0;i<app.entity.data.length;i++){
                           //改变所有对勾状态为false
                           $("#"+app.entity.data[i].exid).prop("checked",false);
                           //在selectId中去掉
                           app.selectId.splice(app.entity.data[i],1)
                    }
                    }
                    console.log(app.selectId);
                        
                },
               
                
            }
    })

        $(function() {
            layui.use(['layer','laypage'], function(){
            var urlstore="/seeyon/paperController.do?method=paperPage&catid=all&page=1&limit=10"
            var allSize=0;
            var cattid='all';
            var layer = layui.layer;
            var laypage = layui.laypage;
            
            
            function fenye(allSize,cattid){
                console.log(allSize)
                laypage.render({
                    elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                    ,count: allSize //数据总数，从服务端得到
                    ,limits:[10, 20, 30, 40, 50]
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        console.log(obj.limit); //得到每页显示的条数
                        var urlpage="/seeyon/paperController.do?method=paperPage&page="+obj.curr+"&limit="+obj.limit+'&catid='+cattid;
                        urlstore=urlpage;
                     
                        if(!first){
                            $.ajax({
                                url:urlpage,
                                type:"get",
                              
                                success:function(data){
                                    var s=JSON.parse(data);
                                    
                                    if(s.data!=null&&s.data!=undefined&&s.data!=""&&s.data!='false'){
                                        app.hasData=true
                                       
                                    }else{
                                        app.hasData=false;
                                        
                                    }
                                    app.entity=s;
                                },
                    
                            })
                        }
                      }
                  });
            }
            
            function pageMain(catid,page,limit){
                urlstore="/seeyon/paperController.do?method=paperPage&catid="+catid+"&page="+page+"&limit="+limit
                $.ajax({
                    
                    url:"/seeyon/paperController.do?method=paperPage",
                    type:"post",
                    data:{"catid":catid,'page':page,'limit':limit}, 
                    success:function(data){
                        var s=JSON.parse(data);
                        if(s.data!=null&&s.data!=undefined&&s.data!=""&&s.data!='false'){
                            app.hasData=true
                           allSize= s.count
                           
                           
                        }else{
                            app.hasData=false;
                        }
                        app.entity=s;
                        fenye(allSize,catid)
                    },
        
                })
            }
            pageMain('all',1,10);
                    function menuzq(node){
                        var item={
                            // "create" :{
                            //     "separator_before": false,
                            //     "separator_after": true,   
                            //     "_disabled": false, 
                            //     "label": "新增", 
                            //     "action": function (data) {  
                                    
                            //         var inst = $.jstree.reference(data.reference),
                            //             obj = inst.get_node(data.reference);//获得当前节点,可以拿到当前节点所有属性  
                            //         var id = obj.id;     //新加节点,以下三行代码注释掉就不会添加节点    
                            //          
                            //         inst.create_node(obj,{text:'新建分类'},"last",function(new_node){
                            //                     var instnew = $.jstree.reference(new_node),
                            //                         objnew= inst.get_node(new_node);  
                            //                     var parent=new_node.parent;
                            //                     var text=new_node.text;
                            //                     var oldname = new_node.name;     
                                    
                            //                     instnew.edit(objnew,0,function(node, status, cancelled){
                            //                         if(status){
                            //                             var newname=node.text;
                            //                             $.ajax({
                                                        
                            //                                 url:"/seeyon/paperCategory.do?method=newCategory",
                            //                                 type:"post",
                                                        
                            //                             data:{"parent":parent,"text":newname},
                            //                                 success:function(data){
                            //                                     console.log("新建并且重命名为："+newname);
                            //                                     var s=JSON.parse(data);
                            //                                     instnew.set_id(node,s.catid);
                            //                                     instnew.set_text(node,s.catname);
                            //                                 },
                        
                            //                             })
                        
                            //                         }else{
                            //                             instnew.set_text(oldname);
                            //                         }
                                                
                            //                 });
            
                                        
                            //         }); 
                            //     }
                            // },
                            "rename" :{
                                "separator_before": false,
                                "separator_after": true,   
                                "_disabled": false, 
                                "label": "重命名", 
                                "action": function (data) {  
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);//获得当前节点,可以拿到当前节点所有属性  
                                    var oldname = obj.name;     //新加节点,以下三行代码注释掉就不会添加节点    
                                    var  id=obj.id;
                                            
                                    inst.edit(obj,0,function(node, status, cancelled){
                                        if(status){
                                            var newname=node.text;
                                            $.ajax({
                                                url:"/seeyon/paperCategory.do?method=renameCartegory",
                                                type:"post",
                                                data:{"id":id,"text":newname},
                                                success:function(data){
                                                    console.log("重命名为："+newname);
                                                },
            
                                            })
            
                                        }else{
                                            node.set_text(oldname);
                                        }
                                    
                                });
                                        
                                    }
                        },
                        "delete" :{
                                "separator_before": false,
                                "separator_after": true,   
                                "_disabled": false, 
                                "label": "删除", 
                                "action": function (data) {  
                                    var inst = $.jstree.reference(data.reference),
                                    obj = inst.get_node(data.reference);//获得当前节点,可以拿到当前节点所有属性  
                                    var id=obj.id
                                    inst.delete_node(obj)
                                    $.ajax({
                                        url:"/seeyon/paperCategory.do?method=delCartegory",
                                        type:"post",
                                        data:{"id":id},
                                        success:function(data){
                                            console.log("删除节点id为："+id);
                                        },
            
                                    })
                                    
                                }
                            },
                        }
                        if(node.id=='all'||node.id=="0"){
                                delete item.create;
                                delete item.rename;
                                delete item.delete;
                        }
                        return item;
                    }
                    $('#zq').on('move_node.jstree', function(e,data){
                        
                        var parent=data.node.parent;
                        var id=data.node.id;
                        var text=data.node.text;
                        console.log(parent);
                        console.log(id);
                        $.ajax({
                            url:"/seeyon/paperCategory.do?method=moveCartegory",
                            type:"post",
                            data:{"id":id,"parent":parent},
                            success:function(data){
                                console.log("移动节点："+text);
                            },

                        })
                        
                       }).jstree({
                        "core" : {
                            "animation" : 0,
                            "themes" : { "dots": true,"icons":true ,"stripes":false},
                            "check_callback" : true,
                            "multiple" : false,
                            'data' : {
                                'url':"/seeyon/paperCategory.do?method=getAllCategoryTree",
                            }
                        },
                        "types" : { 
                            "#" : { "max_children" : -1,//无穷多个           #代表根节点id
                                "max_depth" : -1 ,
                                
                            },
                            "default" : {
                                "icon" : "jstree-folder",           //所有没设定的属性都按照default来.
                                "valid_children" : ["default","text"]
                            },
                            "text" : {
                                "icon" : "false",
                                "valid_children" : []
                            }
                        },
                        "plugins" : [  "types", "wholerow","contextmenu" ,'dnd','search'],
                        "contextmenu": {
                            
                            "items": menuzq
                            },
                            "dnd": {
                                copy: false,
                                inside_pos: 'last',
                                touch: false,
                                large_drop_target: true,
                                large_drag_target: true,
                                is_draggable: function (nodes, e) {
                                    for (var i = 0; i < nodes.length; i++) {
                                        if (nodes[i].id=="all" || nodes[i].id <= 0) {
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            },
                    });
                
                    //点击jstree子项，控制该节点展开、收缩等：
                    $("#zq").bind("select_node.jstree", function (e, data) { 
                            if(data.node.id !="all"||data.node.id !="0"){    //排除第一个节点(2011民事案由) 
                            data.instance.toggle_node(data.node); //单击展开下面的节点 
                            } 
                    });
                    //使用插件search搜索（jstree自带的插件）
                    var to = false; 
                    $('#categories-search').keyup(function () { 
                    if(to) { 
                    clearTimeout(to); 
                    } 

                    to = setTimeout(function () { 
                    $('#zq').jstree(true).search($('#categories-search').val()); 

                    }, 250); 
                    });

                    //新建根节点
                    $("#create-top-category").click(function(e){
                    var inst=  $.jstree.reference("#zq");
                    var obj= inst.get_node("")
                    inst.create_node("#",{text:'新建分类'},"last",function(new_node){
                            var instnew = $.jstree.reference(new_node),     //取得新建的子节点
                                        objnew= inst.get_node(new_node);
                            var parent=new_node.parent;                 
                            var text=new_node.text;
                            var oldname = new_node.name;     
                    
                        instnew.edit(objnew,0,function(node, status, cancelled){
                            if(status){
                                var newname=node.text;
                                $.ajax({
                                   
                                    url:"/seeyon/paperCategory.do?method=newCategory",
                                    type:"post",
                                // data:{"id":id,"text":newname},
                                data:{"parent":parent,"text":newname},
                                    success:function(data){
                                        console.log("新建并且重命名为："+newname);
                                        var s=JSON.parse(data);
                                        
                                        instnew.set_id(node,s.catid);
                                        instnew.set_text(node,s.catname);
                                    },

                                })

                            }else{
                                instnew.set_text(oldname);
                            }
                        
                    });

                
            }); 
                    })
                    $('#zq').bind("activate_node.jstree", function (obj, e) {
                            var id=e.node.id;
                            console.log(id)
                            pageMain(id,1,10)

                    });
                    $("#newCourse").click(function(e){
                    
                        window.location.href="/seeyon/exammodule/exam-admin/examInfo.html"
                    })
                    $("#move-exams").click(function(e){
                        if(app.isSelect){
                            var m=app.selectId;
                            var str="";
                            for(var i=0;i<app.selectId.length;i++){
                                str=str+app.selectId[i]+",";
                            }

                        layer.open({
                            type: 2, 
                            title:"试卷",
                            content: '/seeyon/exammodule/exam-admin/examClassify2.html' ,
                            area: ['350px', '400px'],
                            btn: ['确定', '取消', ],
                            yes: function(index, layero){
                                
                                $.ajax({
                                    url:"/seeyon/paperController.do?method=removeCategory",
                                    type:"post",
                                    data:{"catid":app.sonId,"exid":str},
                                    success:function(data){
                                        layer.closeAll(); //疯狂模式，关闭所有层
                                        $.ajax({
                                            url:urlstore,
                                            type:"get",
                                            
                                            success:function(data){
                                                var s=JSON.parse(data);
                                                
                                                if(s.data!=null&&s.data!=undefined&&s.data!=""&&s.data!='false'){
                                                    app.hasData=true
                                                
                                                }else{
                                                    app.hasData=false;
                                                    
                                                }
                                                app.entity=s;
                                            },
                                
                                        })
                                    },

                                })
                                
                                }
                                
                            ,btn1: function(index, layero){
                                
                                    layer.close(index);
                            }
                            ,btnAlign: 'r'


                        });
                        

                        }
                    })
                    $("#delete-exams").click(function(e){
                        if(app.isSelect){
                            var m=app.selectId;
                            var str="";
                            for(var i=0;i<app.selectId.length;i++){
                                str=str+app.selectId[i]+",";
                            }
                            console.log(str)
                            $.ajax({
                                url:"/seeyon/paperController.do?method=delPapers",
                                type:"post",
                                data:{"exid":str},
                                success:function(data){
                                    alert("删除成功");
                                    $.ajax({
                                        url:urlstore,
                                        type:"get",
                                        data:"",
                                        success:function(data){
                                            var s=JSON.parse(data);
                                            
                                            if(s.data!=null&&s.data!=undefined&&s.data!=""&&s.data!='false'){
                                                app.hasData=true
                                            
                                            }else{
                                                app.hasData=false;
                                                
                                            }
                                            app.entity=s;
                                        },
                            
                                    })
                
                                },
                            });
                            
                        }
                                

                                
                            


                        
                    })
                    $("#searchnn").click(function(e){
                         var title=$('#searchmm').val()
                         console.log(title)
                         urlstore="/seeyon/paperController.do?method=paperPage&catid=all&page=1&limit=10&title="+title
                        $.ajax({
                            url:urlstore,
                           
                            type:"get",
                            
                            success:function(data){
                                var s=JSON.parse(data);
                                if(s.data!=null&&s.data!=undefined&&s.data!=""&&s.data!='false'){
                                    app.hasData=true
                                allSize= s.count
                                
                                
                                }else{
                                    app.hasData=false;
                                }
                                app.entity=s;
                                fenye(allSize,'all')
                            },
                
                        })
                                

                                
                            


                        
                    })
                  

       
            
            
                  
          });      

       
        



        })
   