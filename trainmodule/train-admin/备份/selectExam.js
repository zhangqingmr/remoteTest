var examObj=[];
$(function(){
     //全局变量，存储试题勾选Id
     
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
                examObj=checkStatus.data  
                console.log(obj)
            //    parent.app.questions=examObj;
                parent.app.questionSon=examObj
                
              


                
            });
           
        
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
      
   
    
    //搜索 btn-search-question
    $("#btn-search-question").click(function(e){
        var key=$("#searchtitle").val();
        console.log(key)
        var ul="/seeyon/questionController.do?method=getPageQuestion&catId=all&title="+key;
      dataList(ul)
    })

 
    });
})