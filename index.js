
var pop_options = {
    placement: function (context, source) {
        var position = $(source).position();

        if (position.left > 515) {
            return "left";
        }

        if (position.left < 515) {
            return "right";
        }

        if (position.top < 110){
            return "bottom";
        }

        return "top";
    }
    , trigger: "hover"
};

function thumbnailsTag(title, img_s, img_l, link_url) {
	return '<li>' +
	'<div class="thumbnail">' +
	'<a href="' + link_url + '" class="popover_img thumbnail" target="_blank" ' +
		' data-content="<img class=\'popover_content_img\' src=\'' + img_l + '\' />" rel="popover" data-original-title="' + title + '" >' +
	'<p class="title">' + title + '</p>' +
	'<img class="t_img" alt="" src="' + img_s + '" >' +
	'</a>' +
	'</div>' +
	'</li>';
}

function thumbnailsTagForExploader(base_url, title) {
	return thumbnailsTag(title, base_url + '/t.jpg', base_url + '/p.jpg', base_url);
}

function thumbnailsTagFor2dbook(base_url, title, link_url) {
	return thumbnailsTag(title, base_url, base_url.replace('thumb.2dbook.com/thumb/', 'thumb.2dbook.com/thumb_img/'), link_url);
}

$(document).ready(function(){
	
	var xhr_exp = new XMLHttpRequest();
    xhr_exp.open("GET", "http://www.exploader.net/", true);
    xhr_exp.onreadystatechange = function() {

    	  if (xhr_exp.readyState == 4) {
    	    var resp_ = $.parseHTML(xhr_exp.responseText);
			$(resp_).find("div.list_inner p.info_title a").each(function(){
				var link_  = $(this).attr("href");
				var title_ = $(this).text();
				$("#exploader_container > ul#thumbnails_ul").append(thumbnailsTagForExploader(link_, title_));
			});
			$('.popover_img').popover(pop_options);
			
			$('[data-spy="scroll"]').each(function () {
				var $spy = $(this).scrollspy('refresh');
			});
			$("li#nav_exp_li").addClass("active");
			$("li#nav_2db_li").removeClass("active");
    	}
    };
    
	var xhr_2db = new XMLHttpRequest();
    xhr_2db.open("GET", "http://2dbook.com/", true);
    xhr_2db.onreadystatechange = function() {

    	  if (xhr_2db.readyState == 4) {
    	    var resp_ = $.parseHTML(xhr_2db.responseText);
			$(resp_).find("div.content_filelist > div.itembox > div.item").each(function(){
				var file_title_a = $(this).find("p.filetitle a");
				var link_  = "http://2dbook.com" + file_title_a.attr("href");
				var title_ = file_title_a.text();
				var thumb_img_url_ = $(this).find("div.thumb > a > img").attr("src");
				$("#2dbook_container > ul#thumbnails_ul").append(thumbnailsTagFor2dbook(thumb_img_url_, title_, link_));
			});
			$('.popover_img').popover(pop_options);
			
			$('[data-spy="scroll"]').each(function () {
				var $spy = $(this).scrollspy('refresh');
			});
			$("li#nav_exp_li").addClass("active");
			$("li#nav_2db_li").removeClass("active");
    	}
    };
    
    xhr_exp.send();
    xhr_2db.send();
});
