var count=0;
var count1=0;
var data1=[]
var data2=[]
function getMytime(s){
    var h = Math.floor(s / 3600) < 10 ? Math.floor(s / 3600) : Math.floor(s / 3600);
    var m = Math.floor((s / 60 % 60)) < 10 ? Math.floor((s / 60 % 60)) : Math.floor((s / 60 % 60));
    var s = Math.floor((s % 60)) < 10 ? Math.floor((s % 60)) : Math.floor((s % 60));
    if (h == 0) {
        return result = m + "分" + s + "秒";
    } else {
        return result = h + "小时" + m + "分" + s + "秒";
    }
}
function add0(m) { return m < 10 ? '0' + m : m }
    //时间戳转化成时间格式
    function timeFormat(timestamp) {
        //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
    }
var  app=new Vue({
    el:"#app",
    data:{
       
        type:1,
    },
    methods:{
        changeType:function(type){
            app.type=type;
            
        }
    }
})
var date = new Date()
    var t1 = timeFormat(new Date(date.getTime() - 30 * 24 * 3600 * 1000))
    var t2 = timeFormat(date.getTime())
layui.use(['laypage', 'layer','laydate','table'], function(){
    var laydate = layui.laydate;
    var laypage=layui.laypage;
    var table=layui.table;
    
    //渲染开始时间
    laydate.render({
        elem: '#test1' //指定元素
        ,value: new Date(date.getTime()-30*24*3600*1000)
        ,format:'yyyy-MM-dd'
        ,max: date.getTime()
    });
    //渲染结束时间
    laydate.render({
        elem: '#test2' //指定元素
        ,value: date
        ,format:'yyyy-MM-dd'
        ,max: date.getTime()
        
    });
    function getData(type,starTime,endTime){
        var url="/seeyon/studyStatistics.do?method=learnStatistics&selType="+type+"&startTime="+starTime+"&endTime="+endTime;
        $.ajax({
        url:url,
        type:"get",
        async:false,
        success:function(data){
        var entity=JSON.parse(data);
            if(entity.code==0){
                if(type==0){
                    data1=entity.data
                    table.render({
                        elem: '#table1'
                        , height: 640
                        , data: data1
                        , page: true //开启分页
                        ,initSort: {
                            field: 'memberName' //排序字段，对应 cols 设定的各字段名
                            ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
                          }
                        , cols: [[ //表头
                            { field: 'coid', title: '#', type: 'numbers', width: '20%', fixed: 'left',align:'center' }
                            , { field: 'memberName', title: '姓名', width: '20%',align:'center',sort:true }
                            , { field: 'title', title: '课程名称', width: '20%',align:'center' }
                            , {
                                field: 'learnDuration', title: '播放时长', width: '20%',align:'center', templet: function (d) {
                                   
                                    return getMytime(d.learnDuration)
                                }
                            }
                            , { field: 'learnTime', title: '播放次数', width: '20%' ,align:'center'}

                        ]]
                    });
                }else{
                    data2=entity.data
                    table.render({
                        elem: '#table2'
                        , height: 640
                        , data: data2
                        , page: true //开启分页
                        ,initSort: {
                            field: 'depName' //排序字段，对应 cols 设定的各字段名
                            ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
                          }
                        , cols: [[ //表头
                            { field: 'coid', title: '#', type: 'numbers', width: '20%', fixed: 'left',align:'center' }
                            , { field: 'depName', title: '部门', width: '20%',align:'center',sort:true }
                            , { field: 'title', title: '课程名称', width: '20%',align:'center' }
                            , {
                                field: 'learnDuration', title: '播放时长', width: '20%',align:'center', templet: function (d) {
                                    return getMytime(d.learnDuration)
                                }
                            }
                            , { field: 'learnTime', title: '播放次数', width: '20%' ,align:'center'}

                        ]]
                    });
                }
            }else{
                alert(entity.mgs)
            }
        },
    });
    }
  
    getData(0, t1, t2)
    //getData(1, t1, t2)
   
   
    
    $('#queding').click(function(){
        var  star=$("#test1").val()
       var end= $("#test2").val()
       if(app.type==1){
        getData(0, star, end)
       }else{
        getData(1, star, end)
       }
        
    })
    $('#name').click(function(){
        var  star=$("#test1").val()
       var end= $("#test2").val()
       
        getData(0, star, end)
       
    })
    $('#depar').click(function(){
        var  star=$("#test1").val()
       var end= $("#test2").val()
       
        getData(1, star, end)
       
    })
});