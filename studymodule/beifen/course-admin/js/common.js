/**
 * 公共函数
 */

(function ($) {

    var CM = {
        /**
         * 检测输入框的字数，中文占2格，数字和字母占1格
         * 如：输入框最多输入20个中文，limit为20*2=40
         * @param target 输入框DOM
         * @param limit 最大长度
         */
        checkInputLength:function(target,limit){
            var $that =  $(target);
            $that.attr('maxlength',limit);
            setTimeout(function(){
                var value =  $that.val(),
                    reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]{1}/g,
                    notReg = /[^\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]{1}/g;
                var Cn = value.match(reg);
                var En = value.match(notReg);
                if(Cn){
                    limit = limit - (Cn.length*2);
                }
                if(En){
                    limit = limit - En.length;
                }
                if(limit<=0){
                    var finalLen = value.length+limit;
                    value = value.substring(0,finalLen);
                    $that.attr('maxlength',limit);
                    $that[0].value = value;
                }
            },0);
        },

        /**
         * 检测输入框的字数，中文占2格，数字和字母占1格
         * 如：输入框最多输入20个中文，limit为20*2=40
         * @param target 输入框DOM
         * @param limit 最大长度
         */
        getInputLength:function (target) {
            var $that =  $(target);
            var length = 0;
            var value =  $that.val(),
                reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]{1}/g,
                notReg = /[^\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]{1}/g;
            var Cn = value.match(reg);
            var En = value.match(notReg);
            if(Cn){
                length = length + Cn.length*2;
            }
            if(En){
                length = length + En.length
            }
            return length;
        },
        /**
         * 获取字符串长度，英文占位1，中文占位2
         * @param string
         * @returns {number}
         */
        getStringLength:function(string){
            var length = 0;
            reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]{1}/g,
                notReg = /[^\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]{1}/g;
            var Cn = string.match(reg);
            var En = string.match(notReg);
            if(Cn){
                length = length + Cn.length*2;
            }
            if(En){
                length = length + En.length
            }
            return length;
        },
        /**
         * 根据占位符截取字符串
         * @param string
         * @param length
         * @returns {string}
         */
        getStringSub:function(string,length){
            var len = 0;
            var result = "";
            var reg = /[\u4e00-\u9fa5]{1}/g;
            var str = string.split("");
            for(var i=0;i<str.length;i++){
                if(str[i].match(reg)){
                    len += 2;
                }else{
                    len += 1;
                }
                if(len>=length){
                    return result;
                }
                result += str[i];
            }
            return result;
        },

        /**
         * 秒数转成时间
         * @param value
         * @returns {string}
         */
        formatSeconds:function formatSeconds(value) {
            var secondTime = parseInt(value);
            var minuteTime = 0;
            var hourTime = 0;
            if(secondTime > 60) {
                minuteTime = parseInt(secondTime / 60);
                secondTime = parseInt(secondTime % 60);
                if(minuteTime > 60) {
                    hourTime = parseInt(minuteTime / 60);
                    minuteTime = parseInt(minuteTime % 60);
                }
            }
            var result = "" + parseInt(secondTime) + "秒";
            if(minuteTime > 0) {
                result = "" + parseInt(minuteTime) + "分" + result;
            }
            if(hourTime > 0) {
                result = "" + parseInt(hourTime) + "小时" + result;
            }
            return result;
        },
        /**
         * 等待加载
         */
        showYKSLoading: function() {
            var temp = '<div id="yksLoadingPage" class="show-loading">' +
                '<i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i>' +
                '</div>';
            $('body').append(temp);
        },
        /**
         * 隐藏加载
         */
        hideYKSLoading: function () {
            $('#yksLoadingPage').remove();
        },

        /**
         * 获取当前时间
         */
        getNowTime:function () {
            var date = new Date()
            var hour = date.getHours()<10?"0"+date.getHours():date.getHours();
            var minute = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
            var second = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
            var time = hour +":"+minute+":"+second
            return time;
        },

        /**
         * 初始化 froala editor
         * @param el dom
         * @param token
         * @param options 参数设置
         * @returns {*} 返回editor对象
         */
        initFroala:function(el,token,iscn,options){
            options = options? options: {};
            var uploadData = {}
            uploadData[token] = 1
            uploadData.newEdit = 1
            var opts = $.extend(true,{
                language: iscn == 1?'zh_cn':'',
                placeholderText: window.OELang.enterContentPlease,
                fontSizeDefaultSelection: '16',
                quickInsertEnabled:false,
                fontSize: ['12', '14', '15', '16', '18', '20', '24', '28', '32'],
                //编号有bug，暂时隐藏 'formatOL', 'formatUL'
                toolbarButtons:	{
                    'moreText': {
                        'buttons': ['bold', 'italic', 'fontFamily', 'fontSize', 'textColor', 'underline', 'strikeThrough','backgroundColor','clearFormatting', 'subscript', 'superscript']
                        ,'buttonsVisible': 11
                    },
                    'moreRich': {
                        'buttons': ['insertLink', 'insertImage', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR']
                        ,'buttonsVisible': 8
                    },
                    'moreParagraph': {
                        'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'quote' ,'outdent', 'indent']
                        ,'buttonsVisible': 12
                    },
                    'moreMisc': {
                        'buttons': ['undo', 'redo', 'fullscreen','html',  'print', 'spellChecker', 'selectAll', 'help']
                        ,'buttonsVisible': 7
                    }
                },
                imageUploadURL:window.YKS.uploadImg,
                imageUploadParam: 'jform[img]',
                imageUploadParams: uploadData,
                imageInsertButtons: ['imageUpload', '|', 'imageByURL'],
                imageMaxSize: 1024*1024*5,
                videoUpload:false,
                toolbarStickyOffset: 46,
                lineHeights: {
                    '1': '1',
                    '1.5': '1.5',
                    '1.75': '1.75',
                    '2.0': '2',
                    '3.0': '3',
                    '4.0': '4',
                    '5.0': '5',
                },
                fontFamily: {
                    'Microsoft YaHei': 'Microsoft YaHei',
                    'Arial,Helvetica,sans-serif': 'Arial',
                    'Georgia,serif': 'Georgia',
                    'Impact,Charcoal,sans-serif': 'Impact',
                    'Tahoma,Geneva,sans-serif': 'Tahoma',
                    "'Times New Roman',Times,serif": 'Times New Roman',
                    'Verdana,Geneva,sans-serif': 'Verdana'
                },
            },options)
            return (new FroalaEditor(el,opts))
        },

        /**
         * 去除floala水印
         * @param content
         * @returns {*}
         */
        getFloalaContent:function(obj){
            var content = obj.html.get(true)
            var tag = /<p (.*?)>Powered by <a (.*?)">Froala Editor<\/a><\/p>/
            return content.replace(tag,'')
        }
    }
    window.CM = CM

})(jQuery)
