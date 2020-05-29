var app = new Vue({
    el: '#app',
    data: {
     isview:false,  //有章节
      hasResource:false,//有资源
     isZj:true,
      index:0,
      
      newIndex:-1,
      course: {'coid':'',    'catName':'',    'title':'',   'description':'',  'catid':"",
               'keywords':"",   'level':"",      'duration':"30",    'points':"5"  ,  
               'imgurl':"",
                },  
      //服务基本信息
     
     chapterIsNUll:false,
     list :[],
     selected:{"chid":"","title":"","coid":"","description":"","index":0,"resourceList":[]},
     selectResource:{"coid":"","caid":"","rsid":"","title":"","sort":"","duration":"","points":"",'uid':''}
     
        
    },
    methods:{
        viewZj:function(chapter,index){ //浏览章节， 把遍历的章节给选中的章节去显示，用isView--有章节和isZj 是章节去控制右侧列表
            
            app.isZj=true;              //左侧列表点击以后，selected赋值，右侧列表显示，index是第几个。
            app.hasResource=false    
            app.selected=chapter;
            app.selected.index=index;
        },
        viewResource:function(resource,index){//浏览资源， hasResource--有资源和isZj 是章节去控制右侧列表。index在删除资源时候有用。
            
            app.isZj=false;
            app.index=index    
            app.hasResource=true             
            
            app.selectResource=resource;
        },
        removeResource:function(list,index,chapter){
            
           var rs=  list[index].rsid;;                               //把章节传过来了，Index是资源在章节的位置。
           app.hasResource=false
                                                                    
            $.ajax({
            url:"/seeyon/resource.do?method=deleteRelationById",
            type:"post",
            data:{"rsIds":rs},
            success:function(data){
                list.splice(index,1)                                  //章节清空资源，Index是资源在章节的位置。
                if(rs==app.selectResource.rsid){                    //如果你删除的资源和选中的资源相同，长度为0时候，选中的都为空。不为0时候默认显示第一个。
                    
                    if(list.length==0){  
                        
                        app.selectResource={"coid":"","caid":"","rsid":"","title":"","sort":"","duration":"","points":"",'uid':''}
                    }else{
                       
                        app.selectResource=list[0];
                    }
                }else{
                  
                }
            },

            })

        },
        removeZj:function(index){
           
       var chamId= app.list[index].chid;
       $.ajax({
        url:"/seeyon/courseadmin.do?method=deleteChaperById",
        type:"post",
        data:{"chapids":chamId},
        success:function(data){
          var chid=app.list[index].chid;                //删除列表中的章节，即 vue中的      
          app.list.splice(index,1)
          if(chid=app.selected.chid){
            if(app.list.length==0){         //如果你删除的章节和选中的章节相同，长度为0时候，选中的都为空。不为0时候默认显示第一个。
                app.isview=false;
                
                app.selected={"chid":"","title":"","coid":"","description":"","index":"","resourceList":""}
                }else{
                
                    app.selected=app.list[0];
                }
          }else{
              
          }
          

        },

       })
      
        },
          

    }
      
  });