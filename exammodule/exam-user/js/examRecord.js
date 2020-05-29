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
                                    url: "/seeyon/userExamController.do?method=getUserExamList&page="+ obj.curr + "&limit=10&title="+title,
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
        url: "/seeyon/userExamController.do?method=getUserExamList",
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
            examAnsy: { "all": "77", "noComplete": "11", "finish": "22", "jige": "22", },
            view: true,
            
        },
        computed: {

        },
        methods: {
            getUrl: function (e, exam) {
                var target = e.target;
                var id = $(target).attr('examRecordid')
                var state = exam.state;
                if (state == '正在答卷') {

                    window.open('/seeyon/exammodule/exam-user/examDetail.html?exid=' + exam.exid)
                } else if (state == '已答完卷') {
                    window.open("/seeyon/exammodule/exam-user/examFinish.html?state=true&examRecordid=" + id)
                } else if (state == '未答卷') {
                    window.open('/seeyon/exammodule/exam-user/examDetail.html?exid=' + exam.exid)
                }


            }
        },
        mounted: function () {

        }


    })

    $('#searchTitle').click(function (e) {
        var title = $('#search').val();
        $.ajax({
            url: "/seeyon/userExamController.do?method=getUserExamList",
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