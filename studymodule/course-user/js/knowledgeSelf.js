$(function(){
    //全局变量，存储课件勾选Id
    var resourceId=[];
    var catId="0"
    var urlStore="/seeyon/resource.do?method=getMyResocrcePage&catId=all"
    var urlResource="";
    layui.use(['table','layer'], function(){
        var table = layui.table;
        var layer = layui.layer;
      //数据列表
      function dataList(url){
          var i=0;
            table.render({
              elem: '#datalist',
              skin: 'line' //行边框风格
             ,even: true //开启隔行背景
             
              ,id:"datazq"
              ,url: url //数据接口
              ,page: true //开启分页
              
              ,cols: [[ //表头
                {type: 'numbers',title: '#', fixed: 'left', width:'7%'}
              
                ,{field: 'fileName', title: '文件名', width:'38%',align:"center"}
                ,{field: 'reTypeName', title: '类型', width:'10%',align:"center"}
                ,{field: 'size', title: '大小', width:'10%',align:"center"} 
                ,{field: 'createTime', title: '上传时间', width: '10%',align:"center"}
                ,{field: 'categoryName', title: '分类', width: '15%',align:"center"}
                ,{field: 'rsid', title: '操作', width: '10%',align:"center",templet: function(d){
                    if(d.reType==1||d.reType==2){
                        return "<a class='glyphicon glyphicon-eye-open' href='/seeyon/studymodule/course-user/coursePlayVideo.html?state=study&rsId="+d.rsid+"' style='color:rgba(29, 141, 255, 1)'></a>"
                    }else if(d.reType==0||d.reType==3||d.reType==4){
                        return "<a class='glyphicon glyphicon-eye-open' href='/seeyon/studymodule/course-user/coursePlayOthers.html?state=study&rsId="+d.rsid+"' style='color:rgba(29, 141, 255, 1)'></a>"
                    }else{
                        return "<a class='glyphicon glyphicon-eye-open' href='/seeyon/studymodule/course-user/coursePlayOthers.html?state=study&rsId="+d.rsid+"' style='color:rgba(29, 141, 255, 1)'></a>"
                    }
                  }}
                
              ]]
            
            });

            var a= $("#datalist").siblings(".layui-border-box").attr("lay-filter");
          
            //数据列表监听全选
            table.on('checkbox(test)', function(obj){
                var checkStatus = table.checkStatus('datazq');
                console.log(checkStatus.data) //获取选中行的数据
                resourceId.splice(0,resourceId.length);  
                
                    for(var i=0;i<checkStatus.data.length;i++){
                        if(resourceId.indexOf(checkStatus.data[i].rsid)==-1){
                            resourceId.push(checkStatus.data[i].rsid);
                        }
                        
                    }
                
            });
            
        
      }
      dataList('/seeyon/resource.do?method=getMyResocrcePage&catId=all');
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
                                           
                                            url:"/seeyon/resourceCategory.do?method=newCategory",
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
                                url:"/seeyon/resourceCategory.do?method=renameCartegory",
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
                        url:"/seeyon/resourceCategory.do?method=delCartegory",
                        type:"post",
                        data:{"id":id},
                        success:function(data){
                            console.log("删除节点id为："+id);
                        },

                    })
                       
                 }
             },
            "grant" :{
                "separator_before": false,
                "separator_after": true,   
                "_disabled": false, 
                "label": "授权", 
                "action": function (data) {  
                      
                    var inst = $.jstree.reference(data.reference),
                         obj = inst.get_node(data.reference);//获得当前节点,可以拿到当前节点所有属性  
                      var id = obj.id;     //新加节点,以下三行代码注释掉就不会添加节点    
                      layer.open({
                        type: 2, 
                        title:"授权",
                        content: '/seeyon/studymodule/course-admin/resourceGrant.html?catid='+id ,
                        area: ['500px', '400px']
                        ,btnAlign: 'r'
      
      
                      });
                }
            },
            
        }
        if(true){
                delete item.create;
                delete item.rename;
                delete item.delete;
                delete item.grant;
        }
        return item;
    }
     $('#folder_tree').on('move_node.jstree', function(e,data){
                    
                var parent=data.node.parent;
                var id=data.node.id;
                var text=data.node.text;
                console.log(parent);
                console.log(id);
                
                $.ajax({
                url:"/seeyon/resourceCategory.do?method=moveCartegory",
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
                    'url':"/seeyon/resourceCategory.do?method=getMyCategoryTree",
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

  
    $('#folder_tree').bind("activate_node.jstree", function (obj, e) {
        var id=e.node.id;
        if(e.node.id=='all'){
            
        }else{
            catId=e.node.id;
        }
        
        urlStore= '/seeyon/resource.do?method=getMyResocrcePage&catId='+id
        dataList(urlStore)
       

});
    $('.theme-btn').click(function(e){
        var key=$("#searchresource").val();
        var ul='/seeyon/resource.do?method=getMyResocrcePage&catId=all&fileName='+key;
        dataList(ul)
    })
    
    
});
})