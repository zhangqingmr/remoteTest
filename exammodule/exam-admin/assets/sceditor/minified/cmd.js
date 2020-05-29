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
                content.find('#upload').uploadifive({
                    fileObjName: "file",
                    buttonClass: "uploadbtn",
                    buttonText: editor._("上传图片(小于12M)"),
                    fileType: "image/jpeg,image/png,image/gif,image/bmp",
                    multi: false,
                    removeCompleted: true,
                    formData: data,
                    width: 160,
                    uploadScript: "/seeyon/questionController.do?method=uploadImage",
                    onUploadComplete: function (file, data) {
                        data = $.parseJSON(data);
                        if (data.hasOwnProperty("errorcode")) {
                        } else {
                            editor.wysiwygEditorInsertHtml(
                                '<img' + ' src="' + data.path + '" />'
                            );
                        }
                    }
                });
				
				      
                editor.createDropDown(caller, 'insertimage', content);
            },
            tooltip: 'Insert an image'
        });
    })();





    

})(jQuery);
