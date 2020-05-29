$(function () {
               
            var studentId=[];
            var catId="0"
            var urlStore="/seeyon/examinee.do?method=getExamineePage&catId=all"
           

                layui.use(['table','layer'], function(){
                    var table = layui.table;
                    var layer = layui.layer;
                  //数据列表
                  function dataList(url){
                      var i=0;
                        table.render({
                          elem: '#tablelist'
                          ,id:"datazq"
                          ,url: url //数据接口
                          ,page: true //开启分页
                          
                          ,cols: [[ //表头
                            {type: 'checkbox', fixed: 'left', width:'5%'}
                            ,{field:'stuid',type: 'numbers',title: '#', fixed: 'left', width:'5%'}
                          /*  ,{field: 'rsid', title: '#', width:'5%',  fixed: 'left',align:"center",templet: function(d){
                                i++;
                                return i;
                              }}*/
                            ,{field: 'userName', title: '姓名', width:'35%',align:"center"}
                            ,{field: 'groupNmae', title: '默认分类', width:'45%',align:"center"}
                            
                            ,{field: 'userid', title: '操作', width: '10%',align:"center",templet: function(d){
                                return "<span class='deleteU'  id='"+d.userid+"' style='color:rgba(29, 141, 255, 1);cursor:pointer'>删除</span>"
                              }}
                            
                          ]]
                        
                        });
            
                        var a= $("#datalist").siblings(".layui-border-box").attr("lay-filter");
                      
                        //数据列表监听全选
                        table.on('checkbox(test)', function(obj){
                            var checkStatus = table.checkStatus('datazq');
                            studentId.splice(0,studentId.length);  
                
                            for(var i=0;i<checkStatus.data.length;i++){
                                if(studentId.indexOf(checkStatus.data[i].userid)==-1){
                                    studentId.push(checkStatus.data[i].userid);
                                }
                                
                            }
                            console.log(studentId)
                            
                            
                        });
                        
                    
                  }
                  dataList(urlStore)
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
                                                    
                                                        url:"/seeyon/examineeCategory.do?method=newCategory",
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
                                            url:"/seeyon/examineeCategory.do?method=renameCartegory",
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
                               
                                $.ajax({
                                    url:"/seeyon/examineeCategory.do?method=delCartegory",
                                    type:"post",
                                    data:{"id":id},
                                    success:function(data){
                                       var res=JSON.parse(data);
                                       var code=res.code;
                                       console.log(code)
                                       var msg=res.mgs
                                       if(code=='0'){
                                        inst.delete_node(obj)
                                       }else{
                                           alert('删除失败'+res.mgs)
                                       }
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
                $('#studentTree').on('move_node.jstree', function (e, data) {

                    var parent = data.node.parent;
                    var id = data.node.id;
                    var text = data.node.text;
                    console.log(parent);
                    console.log(id);

                    $.ajax({
                        url: "/seeyon/examineeCategory.do?method=moveCartegory",
                        type: "post",
                        data: { "id": id, "parent": parent },
                        success: function (data) {
                            console.log("移动节点：" + text);
                        },

                    })

                }).jstree({
                    "core": {
                        "animation": 0,
                        "themes": { "dots": true, "icons": true, "stripes": false },
                        "check_callback": true,
                        "multiple": false,
                        'data': {
                            'url': "/seeyon/examineeCategory.do?method=getAllCategoryTree",
                        }
                    },
                    "types": {
                        "#": {
                            "max_children": -1,//无穷多个           #代表根节点id
                            "max_depth": -1,

                        },
                        "default": {
                            "icon": "jstree-folder",           //所有没设定的属性都按照default来.
                            "valid_children": ["default", "text"]
                        },
                        "text": {
                            "icon": "false",
                            "valid_children": []
                        }
                    },
                    "plugins": [ "types", "wholerow", "contextmenu", 'dnd', 'search',],
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
                                if (nodes[i].id == "all" || nodes[i].id <= 0) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    },
                });


                $('#studentTree').bind("activate_node.jstree", function (obj, e) {
                    var id = e.node.id;
                    if (e.node.id == 'all') {

                    } else {
                        catId = e.node.id;
                    }

                    urlStore = '/seeyon/examinee.do?method=getExamineePage&catId=' + id
                    dataList(urlStore)


                });
                //新建根分类
                $("#create-top-category").click(function (e) {
                    var inst = $.jstree.reference("#studentTree");
                    var obj = inst.get_node("")
                    inst.create_node("#", { text: "新建分类" }, "last", function (new_node) {
                        var instnew = $.jstree.reference(new_node),     //取得新建的子节点
                            objnew = inst.get_node(new_node);
                        var parent = new_node.parent;
                        var text = new_node.text;
                        var oldname = new_node.name;

                        instnew.edit(objnew, 0, function (node, status, cancelled) {
                            if (status) {
                                var newname = node.text;
                                $.ajax({
                                    //url:"/seeyon/coursecategory.do?method=renameCartegory",
                                    url: "/seeyon/examineeCategory.do?method=newCategory",
                                    type: "post",
                                    // data:{"id":id,"text":newname},
                                    data: { "parent": parent, "text": newname },
                                    success: function (data) {
                                        console.log("新建并且重命名为：" + newname);
                                        var s = JSON.parse(data);

                                        instnew.set_id(node, s.catid);
                                        instnew.set_text(node, s.catname);
                                    },

                                })

                            } else {
                                instnew.set_text(oldname);
                            }
                        });


                    });
                })

                //搜索
                $("#studentTree").bind("select_node.jstree", function (e, data) {
                    if (data.node.id != "all" || data.node.id != "0") {    //排除第一个节点(2011民事案由) 
                        data.instance.toggle_node(data.node); //单击展开下面的节点 
                    }
                });
                var to = false;
                $('#categories-search').keyup(function () {
                    if (to) {
                        clearTimeout(to);
                    }

                    to = setTimeout(function () {
                        $('#studentTree').jstree(true).search($('#categories-search').val());

                    }, 250);
                });



                  $('#addMember').click(function(e){
                    layer.open({
                        type: 2, 
                        title:"添加学生",
                        content: '/seeyon/exammodule/student-admin/addStudent.html',
                        area: ['500px', '400px']
                        ,btnAlign: 'r'
      
      
                      });
                })
                $('#zjMember').click(function(e){
                    layer.open({
                        type: 2, 
                        title:"追加分组",
                        content: '/seeyon/exammodule/student-admin/studentClassify.html' ,
                        area: ['350px', '400px'],
                        btn: ['确定', '取消', ],
                        yes: function(index, layero){
                            

                            var strzq=""
                            for(var i=0;i<studentId.length;i++){
                                if(i==studentId.length-1){
                                    strzq=strzq+studentId[i];
                                }else{
                                    strzq=strzq+studentId[i]+",";
                                }
                               
                            }
                            console.log(strzq)
                            
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = parent.window[layero.find('iframe')[0]['name']];
                            //获取勾选的值id
                            var nodeIds=iframeWin.sel;
                            var caid=''
                            for(var i=0;i<nodeIds.length;i++){
                                if(i==nodeIds.length-1){
                                    caid=caid+nodeIds[i]
                                }else{
                                    caid=caid+nodeIds[i]+","
                                }
                               
                            }
                            
                            
                            console.log(nodeIds)
                            
                               $.ajax({
                                url:"/seeyon/examinee.do?method=AddExamineeCategory",
                                type:"post",
                                data:{"catid":caid,"stuid":strzq},
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
                $('#moveMember').click(function(e){
                    layer.open({
                        type: 2, 
                        title:"追加分组",
                        content: '/seeyon/exammodule/student-admin/studentClassify.html' ,
                        area: ['350px', '400px'],
                        btn: ['确定', '取消', ],
                        yes: function(index, layero){
                            

                            var strzq=""
                            for(var i=0;i<studentId.length;i++){
                                if(i==studentId.length-1){
                                    strzq=strzq+studentId[i];
                                }else{
                                    strzq=strzq+studentId[i]+",";
                                }
                               
                            }
                            console.log(strzq)
                            
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = parent.window[layero.find('iframe')[0]['name']];
                            //获取勾选的值id
                            var nodeIds=iframeWin.sel;
                            var caid=''
                            for(var i=0;i<nodeIds.length;i++){
                                if(i==nodeIds.length-1){
                                    caid=caid+nodeIds[i]
                                }else{
                                    caid=caid+nodeIds[i]+","
                                }
                               
                            }
                            console.log(nodeIds)
                            
                               $.ajax({
                                url:"/seeyon/examinee.do?method=removeExamineeCategory",
                                type:"post",
                                data:{"catid":caid,"userids":strzq},
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
               
                $(document).on('click', '.deleteU', function() {

                    var userid=$(this).attr('id')
                    $.ajax({
                        url:"/seeyon/examinee.do?method=delExaminee",
                        type:"post",
                        data:{"userid":userid},
                        success:function(data){
                            var res=JSON.parse(data)
                            var code=res.code
                            if(code==0){
                                dataList(urlStore);
                            }else(
                                alert(res.mgs)
                            )

                           
                           
                        },

                       })
                })
                function typeSearch(type){
                    var m=''
                    var para=$('#searchUser').val()
                    
                    if(type==1){
                        m='userName'
                    }
                    urlStore="/seeyon/examinee.do?method=getExamineePage&"+m+"="+para;
                   dataList(urlStore)
                }
                $('#searchBtn').click(function(e){
                    var type=$('#searchType').val()
                    if(type==1){
                        typeSearch(1)
                    }
                })
                })

             

    })