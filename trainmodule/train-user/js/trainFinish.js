var reqparams = new Object();
var url = location.search; //获取url中"?"符后的字串  


if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {

        reqparams[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

    }

}
var reid = reqparams["reid"];  //修改 查看必须传id


if(reid!=null&&reid!=''&&reid!=undefined){
    $.ajax({
                url:"/seeyon/userTrainProgram.do?method=showMyTrainById",
                type:"post",
                data:{"reid":reid},
                success:function(data){
            
                    var res=JSON.parse(data);
                
                    var code=res.code;

                    if(code==0){
                        var m= res.data.grade;
                        
                            
                            app.exam=res.data;
                            app.questionAll=res.data.trainQuestion
                        
                       
                      }else{
                        alert(res.mgs)
                    }
                    
                    
                },
                });
}

var app=new Vue({
    el:"#app",
    data:{
        
        exam:{'exid': '', "reid":"", "title":"测试1",    "examTime":"60", "userScord":"", "examScord":"90", "userScord":"","question":[],
            'rightNumber': '1','errorNumber': '1','userName':'1','startTime':'','endTime':'','second':[]
            },
        questionAll:[
               {
                'userScore':"1",'userAnswer':"B",'rightAnswer':'B','score':"10","qid":"111",  "qtype":"1", "qtypeName":"单选题", "title":"例题1", "":"","options":[
                {"sort":"A","title":"哈哈哈","checked":false,"":"","":"",},
                {"sort":"A","title":"哈哈哈","checked":false,"":"","":"",},
                {"sort":"A","title":"哈哈哈","checked":false,"":"","":"",}
            ], 
        }, {
            'userScore':"1",'userAnswer':"B",'rightAnswer':'A','score':"20","qid":"1121", "qtype":"4", "qtypeName":"填空题", "title":"例题2", "":"","options":[
                {"sort":"A","title":"哈哈哈","checked":false,"answer":"哈哈哈","":"",},
                {"sort":"A","title":"哈哈哈","checked":false,"answer":"AA","":"",},
                {"sort":"A","title":"哈哈哈","checked":false,"answer":"CQCQ","":"",}
            ], 
        }, {
            'userScore':"1",'userAnswer':"A",'rightAnswer':'A','score':"30","qid":"1141",  "qtype":"5", "qtypeName":"问答题", "title":"例题3", "":"","options":[
                {"sort":"A","title":"哈哈哈","checked":false,"":"","":"",},
                {"sort":"A","title":"哈哈哈","checked":false,"":"","":"",},
                {"sort":"A","title":"哈哈哈","checked":false,"":"","":"",}
            ], 
        },
        ]

    },
    methods:{
       

    },
    computed:{
        allNumber:function(){
            return this.questionAll.length
        },
        restNumber:function(){
           
           return parseInt(this.allNumber)-parseInt(this.exam.errorNumber)-parseInt(this.exam.rightNumber);
        },
        percentScore:function(){
            if(this.exam.examScord!=0){
                var percent=this.exam.userScord/this.exam.examScord*100
            }else{
                var percent=0 
            }
           
            return parseInt(percent);
        },
        userTime:function(){
            var ret=''
            for(var i=0;i<this.exam.second.length;i++){
                if(this.exam.second[i]!=0){
                    if(i==2){   ret=this.exam.second[2]+'分' }
                    if(i==3){ ret=ret+this.exam.second[3]+'秒'}
                    
                }else{
                    if(i==2){    }
                    if(i==3){ ret=ret+this.exam.second[3]+'秒'}
                }
            }
            return ret;
        }
        
    }
})

      $(document).on('click', '#guanbi', function() {
          window.location.href='/seeyon/studymodule/course-user/courseMoreRecord.html'
       })

