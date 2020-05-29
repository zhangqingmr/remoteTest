$(function(){
     //全局变量，存储试题勾选Id
     var examId=[];
     var urlStore="/seeyon/questionController.do?method=getPageQuestion&catId=all"
    layui.use('table', function(){
        var table = layui.table;

      //数据列表
      function dataList(url){
          var i=0;
            table.render({
              elem: '#datalist'
              
              ,id:"datazq"
              ,url: url //数据接口
              ,page: true //开启分页
              
              ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left', width:'5%'}
                ,{type: 'numbers',title: '#', fixed: 'left', width:'5%'}
              /*  ,{field: 'qid', title: '#', width:'5%',  fixed: 'left',align:"center",templet: function(d){
                    i++;
                    return i;
                  }}*/
                ,{field: 'title', title: '试题标题', width:'35%',align:"center"}
                ,{field: 'labels', title: '试题标签', width:'10%',align:"center"}
                ,{field: 'createUser', title: '作者', width:'10%',align:"center"} 
                ,{field: 'catname', title: '试题分类', width: '10%',align:"center"}
                ,{field: 'qtypename', title: '题型', width: '7%',align:"center"}
                ,{field: 'score', title: '分数', width: '8%',align:"center"}
                ,{field: 'qid', title: '操作', width: '10%',align:"center",templet: function(d){
                    return "<a class='' href='/seeyon/exammodule/exam-admin/examProduct.html?problemId="+d.qid+"' style='color:rgba(29, 141, 255, 1)'> 编辑</a>"
                  }}
                
              ]]
            
            });

            var a= $("#datalist").siblings(".layui-border-box").attr("lay-filter");
          
            //数据列表监听全选
            table.on('checkbox(test)', function(obj){
                var checkStatus = table.checkStatus('datazq');
                console.log(checkStatus.data) //获取选中行的数据
                examId.splice(0,examId.length);  
                
                    for(var i=0;i<checkStatus.data.length;i++){
                        if(examId.indexOf(checkStatus.data[i].qid)==-1){
                            examId.push(checkStatus.data[i].qid);
                        }
                        
                    }
                
            });
            // table.on('row(test)', function(obj){
            //     var a=obj.data.qid;
            //     console.log(a)
               
            //     window.open('/seeyon/exammodule/exam-admin/examProduct.html?problemId='+a)
  
                
            // });
            
        
      }
      
      //生成树
      function menuzq(node){
        var item={
            "create" :{
                "separator_before": false,
                "separator_after": true,   
                "_disabled": false, 
                "label": "新增", 
                "action": function (data) {  
                      
                    var inst = $.jstree.reference(data.reference),
                         obj = inst.get_node(data.reference);//获得当前节点,可以拿到当前节点所有属性  
                      var id = obj.id;     //新加节点,以下三行代码注释掉就不会添加节点    
                       
                      inst.create_node(obj,{text:"新建分类"},"last",function(new_node){
                                var instnew = $.jstree.reference(new_node),
                                    objnew= inst.get_node(new_node);  
                                var parent=new_node.parent;
                                var text=new_node.text;
                                var oldname = new_node.name;     
                    
                                instnew.edit(objnew,0,function(node, status, cancelled){
                                    if(status){
                                        var newname=node.text;
                                        $.ajax({
                                           
                                            url:"/seeyon/problemCategory.do?method=newCategory",
                                            type:"post",
                                           
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
                }
            },
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
                                url:"/seeyon/problemCategory.do?method=renameCartegory",
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
                        url:"/seeyon/problemCategory.do?method=delCartegory",
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
     $('#exam-tree').on('move_node.jstree', function(e,data){
                    
                var parent=data.node.parent;
                var id=data.node.id;
                var text=data.node.text;
                console.log(parent);
                console.log(id);
                
                $.ajax({
                url:"/seeyon/problemCategory.do?method=moveCartegory",
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
                    'url':"/seeyon/problemCategory.do?method=getAllCategoryTree",
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
            "plugins" : [ "state", "types", "wholerow","contextmenu" ,'dnd','search'],
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

  
    $('#exam-tree').bind("activate_node.jstree", function (obj, e) {
        var id=e.node.id;
        if(e.node.id=='all'){
            
        }else{
            catId=e.node.id;
        }
        
        urlStore= '/seeyon/questionController.do?method=getPageQuestion&catId='+id
        dataList(urlStore)
       

});
    //新建根分类
    $("#create-top-category").click(function(e){
        var inst=  $.jstree.reference("#exam-tree");
        var obj= inst.get_node("")
        inst.create_node("#",{text:"新建分类"},"last",function(new_node){
               var instnew = $.jstree.reference(new_node),     //取得新建的子节点
                          objnew= inst.get_node(new_node);
                 var parent=new_node.parent;                 
               var text=new_node.text;
               var oldname = new_node.name;     
         
          instnew.edit(objnew,0,function(node, status, cancelled){
              if(status){
                  var newname=node.text;
                  $.ajax({
                      //url:"/seeyon/coursecategory.do?method=renameCartegory",
                      url:"/seeyon/problemCategory.do?method=newCategory",
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

    //搜索
        $("#exam-tree").bind("select_node.jstree", function (e, data) { 
                if(data.node.id !="all"||data.node.id !="0"){    //排除第一个节点(2011民事案由) 
                data.instance.toggle_node(data.node); //单击展开下面的节点 
                } 
        });
        var to = false; 
        $('#search-input').keyup(function () { 
        if(to) { 
        clearTimeout(to); 
        } 
        
        to = setTimeout(function () { 
        $('#exam-tree').jstree(true).search($('#search-input').val()); 
        
        }, 250); 
        });

      dataList('/seeyon/questionController.do?method=getPageQuestion&catId=all');
      //新增试题
      $("#add-exam").click(function(e){
        window.location.href="/seeyon/exammodule/exam-admin/examProduct.html"
      })
      //题库查重
      $("#check-exam").click(function(e){
        alert("1")
    })
    //导入试题
    $("#import-exam").click(function(e){
        alert("2")
    })
    //导入所选试题
    $("#importCheck-exam").click(function(e){
        alert("3")
    })
    //移动到分类
    $("#move-exam").click(function(e){
        if(examId!=null&&examId!=""){
            layui.use('layer', function(){
                var layer = layui.layer;
                
                    layer.open({
                        type: 2, 
                        title:"试题分类",
                        content: '/seeyon/exammodule/exam-admin/examClassify.html' ,
                        area: ['350px', '400px'],
                        btn: ['确定', '取消', ],
                        yes: function(index, layero){
                            var strzq=""
                            for(var i=0;i<examId.length;i++){
                                strzq=strzq+examId[i]+",";
                            }
                            
                        var body = layer.getChildFrame('body', index);
                        var sonId=body.find('#sonId').val();
                        console.log(sonId)
                        console.log(body.find('#sonId').val())
                               $.ajax({
                                url:"/seeyon/questionController.do?method=removeCategory",
                                type:"post",
                                data:{"catid":sonId,"qid":strzq},
                                success:function(data){
                                    layer.closeAll(); //疯狂模式，关闭所有层
                                    dataList(urlStore);
                                   
                                },
    
                               })
                               
                            }
                            
                         ,btn1: function(index, layero){
                             
                                layer.close(index);
                        }
                        ,btnAlign: 'r'
    
    
                      });
                    })
                    }else{
                        alert("勾选项不能为空")
                    }
             
    })
    //删除试题
    $("#delete-exam").click(function(e){
        var strzq=""
            for(var i=0;i<examId.length;i++){
                strzq=strzq+examId[i]+",";
            }
        $.ajax({
            url:"/seeyon/questionController.do?method=delQuestionById",
            type:"post",
            data:{"qid":strzq},
            success:function(data){
              alert("删除成功");
              dataList(urlStore);
            },

        })
    })
    //搜索 btn-search-question
    $("#btn-search-question").click(function(e){
        var key=$("#searchtitle").val();
        console.log(key)
        var ul="/seeyon/questionController.do?method=getPageQuestion&catId=all&title="+key;
      dataList(ul)
    })

 
    });
})