$(function(){
    $.ajax({
        url:"json/head.json",
        type:"get",
        dataType: "json",
        data:"",
        success:function(data){
           
            console.log(data);
          
            var exam=data.exam;
            var kn=data.kn;
            var study=data.study;
            
            $('#study1').attr('href',study.study1)
            $('#study2').attr('href',study.study2)
            $('#exam1').attr('href',exam.exam1)
            $('#exam2').attr('href',exam.exam2)
            $('#kn1').attr('href',kn.kn1)
            $('#kn2').attr('href',kn.kn2)
            
           
        },
    })
})