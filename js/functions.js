$(function() {
	$(document).on('focusin', '.field, textarea', function() {
		if(this.title==this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function(){
		if(this.value=='') {
			this.value = this.title;
		}
	});


	if( $('.home-page-slider').length ){
		$('body').addClass('home-page');
	}
	// slider - home-style 2 - page 
	if( $(".home-slider ul").length ){
		$(".home-slider ul").carouFredSel({
			width: 938,
			height: 350,
			items: 1,
			prev: {
			    button: "a.prev",
			    key: "left"
			},
			next: {
			    button: "a.next",
			    key: "right"
			}
		});
	}

	// slider - home-style 1 - page 
	if( $(".home-style1-slider ul").length ){
		$(".home-style1-slider ul").carouFredSel({
			width : '100%',
			height:  470,
			pagination: ".pagination",
			items: 1,
			prev: {
			    button: "a.prev",
			    key: "left"
			},
			next: {
			    button: "a.next",
			    key: "right"
			}
		});
	}
	// slider tabs - home - page 
	if( $(".slider-tabs ul").length ){
		$(".slider-tabs ul").each(function(){
			var arrPrev = $(this).parents('.slider-tab-holder').find('a.prev');
			var arrNext = $(this).parents('.slider-tab-holder').find('a.next');  

			$(this).carouFredSel({
				width: 849,
				height: 187,
				items: {
				    visible : 3
	 			},
				scroll: 3,
				prev: {
				    button: arrPrev,
				    key: "left"
				},
				next: {
				    button: arrNext,
				    key: "right"
				}
			});
		})
	}
	
	// tabs
	$('.tab').hide();
	$(".tabs").each(function(){
		$(this).find('a:first').addClass("active");
	});

	$('.tabs-cnt').each(function(){
		$(this).find('.tab:first').show();
	});

	$(".tabs a").click(function() {
		$(this).addClass('active').siblings('a.active').removeClass('active')

		var currentHeight = $('.tabs-cnt').find(".tab:visible").height();
		$('.tabs-cnt').css('min-height', currentHeight);

		$(".tab:visible").hide();

		var activeTab = $(this).index();

		$('.tab').eq(activeTab).fadeIn(function(){
			$(this).parents('.tabs-cnt').css('min-height', 0);
		});
		
		return false;
	});

	// slider - projects - page
    if( $(".slider").length ){
    	$(".slider").each(function(){
    		var arrPrev = $(this).parents('.slider-holder').find('a.prev');
    		var arrNext = $(this).parents('.slider-holder').find('a.next');

    		$(this).carouFredSel({
				width: 600,
				height: 329,
				items: 1,

				prev: {
				    button: arrPrev,
				    key: "left"
				},

				next: {
				    button: arrNext,
				    key: "right"
				}
			});
    	})
	}
	// big slider - projects-full - page
	if( $(".big-slider").length ){
		$(".big-slider").carouFredSel({
			width: 898,
			height: 497,
			items: 1,
			pagination: {
				container: ".control-nav",
				anchorBuilder: function( nr, $img ) {
			        var small = $img.attr('src');
			        return '<a href="#" '+nr+'.">'+nr+'<img src="'+small+'" /></a>';
			    }
			},
			prev: {
			    button: "a.prev",
			    key: "left"
			},

			next: {
			    button: "a.next",
			    key: "right"
			}
		});
	}

	// colorbox - login
	$(document).on('click', 'a.close-btn', function(){
		$.colorbox.close();
		return false;
	})

	$("a.login-loader").colorbox({ inline: true, href:"#login-popup"});
	$(".gallery-classic a").colorbox({
		onComplete: function(){
			$.colorbox.resize();
			$('#colorbox').addClass('img-view');
		},
		onClosed: function(){
			$('#colorbox').removeClass('img-view');	
		}
	});

	if($.browser.msie && $.browser.version<9){
		$('body').addClass('ie');
	}

	// contact-form - contact-page
	if($('#contact-form').length) {
		// validation
		var name_field = new LiveValidation( "name-field" );
		var email_field = new LiveValidation( "email-field" );
		var msg_field = new LiveValidation( "message-field" );
		var subject_field = new LiveValidation( "subject-field" );

		name_field.add( Validate.Presence );
		email_field.add( Validate.Presence );
		msg_field.add( Validate.Presence );
		subject_field.add( Validate.Presence );

		name_field.add( Validate.Length, { minimum: 4 });
		email_field.add( Validate.Email );
		msg_field.add( Validate.Length, { minimum: 10 });
		subject_field.add( Validate.Length, { minimum: 4 });

		// on submit - php mail
		$(document).on('submit', '#contact-form', function() {
			if($('#contact-form .LV_invalid_field').length == 0) {
				var target = $(this);
				submit_form(target);
			}
			return false;
		});
	}


	// call the php mail function
	function submit_form(target) {
		$.post(target.attr('action'), target.serialize(), function(data) {
			target.find('.result').html(data).slideDown(300);
		});
	}
});