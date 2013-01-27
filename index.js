
function thumbnailsTag(base_url, title) {
	return '<li class="span4">' +
	'<div class="thumbnail">' +
	'<p>' + title + '</p>' +
	'<a href="' + base_url + '" class="thumbnail">' +
	'<img data-src="holder.js/300x200" alt="" src="' + base_url + '/t.jpg' + '">' +
	'<img data-src="holder.js/300x200" alt="" src="' + base_url + '/p.jpg' + '">' +
	'</a>' +
	'</div>' +
	'</li>';
}

$(document).ready(function(){
	
	var xhr_ = new XMLHttpRequest();
    xhr_.open("GET", "http://www.exploader.net/", true);
    xhr_.onreadystatechange = function() {

    	  if (xhr_.readyState == 4) {
    	    var resp_ = $.parseHTML(xhr_.responseText);
			$(resp_).find("div.list_inner p.info_title a").each(function(){
				var link_  = $(this).attr("href");
				var title_ = $(this).text();
				$("ul#thumbnails_ul").append(thumbnailsTag(link_, title_));
			});
    	}
    };
    xhr_.send();
});