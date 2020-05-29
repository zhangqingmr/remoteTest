window.jiathis_config = {};
    (function ($, window, document) {
        'use strict';
        function menuzq(node){
            var item={
                "create" :{
                    "separator_before": false,
                    "separator_after": true,   
                    "_disabled": false, 
                    "label": "新增", 
                    "action": function (data) {  
                          
                       
                          }
                },
                "rename" :{
                    "separator_before": false,
                    "separator_after": true,   
                    "_disabled": false, 
                    "label": "重命名", 
                    "action": function (data) {  
                                  
                               
                         }
               },
               "delete" :{
                    "separator_before": false,
                    "separator_after": true,   
                    "_disabled": false, 
                    "label": "删除", 
                    "action": function (data) {  
                              
                           
                     }
                 },
            }
            if(node.parent=='#'){
                    delete item.create;
                    delete item.rename;
                    delete item.delete;
            }else if(node.parent=='#'){

            }
            return item;
        }
        $(function () {
           $('#zq').jstree({
            "core" : {
                "animation" : 0,
                "themes" : { "dots": true,"icons":true ,"stripes":false},
                "check_callback" : true,
                "multiple" : false,
                'data' :  [
                    { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
                    { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" ,'state' : {  'selected' : false },},
                    { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
                    { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
                 ]
        
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
            "plugins" : [  "types", "wholerow","contextmenu" ],
            "contextmenu": {
                
                 "items": menuzq
                }
        });


        var ref = $('#jstree').jstree(true),
        sel =  ref.create_node(sel, {"type":"text"}); 
        $("#create-top-category").click(function(e){
            ref.create_node(sel, {"type":"text"});
        });

            //设置左边分类管理页面高度
            var ww = window.innerWidth;
            var wh = window.innerHeight;
            var mh;
            if (ww >= 768) {
                mh = wh - 320;
                $(".categories-panel").css("height", wh);
                $("#categories-tree").css("max-height", mh);
            }
            if(ww > 768){
                $.setupCategoryPanelDragable();
            }
            $("#categories-tree").perfectScrollbar({});

            //预览闯关
            $(document).on("click","a[href='#preview']",function(e){
                e.preventDefault();
                var template = $("#preview-advance").text();
                var url = $(this).data("url");
                template = template.format(url);

                var jbox = new jBox('Modal', {

                    content: template,
                    preventDefault: true,
                    onCloseComplete: function(){
                        this.destroy();
                    },
                    onCreated: function (){
                        var self = this;
                    }
                })
            }).on('shown.bs.dropdown',"span.dropdown:last",function(e) {
                var examList = document.getElementById("exams-list");
                var examListScrollHeight = examList.scrollHeight;
                $("#exams-list .table-container").scrollTop(examListScrollHeight + 250);
            });


            //闯关新功能引导
                            var advanceGuide = localStorage.getItem("advanceGuide");
                if(!advanceGuide){
                    showGuide();
                    localStorage.setItem("advanceGuide",true);
                }
                        function showGuide(){
                introJs().setOptions({
                    /* 下一步按钮的显示名称 */
                    nextLabel: 'Next &rarr;',
                    /* 上一步按钮的显示名称 */
                    prevLabel: '&larr; Back',
                    /* 跳过按钮的显示名称 */
                    skipLabel: 'Skip',
                    /* 结束按钮的显示名称 */
                    doneLabel: '我知道了',
                    /* 引导说明框相对高亮说明区域的位置 */
                    tooltipPosition: 'bottom',
                    /* 引导说明文本框的样式 */
                    tooltipClass: 'introTip',
                    /* 说明高亮区域的样式 */
                    highlightClass: 'introTip',
                    /* 是否使用键盘Esc退出 */
                    exitOnEsc: true,
                    /* 是否允许点击空白处退出 */
                    exitOnOverlayClick: true,
                    /* 是否显示说明的数据步骤*/
                    showStepNumbers: false,
                    /* 是否允许键盘来操作 */
                    keyboardNavigation: true,
                    /* 是否按键来操作 */
                    showButtons: true,
                    /* 是否使用点点点显示进度 */
                    showBullets: false,
                    /* 是否显示进度条 */
                    showProgress: false,
                    /* 是否滑动到高亮的区域 */
                    scrollToElement: true,
                    /* 遮罩层的透明度 */
                    overlayOpacity: 0.8,
                    /* 当位置选择自动的时候，位置排列的优先级 */
                    positionPrecedence: ["bottom", "top", "right", "left"],
                    /* 是否禁止与元素的相互关联 */
                    disableInteraction: false,
                    /* 默认提示位置 */
                    hintPosition: 'top-middle',
                    /* 默认提示内容 */
                    hintButtonLabel: 'Got it'
                }).start();
            }

            //提示
            var setupUI = function(target){
                return function(){
                    $(target).find('.toolTip').jBox('Tooltip',{
                        theme: 'TooltipDark',
                        delayClose:1,
                        getContent:'title'
                    })
                }
            };

            setupUI($(".exams-panel"))();


        })
    })(jQuery, window, document);