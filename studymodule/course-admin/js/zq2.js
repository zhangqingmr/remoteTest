function isIE(ver){var b=document.createElement('b');b.innerHTML='<!--[if IE '+ver+']><i></i><![endif]-->';return b.getElementsByTagName('i').length===1}function unSupportIE(){return isIE(5)||isIE(6)||isIE(7)||isIE(8)||isIE(9)}if(unSupportIE()){alert("您的浏览器版本太低，请升级至新版浏览器； 使用老的浏览器将无法正常浏览和使用系统功能；您可以使用新版本的Chrome, Firefox, Edge, IE11或者国产浏览器(切换到极速模式)")}

jQuery(document).ready(function () {
    Metronic.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init(); // init quick sidebar
    Tasks.initDashboardWidget();

    MathJax.Hub.Config({
        showProcessingMessages: false,
        messageStyle: "none",
        showMathMenu: false,
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            inlineMath:  [ ["$ ", "$"] ],
            displayMath: [ ["$$","$$"] ],
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'],
            ignoreClass:"comment-content|regular-ques"
        }
    });

    //处理一级菜单
    jQuery(".page-sidebar-menu").find(".parent a:first").prop("href","javascript:;");
});

function ga_async_load(fun){
    if (window.attachEvent){
        window.attachEvent('onload', fun);
    }else{
        window.addEventListener('load', fun, false);
    }
}

ga_async_load( function(){
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true; //js下载之后立刻动作
//       s.defer = true; //浏览器html parse后动作
    s.innerHTML = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-71329769-3', 'auto');ga('send', 'pageview');";
    document.body.appendChild(s);
});
