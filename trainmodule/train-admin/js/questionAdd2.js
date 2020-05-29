var app=new Vue({
    el:'#app',
    data:{
        exam:{'exid':'','catid':'','catName':'','selectQuestionType':'0','selectQuesTypeText':'','status':'','statusText':'','desc':'','startTime':'','':'',
        'endTime':'', 'imgUrl':'','keywords':'','createTime':'','createTime':'','createUser':'','createUserName':'','updateUser':'','updateUserName':'','enabled':'','enabledName':'',

             
            'questions':[],'randomCatS':[],'title':'请填写标题','examTime':'0','examScore':'0','count':'0','part':'0'},
        questions:[],
        hasSingle:false,
        hasMore:false,
        hasTK:false,
        hasYD:false,
        selectId:[],
        questionSon:[],
        
        
    },  
    methods:{
     
        zhankai2:function(e){
            var target=e.target
            var m=$(target).siblings(".fa").hasClass('fa-angle-up')
            console.log(m)
            
            if(!m){
                $(target).html('收缩')
                $(target).siblings('.fa').addClass("fa-angle-up");
                $(target).siblings('.fa').removeClass("fa-angle-down");
                $(target).parent().siblings(".selected-category-expand-details").css('display','block');
              
            }else{
                $(target).html('展开')
                $(target).siblings('.fa').addClass("fa-angle-down");
                $(target).siblings('.fa').removeClass("fa-angle-up");
                $(target).parent().siblings(".selected-category-expand-details").css('display','none');
            }
            
            
            
        },
        zhankai:function(e){
            var target=e.target
            var m=$(target).parent().hasClass('ques-answers')
            if(m){
                var a=$(target).siblings('.wrong').css('display');
                var needMax=$(target).parent().siblings('p')
               
            if(a=='none'){
                $(target).html('收缩<i class="fa fa-angle-up"></i>')
                $(target).siblings('.wrong').css('display','block');
                $(target).siblings('.question-analysis ').css('display','block');
                $(target).parent().siblings('.question-option-list').css('display','block');
                needMax.removeClass('need-max-height');
            }else{
                
                $(target).html('展开<i class="fa fa-angle-down"></i>');
                $(target).siblings('.wrong').css('display','none');
                $(target).siblings('.question-analysis ').css('display','none');
                $(target).parent().siblings('.question-option-list').css('display','none');
                needMax.addClass('need-max-height');
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
             checkedSome:function(question){
                 //点击checkbox，判断是不是对勾
                 
                        var is= $("#"+question.qid).prop("checked")
               
                        if(is){
                            //是 push
                            app.selectId.push(question.qid);
                        }else{
                            $("#checkAll-zq").prop("checked",false);
                            //不是，判断有这个Id吗，从id去掉
                            if(app.selectId.indexOf(question.qid)!=-1){
                                for(var i=0;i<app.selectId.length;i++){
                                    if(app.selectId[i]==question.qid){
                                        app.selectId.splice(i,1)
                                    }
                                }
                                
                            }
                        }
                 
                
               
             },
             checkedAll:function(){
                 //全选
                 var is=$("#checkAll-zq").prop("checked");
               
                        if(is){
                            
                            for(var i=0;i<app.questions.length;i++){
                                //改变所有对勾的状态为true
                                $("#"+app.questions[i].qid).prop("checked",true);
                                //在selectId中没有时候，才加入
                                if(app.selectId.indexOf(app.questions[i].qid)==-1){
                                    app.selectId.push(app.questions[i].qid);
                                }
                            }
                        }else{
                            
                            for(var i=0;i<app.questions.length;i++){
                                //改变所有对勾状态为false
                                $("#"+app.questions[i].qid).prop("checked",false);
                                //在selectId中去掉
                                app.selectId.splice(app.questions[i],1)
                                }
                        }
               
                 
                     
             },
        
        
             deleteMany:function(){
                
                            if(app.selectId.length==0){
                            alert('至少勾选一项')
                        }else{
                            for(var i=0;i<app.selectId.length;i++){
                                
                                for(var k=0;app.questions.length;k++){
                                    
                                    if(app.questions[k].qid==app.selectId[i]){
                                        app.selectId.splice(i,1)
                                        app.questions.splice(k,1);
                                        
                                        break;
                                    }
                                }

                            }
                            $("input[type='checkbox']").prop('checked',false)
                        }
                 
                 
             },
             tiUp:function(index){
            

                var i=parseInt(index);
                  if(i==0){
                      alert("已经是第一道题啦。")
                  }else{
                      var tempOption = this.questions[i - 1];
                       this.$set(this.questions, i - 1, this.questions[i]);
                      this.$set(this.questions, i, tempOption)
                  }
              }
              ,tiDown:function(index){
               
                var i=parseInt(index);
                  if(i>=app.questions.length-1){
                      alert("已经是最后一道题啦。")
                  }else{
                       var tempOption = this.questions[i +1];
                       this.$set(this.questions, i + 1, this.questions[i]);
                       this.$set(this.questions, i, tempOption)
                  }
              },
             deleteSingle:function(question){
                 var m=question.qid
                 for(var k=0;app.questions.length;k++){
                              if(app.questions[k].qid==m){
                                 app.questions.splice(k,1)
                                 break;
                              }
                          }
                          $("input[type='checkbox']").prop('checked',false)
             }
        
    },
    computed:{
        allCount:function(){
           
                return this.questions.length;
          
           
        },
       
    }

})