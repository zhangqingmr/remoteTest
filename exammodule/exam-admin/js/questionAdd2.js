var app=new Vue({
    el:'#app',
    data:{
        exam:{'exid':'','catid':'','catName':'','selectQuestionType':'0','selectQuesTypeText':'','status':'','statusText':'','desc':'','startTime':'','':'',
        'endTime':'', 'imgUrl':'','keywords':'','createTime':'','createTime':'','createUser':'','createUserName':'','updateUser':'','updateUserName':'','enabled':'','enabledName':'',

             
            'questions':[],'randomCatS':[],'title':'请填写标题','examTime':'0','examScore':'0','count':'0','part':'0','randomQuestion':false,'randomOptions':false},
        questions:[],
        type:1,
        randomCatS:[
      
                    
        ],
        hasSingle:false,
        hasMore:false,
        hasTK:false,
        hasYD:false,
        selectId:[],
        questionSon:[],
        
        
    },  
    methods:{
        changeType:function(type){
            
            layui.use('layer', function (e) {
                var layer = layui.layer
                layer.open({
                    type: 1, 
                    content: '<div style="margin:35px 35px;font-size:10px">您确定要修改组卷模式吗？切换后原有的试题将会无效</div>', //这里content是一个普通的String
                    title:'温馨提示',
                    btn: ['是', '否']
                    ,yes: function(index, layero){
                        
                        app.type=type
                        console.log(app.type)
                        if(type==app.type){
                            if(type==1){
                            app.questions=[],
                            app.selectId=[],
                            app.exam.questions=[]
                            app.exam.selectQuestionType=1;
                            
                        }else{
                            app.randomCatS=[],
                            app.selectId=[],
                            app.exam.randomCatS=[]
                            app.exam.selectQuestionType=0
                            
                        }
                        }
                        layer.close(index)
                    }
                    ,btn2: function(index, layero){
                        
                       layer.close(index)
                    }
                });
              
            })
            console.log(type==app.type)
           
            
        },
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
                console.log(needMax)
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
        viewInput:function(boo,e){

            var target=e.target
            if(boo){
                $(target).find('input').css('display','inline-block')
                $(target).find('span').css('display','none')
            }else{
                $(target).find('span').css('display','inline-block')
                $(target).find('input').css('display','none')
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
                 if(app.type==0){
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
                 }else{
                        var is= $("#"+question.catId).prop("checked")
                        
                        if(is){
                            //是 push
                            app.selectId.push(question.catId);
                        }else{
                            $("#checkAll-zq").prop("checked",false);
                            //不是，判断有这个Id吗，从id去掉
                            if(app.selectId.indexOf(question.catId)!=-1){
                                for(var i=0;i<app.selectId.length;i++){
                                    if(app.selectId[i]==question.catId){
                                        app.selectId.splice(i,1)
                                    }
                                }
                                
                            }
                        }

                 }
                
               
             },
             checkedAll:function(){
                 //全选
                 var is=$("#checkAll-zq").prop("checked");
               if(app.type==0){
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
               }else{
                        if(is){
                                
                                for(var i=0;i<app.randomCatS.length;i++){
                                    //改变所有对勾的状态为true
                                    $("#"+app.randomCatS[i].catId).prop("checked",true);
                                    //在selectId中没有时候，才加入
                                    if(app.selectId.indexOf(app.randomCatS[i].catId)==-1){
                                        app.selectId.push(app.randomCatS[i].catId);
                                    }
                                }
                            }else{
                                
                                for(var i=0;i<app.randomCatS.length;i++){
                                    //改变所有对勾状态为false
                                    $("#"+app.randomCatS[i].catId).prop("checked",false);
                                    //在selectId中去掉
                                    app.selectId.splice(app.randomCatS[i],1)
                                    }
                            }
               } 
                 
                 console.log(app.selectId);
                     
             },
             someCount:function(ra){
            var c=0;
            for(var i=0;i<ra.length;i++){
                c=c+parseInt(ra[i].count)
            }
            return c;
        },
        someScore:function(ra){
            var c=0;
            for(var i=0;i<ra.length;i++){
                c=c+parseInt(ra[i].score)
            }
            return c;
        },
        
             deleteMany:function(){
                 if(app.type==0){
                            if(app.selectId.length==0){
                            alert('至少勾选一项')
                        }else{
                            console.log(app.selectId.length)
                            var record=""
                            for(var i=0;i<app.selectId.length;i++){
                              
                                record=record+app.selectId[i]+","
                            }
                            
                            for(var k=app.questions.length-1;k>=0;k--){
                                    console.log(record.indexOf(app.questions[k].qid)!=-1)
                                if(record.indexOf(app.questions[k].qid)!=-1){
                                    console.log(app.questions[k].qid)
                                    app.questions.splice(k,1);
                                }
                            }
                            $("input[type='checkbox']").prop('checked',false)
                        }
                        app.selectId=[];
                 }else{
                    if(app.selectId.length==0){
                            alert('至少勾选一项')
                        }else{
                          
                            for(var i=0;i<app.selectId.length;i++){
                          
                                for(var k=app.randomCatS.length-1;k>=0;k--){
                                    console.log(app.randomCatS)
                                    if(app.randomCatS[k].catId==app.selectId[i]){
                                       
                                        app.randomCatS.splice(k,1);
                                    
                                    }
                                }

                            }
                            $("input[type='checkbox']").prop('checked',false)
                        }
                        app.selectId=[];
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
        ,tiUp:function(index){
            

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
        }
    },
    computed:{
        allCount:function(){
           
            if(this.type==0){
                return this.questions.length;
            }else{
               var m= this.randomCatS;
               var c=0;
               for(var i=0;i<m.length;i++){
                   for(var k=0;k<m[i].randomQues.length;k++){
                        c=c+parseInt(m[i].randomQues[k].count)
                   }
               }
               return c;
              
            }
           
        },
        
        allScore:function(){
            if(this.type==0){
                var obj=this.questions
                var score=0.0;
                if(obj.length==0){
                    return 0;
                }else{
                    for(var i=0;i<obj.length;i++){
                        score=score+parseFloat(obj[i].score);
                    }
                    return score;
                }
            }else{
                var m= this.randomCatS;
               var c=0;
               if(m.length==0){
                   return 0;
               }else{
                var m= this.randomCatS;
               var c=0;
               for(var i=0;i<m.length;i++){
                   for(var k=0;k<m[i].randomQues.length;k++){
                        c=c+parseInt(m[i].randomQues[k].score)*parseInt(m[i].randomQues[k].count)
                   }
               }
               return c;
               }
               
            }
           
        },
       
        single:function(){
            var k=new Array();
            k[0]=0;
            k[1]=0;
            k[2]=0;
            k[3]=0;
            k[4]=0;
            k[5]=0;
            for(var i=0;i<this.questions.length;i++){
               var m= this.questions[i].qtype;
               if(m==1){
                    k[0]=k[0]+1;
               }
               if(m==2){
                k[1]=k[1]+1;
               }
               if(m==3){
                k[2]=k[2]+1;
               }
               if(m==4){
                k[3]=k[3]+1;
               }
               if(m==5){
                k[4]=k[4]+1;
               }
               if(m==6){
                k[5]=k[5]+1;
               }
            }
            return k;
        },
        

    }

})