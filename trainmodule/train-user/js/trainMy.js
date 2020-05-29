layui.use('laypage', function () {
    var laypage = layui.laypage;

        function pageFenye(count,title){
            laypage.render({
                        elem: 'fenye' 
                        , count: count //数据总数，从服务端得到
                        , layout: ['count', 'prev', 'page', 'next',]
                        , jump: function (obj, first) {
                            if (!first) {
                                $.ajax({
                                    url: "/seeyon/userTrainProgram.do?method=myTrainProgramPage&page="+ obj.curr + "&limit=10&title="+title,
                                    type: "get",
                                    success: function (data) {
                                        var obj = JSON.parse(data)
                                        var code = obj.code
                                        if (code == 0) {
                                            app.examAll = obj.data;
                                        } else {
                                            alert(obj.msg)
                                        }


                                    },
                                });
                            }
                        }

                    });

                }
    $.ajax({
        url: "/seeyon/userTrainProgram.do?method=myTrainProgramPage",
        type: "post",
        data: { 'page': 1, 'limit': 10 },
        success: function (data) {
            var res = JSON.parse(data);

            var code = res.code;
            if (code == 0) {
                app.examAll = res.data;
                pageFenye(res.count,'')
                

            } else {
                alert(res.mgs)
            }
        },
    });



    var app = new Vue({
        el: '#app',
        data: {
            examAll: [
                { "title": "測試1", "state": "未開始", "completenessRate": "66", "userScore": "66", "startTime": "2019-06-06 06：06：06", "uesTime": "15", "exid": "", "examRecordid": "", "": "", },

            ],
       
            view: true,
            
        },
        computed: {

        },
        methods: {
            getUrl: function (e, exam) {
                var target = e.target;
                var id = $(target).attr('reid')
                var state = exam.trainState;
                if (state == '1') {

                    window.location.href='/seeyon/trainmodule/train-user/trainDetail.html?train=' + exam.trid
                } else if (state == '2') {
                    window.location.href="/seeyon/trainmodule/train-user/trainFinish.html?reid=" + id
                } else if (state == '0') {
                    window.location.href='/seeyon/trainmodule/train-user/trainDetail.html?train=' + exam.trid
                }


            },
            gsTime:function(result) {
                   var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
                   var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
                   var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
                   return result = h + ":" + m + ":" + s;
               },
        },
        mounted: function () {

        }


    })

    $('#searchTitle').click(function (e) {
        var title = $('#search').val();
        $.ajax({
            url: "/seeyon/userTrainProgram.do?method=myTrainProgramPage",
            type: "post",
            data: { 'page': 1, 'limit': 10, 'title': title },
            success: function (data) {
                var res = JSON.parse(data);

                var code = res.code;
                if (code == 0) {
                    app.examAll = res.data;
                    pageFenye(res.count,title)
                    

                } else {
                    alert(res.mgs)
                }
            },
        });

    })


    
});