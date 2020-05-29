/* 
 * Copyrights(c) 2015 OnlineExamMaker.com, All rights reserved.
 * Author: Neugls
 * You could not modify this file or distributes it.
 */
(function ($) {

    //image
    (function(){
        $.sceditor.command.set("image", {
            exec: function (caller) {
                var editor = this,
                    content = '<div class="section clearfix"><button  class="btn btn-primary" id="upload">{upload}</button></div>' +
                        '<div class="section"><label for="url">{url}</label> ' +
                        '<input type="url" id="url" placeholder="http://" /><br/>' +
                        '<button id="insert" class="btn btn-primary">{insert}</button></div>';
                $.each({
                    url: editor._('Image File URL'),
                    upload: editor._("Upload"),
                    insert: editor._('Insert')
                }, function (name, val) {
                    content = content.replace(
                        new RegExp('\\{' + name + '\\}', 'g'), val
                    );
                });
                content = $(content);
                content.find('#insert').click(function (e) {
                    var val = content.find('#url').val();
                    if (val) {
                        editor.wysiwygEditorInsertHtml(
                            '<img' + ' src="' + val + '" />'
                        );
                    }
                    editor.closeDropDown(true);
                    e.preventDefault();
                });
                var data = {};
                data[uploadtoken] = 1;
                content.find('#upload').uploadifive({
                    fileObjName: "jform[img]",
                    buttonClass: "uploadbtn",
                    buttonText: editor._("Upload Image"),
                    fileType: "image/jpeg,image/png,image/gif,image/bmp",
                    multi: false,
                    removeCompleted: true,
                    formData: data,
                    width: 160,
                    uploadScript: upurl,
                    onUploadComplete: function (file, data) {
                        data = $.parseJSON(data);
                        if (data.hasOwnProperty("errorcode")) {
                        } else {
                            editor.wysiwygEditorInsertHtml(
                                '<img' + ' src="' + data.url + '" />'
                            );
                        }
                    }
                });
                editor.createDropDown(caller, 'insertimage', content);
            },
            tooltip: 'Insert an image'
        });
    })();




    //audio
    (function(){
        $.sceditor.command.set("audio", {
            exec: function (caller) {
                var editor = this,
                    content = '<div class="section"><label for="url">{url}</label> ' +
                        '<input type="url" id="url" placeholder="http://" /><br/>' +
                        '<button id="insert" class="btn btn-primary">{insert}</button></div>' +
                        '<br/><div class="section"><button  class="btn btn-primary" id="upload">{upload}</button></div>';
                $.each({
                    url: editor._('Audio File URL'),
                    upload: editor._("Upload"),
                    insert: editor._('Insert')
                }, function (name, val) {
                    content = content.replace(
                        new RegExp('\\{' + name + '\\}', 'g'), val
                    );
                });
                content = $(content);
                content.find('#insert').click(function (e) {
                    var val = content.find('#url').val();
                    if (val) {
                        editor.wysiwygEditorInsertHtml('<audio src="{0}" controls preload="auto" />'.format(val));
                    }
                    editor.closeDropDown(true);
                    e.preventDefault();
                });
                var data = {};
                data[uploadtoken] = 1;
                content.find('#upload').uploadifive({
                    fileObjName: "jform[img]",
                    buttonClass: "uploadbtn",
                    buttonText: editor._("Upload Audio"),
                    fileType: "audio/mpeg",
                    multi: false,
                    removeCompleted: true,
                    formData: data,
                    width: 160,
                    uploadScript: upurl,
                    onUploadComplete: function (file, data) {
                        data = $.parseJSON(data);
                        if (data.hasOwnProperty("errorcode")) {
                            alert(data.errormsg);
                        } else {
                            editor.wysiwygEditorInsertHtml('<audio src="{0}" controls preload="auto" />'.format(data.url));
                        }
                    }
                });
                editor.createDropDown(caller, 'insertaudio', content);
            },
            tooltip: 'Insert Audio'
        });


        $.sceditor.plugins.bbcode.bbcode.set("audio", {
            allowsEmpty: true,
            tags: {
                audio: {
                    'src': null
                }
            },
            isInline: false,
            format: function (element, content) {
                element = $.trim(element.attr('src'));
                return element ? '[audio]' + element + '[/audio]' : content;
            },
            html: function(token, attrs, content){
                content = content.replace('<br />','');
                var temp ='<audio src="{0}" controls preload="auto" />';
                return temp.format(content);
            }
        });
    })();



    //video
    (function () {
        $.sceditor.plugins.bbcode.bbcode.set('video', {
            allowsEmpty: false,
            tags:{
                video: {
                    src: null,
                    width:null,
                    height: null,
                    poster: null,
                    controls: null
                }
            },
            format: function (element, content) {
                var src = element.attr('src'),
                    controls = element.attr('controls'),
                    width = element.attr('width'),
                    height = element.attr('height'),
                    poster = element.attr('poster'),
                    attribs = [];

                if(width){
                    attribs.push('{0}="{1}"'.format('width', width))
                }
                if(height){
                    attribs.push('{0}="{1}"'.format('height', height))
                }
                if(poster){
                    attribs.push('{0}="{1}"'.format('poster', poster))
                }
                return '[video {0}]{1}[/video]'.format(attribs.join(' '), src);
            },
            html: function(token, attrs, content){
                var width, height;
                width  = attrs.width;
                height = attrs.height;

                var attribs = [];
                attribs.push('{0}="{1}"'.format('controls', 'controls'));

                if( width != undefined ){
                    attribs.push('{0}="{1}"'.format('width', width))
                }

                if( height != undefined ){
                    attribs.push('{0}="{1}"'.format('height', height))
                }
                if( attrs.hasOwnProperty('poster') && attr.poster != '' ){
                    attribs.push('{0}="{1}"'.format('poster', attrs.poster));
                }


                var src = content;
                attribs.push('{0}="{1}"'.format('src', src));


                var temp =
                    '<video {0}></video>';

                return temp.format(attribs.join(" "));
            }
        })


        $.sceditor.command.set("video", {
            exec: function (caller) {
                var editor = this,
                    content =
                        '<div class="section">' +
                        '   <div class="form-group">' +
                        '       <label for="url">{insert-video-title}</label> ' +
                        '       <input type="url" id="url" class="form-control" placeholder="{insert-video-placeholder}" />' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="width">{width}</label>' +
                        '       <input type="number" id="width" class="form-control" value="400"/>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="height">{height}</label> ' +
                        '       <input type="number" id="height" class="form-control" value="300">' +
                        '   </div>'+
                        '   <button id="insert" class="btn blue">{insert}</button>' +
                        '</div>';

                $.each({
                    "insert-video-title": editor._('Insert Online Video'),
                    "insert-video-placeholder": editor._("Paster your video URL here"),
                    "width": editor._("Width (optional):"),
                    "height": editor._("Height (optional):"),
                    insert: editor._('Insert')
                }, function (name, val) {
                    content = content.replace(
                        new RegExp('\\{' + name + '\\}', 'g'), val
                    );
                });
                content = $(content);
                content.find('#insert').click(function (e) {
                    var val = content.find('#url').val(),
                        w = content.find('#width').val(),
                        h = content.find('#height').val();
                    if (val) {
                        editor.insertText('[video width={0} height={1}]{2}[/video]'.format(w, h, val));
                    }
                    editor.closeDropDown(true);
                    e.preventDefault();
                });

                editor.createDropDown(caller, 'insertvideo', content);
            },
            txtExec: function() {

            },
            tooltip: 'Insert Video'
        });
    })();

    (function(){
        //default commands
        $.sceditor.plugins.bbcode.bbcode.set("p", {
            allowsEmpty: true,
            tags: {
                p: {
                }
            },
            isInline: true,
            format: function (element, content) {
                return '[p]'+content+'[/p]';
            },
            html: function(token, attrs, content){
                return '<p>{0}</p>'.format(content)
            }
        });

        $.sceditor.plugins.bbcode.bbcode.set('img', {
            allowsEmpty: true,
                tags: {
                img: {
                    src: null
                }
            },
            allowedChildren: ['#'],
            quoteType: 2,//BBCodeParser.QuoteType.never,
            format: function ($element, content) {
                var	width, height,
                    attribs   = '',
                    element   = $element[0],
                    style     = function (name) {
                        return element.style ? element.style[name] : null;
                    };

                // check if this is an emoticon image
                if ($element.attr('data-sceditor-emoticon')) {
                    return content;
                }

                width = $element.attr('width') || style('width');
                height = $element.attr('height') || style('height');

                // only add width and height if one is specified
                if ((element.complete && (width || height)) ||
                    (width && height)) {
                    attribs = '=' + $element.width() + 'x' + $element.height();
                }

                return '[img' + attribs + ']' + $element.attr('src') + '[/img]';
            },
            html: function (token, attrs, content) {
                var	undef, width, height, match,
                    attribs = '';

                // handle [img width=340 height=240]url[/img]
                width  = attrs.width;
                height = attrs.height;

                // handle [img=340x240]url[/img]
                if (attrs.defaultattr) {
                    match = attrs.defaultattr.split(/x/i);

                    width  = match[0];
                    height = (match.length === 2 ? match[1] : match[0]);
                }

                if (width !== undef) {
                    attribs += ' width="' + escape(width, true) + '"';
                }

                if (height !== undef) {
                    attribs += ' height="' + escape(height, true) + '"';
                }

                if( content.indexOf("data:image") > -1   ){
                    content = content.replace(/<br \/>/g, '');
                }else if( content.indexOf("://") == -1 ){
                    content = '//'+content;
                }

                return '<img' + attribs +
                    ' src="' + content + '" />';
            }
        });
    })()

})(jQuery);
