sofia.config = $.extend(sofia.config, {

	enableLemmaPopupPlugin: true

});


var LemmaPopupPlugin = function(app) {

	if (!sofia.config.enableLemmaPopupPlugin) {
		return;
	}

	var lemmaPopup = new InfoWindow('lemma-popup'),
		timer = new Timer(hidePopup, 500);


	function hidePopup() {
		lemmaPopup.hide();
	}

	lemmaPopup.on('hide', function() {
		$('.selected-lemma').removeClass('selected-lemma');
	});

	lemmaPopup.container
		.on('click', '.lemma-findall', function(e) {
			var link = $(this),
				lemma = link.attr('data-lemma'),
				textid = link.attr('data-textid');

			console.log(lemma, textid);

			sofia.app.windowManager.add('SearchWindow', {searchtext: lemma, textid: textid});

			lemmaPopup.hide();
		});


	$('.windows-main').on('click','.BibleWindow l', function(e) {

		var l = $(this);

		if (lemmaPopup.container.is(':visible')) {
			lemmaPopup.hide();
			if (lemmaPopup.currentWord == this) {
				lemmaPopup.currentWord == null;
				l.removeClass('selected-lemma');
				return;
			}
		}

		lemmaPopup.currentWord = this;

		$('.selected-lemma').removeClass('selected-lemma');
		l.addClass('selected-lemma');

		var
			// get attribute
			morph = l.attr('m'),
			// split into array
			morphs = (morph && morph != null) ? morph.split(' ') : [],

			// get attribute
			strong = l.attr('s'),
			// split into array
			strongs = (strong && strong != null) ? strong.replace(/H/gi,'').replace(/G/gi,'').split(' ') : [],

			// normal elements stuff
			main = l.closest('.scroller-main'),
			verse = l.closest('.verse, .v')
			verse_code = verse.attr('data-id'),
			book_id = verse_code.substring(0,2),
			chapter = l.closest('.chapter'),
			sectionid = chapter.attr('data-id'),
			textid = chapter.attr('data-textid'),
			langPrefix = 'G',
			langCode = 'el',
			morphType = 'Greek',
			dir = 'ltr';

		// make strong's into ints
		for (var i=0; i<strongs.length; i++) {
			strongs[i] = parseInt(strongs[i], 10);
		}


		// check for language (greek or hebrew, noting LXX is greek)
		var sectionLang = l.closest('.section').attr('lang');

		if (sectionLang == 'el' ||
			sectionLang == 'gr' ||
			sectionLang == 'grc' ||
			sectionLang == 'grk' ||
			sectionLang == 'el' ||
			bible.NT_BOOKS.indexOf(book_id) > -1 ||
			bible.AP_BOOKS.indexOf(book_id) > -1
			) {
				langPrefix = 'G';
				langCode = 'el';
				dir = 'ltr';
				morphType = 'Greek';

		} else if (
			sectionLang == 'he' ||
			sectionLang == 'heb' ||
			bible.OT_BOOKS.indexOf(book_id) > -1){
				langPrefix = 'H';
				langCode = 'he';
				dir = 'rtl';
				morphType = 'Hebrew';

		}

		// remove G3588 (Greek) and H853 (Hebrew) (the) when there are more than two
		if (strongs.length > 0) {
			var articleIndex = -1;
/* msToan
			for (var i=0; i<strongs.length; i++) {
				if ((strongs[i] == 3588 && langPrefix == 'G') || (strongs[i] == 853 && langPrefix == 'H')) {
					articleIndex = i;
					break;
				}
			}
*/
			if (articleIndex > -1) {
				strongs.splice(articleIndex, 1);

				if (morphs.length > articleIndex) {
					morphs.splice(articleIndex, 1);
				}
			}
		}

		//console.warn(strongs);

		// record
		if (sofia.analytics) {
			sofia.analytics.record('lemma', langPrefix + strongs, l.html());
		}


		// show popup
		lemmaPopup.setClickTargets([lemmaPopup.container, l]);
		lemmaPopup.show();
		lemmaPopup.position(l);

		lemmaPopup.body.html('Loading/Xin chờ... app/js/plugins/lemmapopup.js');

		if (strongs.length > 0) {

			lemmaPopup.body.html('');
			lemmaPopup.body.addClass('loading-indicator');

			for (var i=0, il=strongs.length; i<il; i++) {

				loadStrongsData(textid, strongs[i], i < morphs.length ? morphs[i] : '', morphType, langPrefix, langCode, l);

			}
		}
	});


	function loadStrongsData(textid, strongsNumber, morphKey, morphType, langPrefix, langCode, l) {
		sofia.ajax({
			dataType: 'json',
			url: 'content/lexicons/strongs/entries/' + langPrefix + strongsNumber + '.json',
			success: function(data) {

				var html = '<div class="lemma-word">' +
								'<span lang="' + iso2iana.convert(langCode) + '" dir="' + dir + '">' + data.lemma + '</span>' +
								' ' +
								'<span class="lemma-strongs" dir="ltr"> (' + strongsNumber + ')</span>' +
							'</div>'; //Popup box line 1 - Lemma (Strong#)

				if (morphKey != '') {
					html += '<span class="lemma-morphology">' + bible.morphology[morphType].format( morphKey ) + '</span>';
				}

				html += '<span class="lemma-findall" data-lemma="' + langPrefix + strongsNumber + '" data-textid="' + textid + '">';
				html +=	i18n.t('plugins.lemmapopup.findalloccurrences', {count: data.frequency});
				html +=	'</span>';

				html += '<div class="lemma-outline">' + data.outline + '</div>';

				lemmaPopup.body.removeClass('loading-indicator');

				lemmaPopup.body.append( html );

				lemmaPopup.position(l);

			},
			error: function() {
				

				dic = strongsHebrewDictionary;
				dicVN = strongsHebrewVNDictionary;

				fre = strongsHebrewFrequencies;
				outline = strongsHebrewOutlines;
				
				if (langPrefix == "G"){
					dic = strongsGreekDictionary;
					dicVN = strongsGreekVNDictionary;

					fre = strongsGreekFrequencies;
					outline = strongsGreekOutlines;
				}
					
				var html = '<div class="lemma-word">' +
								'<span lang="' + iso2iana.convert(langCode) + '" dir="' + dir + '">' + dic[langPrefix + strongsNumber].lemma + '</span>' +
								' ' +
								'<span class="lemma-strongs" dir="ltr"> (' + strongsNumber + ')</span>' +
							'</div>';



				if (morphKey != '') {
					html += '<span class="lemma-morphology">' + bible.morphology[morphType].format( morphKey ) + '</span>';
				}
				html += '<span class="lemma-findall" data-lemma="' + langPrefix + strongsNumber + '" data-textid="' + textid + '">';
				html +=	i18n.t('plugins.lemmapopup.findalloccurrences', {count: fre[langPrefix+strongsNumber]});
				html +=	'</span>';
				/* MSToan VN:  get from strongs-greek-VN-dictionary.js */
				html += '<div class="lemma-outline"><b>VN: </b>' +dicVN[langPrefix + strongsNumber].kjv_def  + '</div>';
				/* Strong VN: */
				//msToan Delete
				html += '<div class="lemma-outline"><b>ỨNG DỤNG: </b>' +dicVN[langPrefix + strongsNumber].strongs_def + '</div>';

				/* Others:  get from strongs-greek-outlines.js */
				//msToan Delete
				//html += '<div class="lemma-outline"><b>Others: </b><br/>' + outline[langPrefix+strongsNumber] + '</div>';

				/* KJV and Strong KJV:  get from strongs-greek-dictionary.js */
				//html += '<div class="lemma-outline"><b>KJV:</b>' +dic[langPrefix + strongsNumber].kjv_def  + '</div>';
				//html += '<div class="lemma-outline"><b>Strong:</b>' +dic[langPrefix + strongsNumber].strongs_def + '</div>';

				lemmaPopup.body.removeClass('loading-indicator');
				lemmaPopup.body.append( html );
				lemmaPopup.position(l);
			}


		});
	}


};

sofia.plugins.push('LemmaPopupPlugin');
