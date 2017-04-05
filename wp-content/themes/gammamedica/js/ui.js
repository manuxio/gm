jQuery(document).ready(function($){
	jQuery.fn.CustomSelect = function() {
		jQuery(this).children('.list-expander').click(function(){
			var list = jQuery(this).parent().children('.list-container');
			var expander = jQuery(this);
			
			if(!list.is(':animated')) 
				if(!list.is(':visible')) {
					list.show().animate({opacity: '1'}, 200, function(){
						expander.children('a').focus();
					});
				} else {
					list.animate({opacity: '0'}, 200, function(){
						list.hide();
						expander.children('a').live('blur');
					});
				}
		});
		
		jQuery(this).children('.list-expander').children('a').focusout(function(){
			var list = jQuery(this).parent().parent().children('.list-container');
			list.animate({opacity: '0'}, 200, function(){
				list.hide();
			});
		});
		
		function listItem_onClick(e){
			var selected = jQuery(this);
			var text = selected.parent().parent().parent().children('input.select');
			var value = selected.parent().parent().parent().children('input.value');
			
			value.val(selected.attr('class')); 
			
			if(text.val()!=selected.text() && !selected.hasClass('disabled')){
				text.val(selected.text());	
				text.trigger('change');
			}
		}
		
		jQuery('.list-container a',this).click(listItem_onClick);
	}
	
	 jQuery.fn.customSelect = function(options) {
		  if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)){
		  return this.each(function() {
	
				var currentSelected = $(this).find(':selected');
				var html = currentSelected.html();
				if(!html){ html='&nbsp;'; }
				$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+html+'</span></span>').css({position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
				var selectBoxSpan = $(this).next();
				var selectBoxWidth = parseInt($(this).width()) + parseInt(selectBoxSpan.css('padding-left'))  +parseInt(selectBoxSpan.css('padding-right'));			
				var selectBoxSpanInner = selectBoxSpan.find(':first-child');
				selectBoxSpan.css({display:'inline-block'});
				selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
				var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
				$(this).height(selectBoxHeight).change(function(){
					// selectBoxSpanInner.text($(this).val()).parent().addClass('changed');   This was not ideal
				selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
					// Thanks to Juarez Filho & PaddyMurphy
				});
	
		  });
		  }
		}

	jQuery.fn.calendar = function(placeholder) {
		jQuery(this).datepicker({
			dateFormat: 'dd/mm/yy',	
			dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
			monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
			firstDay: 1,
			changeYear: true,
			changeMonth: true,
			onSelect: function(dateText, inst){
				jQuery(this).parent().children('input').text(dateText);
			}
		});
		
		jQuery(this).focusin(function(){
			if(jQuery(this).val() == placeholder)
				jQuery(this).val('');
		});
		
		jQuery(this).focusout(function(){
			if(jQuery(this).val() == '')
				jQuery(this).val(placeholder);
		});
	}
	
	jQuery.fn.overLabel = function() {
		jQuery(this).focus(function(){
			var fieldId = jQuery(this).attr("id");
			jQuery("label[for='"+fieldId+"']").hide();
		}).blur(function(){
			var fieldId = jQuery(this).attr("id");
			if(jQuery(this).val()==""){
				jQuery("label[for='"+fieldId+"']").show();
			}
		});
	}
	
	jQuery.fn.postSlideShow = function(delay, transiction) {
		jQuery(this).each(function(index){
			var parent = jQuery(this);
			if(parent.children('div.slideshow-post').length > 1){
				setInterval(function(){
					var current = parent.children('div.active');
					var next = current.next().length ? current.next() : parent.children('div.slideshow-post').first();
					
					current.removeClass('active').animate({opacity: '0'}, transiction, function(){
						current.css('display', 'none');
					});
					
					next.addClass('active').css('display', 'block').animate({opacity: '1'}, transiction);
				}, delay+transiction);
			}
		});
	}
	function Placeholder(input) {
		this.input = input;
		if (input.attr('type') == 'password') {
			this.handlePassword();
		}
		// Prevent placeholder values from submitting
		jQuery(input[0].form).submit(function() {
			if (input.hasClass('placeholder') && input[0].value == input.attr('placeholder')) {
				input[0].value = '';
			}
		});
	}
	Placeholder.prototype = {
		show : function(loading) {
			// FF and IE saves values when you refresh the page. If the user refreshes the page with
			// the placeholders showing they will be the default values and the input fields won't be empty.
			if (this.input[0].value === '' || (loading && this.valueIsPlaceholder())) {
				if (this.isPassword) {
					try {
						this.input[0].setAttribute('type', 'text');
					} catch (e) {
						this.input.before(this.fakePassword.show()).hide();
					}
				}
				this.input.addClass('placeholder');
				this.input[0].value = this.input.attr('placeholder');
			}
		},
		hide : function() {
			if (this.valueIsPlaceholder() && this.input.hasClass('placeholder')) {
				this.input.removeClass('placeholder');
				this.input[0].value = '';
				if (this.isPassword) {
					try {
						this.input[0].setAttribute('type', 'password');
					} catch (e) { }
					// Restore focus for Opera and IE
					this.input.show();
					this.input[0].focus();
				}
			}
		},
		valueIsPlaceholder : function() {
			return this.input[0].value == this.input.attr('placeholder');
		},
		handlePassword: function() {
			var input = this.input;
			input.attr('realType', 'password');
			this.isPassword = true;
			// IE < 9 doesn't allow changing the type of password inputs
			if (jQuery.browser.msie && input[0].outerHTML) {
				var fakeHTML = jQuery(input[0].outerHTML.replace(/type=(['"])?password\1/gi, 'type=$1text$1'));
				this.fakePassword = fakeHTML.val(input.attr('placeholder')).addClass('placeholder').focus(function() {
					input.trigger('focus');
					jQuery(this).hide();
				});
				jQuery(input[0].form).submit(function() {
					fakeHTML.remove();
					input.show()
				});
			}
		}
	};
	var NATIVE_SUPPORT = !!("placeholder" in document.createElement( "input" ));
	jQuery.fn.placeholder = function() {
		return NATIVE_SUPPORT ? this : this.each(function() {
			var input = jQuery(this);
			var placeholder = new Placeholder(input);
			placeholder.show(true);
			input.focus(function() {
				placeholder.hide();
			});
			input.blur(function() {
				placeholder.show(false);
			});

			// On page refresh, IE doesn't re-populate user input
			// until the window.onload event is fired.
			if (jQuery.browser.msie) {
				jQuery(window).load(function() {
					if(input.val()) {
						input.removeClass("placeholder");
					}
					placeholder.show(true);
				});
				// What's even worse, the text cursor disappears
				// when tabbing between text inputs, here's a fix
				input.focus(function() {
					if(this.value == "") {
						var range = this.createTextRange();
						range.collapse(true);
						range.moveStart('character', 0);
						range.select();
					}
				});
			}
		});
	}
});
