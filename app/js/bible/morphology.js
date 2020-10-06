/* language tools */
if (typeof(window.bible) == 'undefined')
	window.bible = {};


bible.morphology = {};

// http://wiki.logos.com/Morphology_Codes
//
bible.morphology['robinson'] = {

	format: function(morph) {

		var firstDash = morph.indexOf('-'),
			partOfSpeechKey = (firstDash > -1) ? morph.substring(0, firstDash) : morph,
			partOfSpeech = this.partsOfSpeech[partOfSpeechKey.toUpperCase()],

			parsingInfo = (firstDash > -1) ? morph.substring(firstDash+1) : '',
			formattedParsing = '';

		switch (partOfSpeechKey.toUpperCase()) {
//			case 'B': // Adverb - msToan changed from D
//	case 'C': // Conjunction!
			case 'D': // Article
//	case 'T':
			case 'N': // Noun!
//			case 'P': // Preposition! msToan
			case 'RD': // Demonstrative Pronoun
			case 'K':
			case 'I':
			case 'X':
			case 'Q':
			case 'F':
			case 'S':
				var c = this.nounCases[parsingInfo.substring(0, 1)];
				var n = this.wordNumber[parsingInfo.substring(1, 2)];
				var g = this.wordGender[parsingInfo.substring(2, 3)];
				formattedParsing = c + ((n) ? ', ' + n + ((g) ? ', ' + g : '') : '');
				break;

			case 'RP': // Personal Pronoun
			case 'R': // Relative Pronoun msToan
			case 'RR': // Relative Pronoun
				var firstLetter = parsingInfo.substr(0,1);
				if (firstLetter == '1' || firstLetter == '2') {

					var p = this.wordPerson[parsingInfo.substring(0, 1)];
					var c = this.nounCases[parsingInfo.substring(1, 2)];
					var n = this.wordNumber[parsingInfo.substring(2, 3)];
					formattedParsing = p + ((c) ? ', ' + c + ((n) ? ', ' + n : '') : '');
				} else {
					var c = this.nounCases[parsingInfo.substring(0, 1)];
					var n = this.wordNumber[parsingInfo.substring(1, 2)];
					var g = this.wordGender[parsingInfo.substring(2, 3)];
					formattedParsing = c + ((n) ? ', ' + n + ((g) ? ', ' + g : '') : '');
				}

				break;

			case 'J': // Adjective! (msToan Changed from A to J - 2019.10.30)
				var c = this.nounCases[parsingInfo.substring(0, 1)];
				var n = this.wordNumber[parsingInfo.substring(1, 2)];
				formattedParsing =   c + ', ' + n;
				break;

			case 'T': //msT 2020.06.15 - changed from PRT
				formattedParsing = this.particleTypes[parsingInfo];
				break;

			case 'V':  // Verb!
				var t = '';
				var rem = ''
				if (parsingInfo.substring(0, 1) == '2') {
					t = this.verbTenses[parsingInfo.substring(0, 2)];
					rem = parsingInfo.substring(2);
				} else {
					t = this.verbTenses[parsingInfo.substring(0, 1)];
					rem = parsingInfo.substring(1);
				}
				var v = this.verbVoices[rem.substring(0, 1)];
				var m = this.verbMoods[rem.substring(1, 2)];

				rem = rem.length >= 5? rem.replace('-','') : rem; //2020-07-16 Khang - Remove excess dash in verb morphology
				
				if (rem.length == 2) // First, format Tense, Voice, and Mood
				{
					formattedParsing = t + ', ' + v + ', ' + m;

				} else if (rem.length == 4) // Verbs after remove excess dash
				{
					var p = this.wordPerson[rem.substring(2, 3)];
					var n = this.wordNumber[rem.substring(3, 4)];
					formattedParsing =  t + ', ' + v + ', ' + m + ', ' + p + ', ' + n;
				} 
				else if (rem.length >= 5) // Participle
				{
					var c = this.nounCases[rem.substring(2, 3)];
					var n = this.wordNumber[rem.substring(3, 4)];
					var g = this.wordGender[rem.substring(4, 5)];
					if (rem.length >= 7) // Longer than participle by mistake (actually, it's a verb- Len=4)
					{
						c = this.wordPerson[rem.substring(2, 3)]; // c takes the place of p above for Verb with length of 4
						g = "";
					}
					formattedParsing =  t + ', ' + v + ', ' + m + ', ' + c + ', ' + n + ', ' + g;
				}
				break;
			default:
				formattedParsing =  parsingInfo;
		}
/* DEBUG STRING - msToan
formattedParsing = 't=' + t + '| ' + 'v=' + v + '| ' + 'm=' + m + '| ' + 'Rem=' + rem.length + ':' + rem;
formattedParsing += '| test:' + rem.substring(2, 3) + '||' + rem.substring(3, 4) + '||' + rem.substring(4, 5) + '----' + 'c=' + c + '| ' + 'p=' + p + '| ' + 'n=' + n + '| ' + 'g=' + g; + '= ' + ', ' + v + ', ' + m + ', ' + c + ', ' + n + ', ' + g;
*/
		return (typeof partOfSpeech != 'undefined' ? partOfSpeech + (formattedParsing != '' ? ': ' : '') : '') + formattedParsing;

	},

	partsOfSpeech: {
		N: 'Danh-từ (N)',
		J: 'Tính từ (Adj)', //msToan changed from A to J (2019.10.30)
		T: 'Particle',
		V: 'Động từ (V)',
		P: 'Giới từ (Prep)', //'personal pronoun',
		D: 'Mạo từ (Art)', //Article
		R: 'Đại từ Liên Hệ (relative pronoun)', //Also Relative Pronoun
		RR: 'Đại từ Liên Hệ (relative pronoun)', //Relative Pronoun
		C: 'Liên từ (Conj)', //'reciprocal pronoun',
		RD: 'Đại từ Chỉ Định (DPro)', //Demonstrative Pronoun
		K: 'correlative pronoun',
		I: 'interrogative pronoun',
		X: 'indefinite pronoun',
		Q: 'correlative or interrogative pronoun',
		F: 'reflexive pronoun',
		S: 'posessive pronoun',
		B: 'Phó từ(Adv)', // msToan changed from ADV
//CONJ: 'Liên từ (Conjunction)',
		COND: 'cond',
		PRT: 'Phân từ(Participle)',
//PREP: 'Giới từ (Preposition)',
		RP: 'Đại từ Nhân Xưng (PPro)',
		INJ: 'interjection',
		ARAM: 'aramaic',
		HEB: 'hebrew'
	},

	getPartofSpeech: function(partOfSpeechKey) {
		var full = this.partsOfSpeech[partOfSpeechKey.toUpperCase()];

		return (full != null) ? full : '?';
	},

	nounCases: {
		'N': 'Danh-C (N)',
		'V': 'Hô-C (V)',
		'G': 'Thuộc-C (G)',
		'D': 'Tặng-C (D)',
		'A': 'Đối-C (A)',
		'P': 'Tên (PN)'
	},

	wordNumber: {
		'S': 'Số ít (S)',
		'P': 'Số nhiều (P)'
	},

	wordGender: {
		'M': 'Đực (M)',
		'F': 'Cái (F)',
		'N': 'Trung (N)'
	},

	wordPerson: {
		'1': '1st',
		'2': '2nd',
		'3': '3rd'
	},

	verbTenses: {
		'P': 'Hiện tại (P)',
		'I': 'Tiếp diễn (I)',
		'F': 'Tương lai (F)',
		'2F': 'Tương lai2 (F2)',
		'A': 'Bất định (A)',
		'2A': 'Bất định2 (A2)',
		'R': 'Hoàn thành (R)',
		'2R': 'Hoàn thành2 (R2)',
		'L': 'QK Hoàn thành-pluperfect',
		'2L': 'QK Hoàn thành2-second pluperfect',
		'X': 'no tense stated'
	},

	verbVoices: {
		'A': 'Chủ động-(A)',
		'M': 'Tự động-(M)',
		'P': 'Bị động-(P)',
		'E': 'Tự/Bị động-(M/P)',
		'D': 'Chủ động2-(Dep)',
		'O': 'Chủ động3-(PDep)',
		'N': 'middle or passive deponent',
		'Q': 'impersonal active',
		'X': 'Chủ động-(A)' //msToan chged to Active (2020-08-06) 'no voice'
	},

	verbMoods: {
		'I': 'Trình bày-(I)',
		'S': 'Khẩn cầu-(S)',
		'O': 'Lối Mong Mỏi-(O)',
		'M': 'Mệnh Lệnh-(M)',
		'D': 'Mệnh Lệnh-(M)', //msToan accommodate older code
		'N': 'Vô định-(Inf.)',
		'P': 'Phân từ-(P)',
		'R': 'Phân từ Mệnh Lệnh-(PM)'
	},

	particleTypes: {
		'I': 'Từ Nghi vấn-(I)',
		'N': 'Từ Phủ định-(N)'
	}
};
bible.morphology['Greek'] = bible.morphology['robinson'];

// http://openscriptures.github.io/morphhb/parsing/HebrewMorphologyCodes.html
bible.morphology['OSHB'] = {
	format: function(morph) {
		var languageKey = morph.substr(0,1),
			language = this.languages[languageKey],
			morphParts = morph.substr(1).split('/'),
			formattedOutput = '';

		for (var i=0, il=morphParts.length; i<il; i++) {
			var m = morphParts[i],
				partOfSpeechKey = m.substr(0,1),
				partOfSpeech = this.partsOfSpeech[partOfSpeechKey],
				morphCodes = m.length > 0 ? m.substr(1) : '',

				partsList = [],
				details = [];

			switch (partOfSpeechKey) {

				case 'A':
					partsList = ['adjectiveTypes', 'gender', 'number', 'state'];

					break;
				case 'C':
				case 'D':
					// nothing

					break;
				case 'N':

					partsList = ['nounTypes', 'gender', 'number', 'state'];

					break;
				case 'P':

					partsList = ['pronounTypes', 'person', 'gender', 'number'];

					break;
				case 'R':
					partsList = ['prepositionTypes'];

					break;
				case 'S':

					partsList = ['suffixTypes', 'person', 'gender', 'number'];

					break;
				case 'T':

					partsList = ['particleTypes'];

					break;
				case 'V':

					partsList = [language.toLowerCase() + 'VerbStems', 'verbConjugationTypes', 'person', 'gender', 'number', 'state'];

					break;

			}

			for (var j=0, jl=partsList.length; j<jl; j++) {
				if (morphCodes.length > j) {
					details.push( this[ partsList[j] ][ morphCodes.substr(j, 1) ] );
				}
			}



			formattedOutput += (i>0 ? '; ' : '') + partOfSpeech + (details.length > 0 ? ': ' + details.join(', ') : '');
		}

		return formattedOutput;
	},

	partsOfSpeech: {

		'A':'adjective',
		'C':'conjunction',
		'D':'adverb',
		'N':'noun',
		'P':'pronoun',
		'R':'preposition',
		'S':'suffix',
		'T':'particle',
		'V':'verb'
	},

	hebrewVerbStems: {
		'q': 'qal',
		'N': 'niphal',
		'p': 'piel',
		'P': 'pual',
		'h': 'hiphil',
		'H': 'hophal',
		't': 'hithpael',
		'o': 'polel',
		'O': 'polal',
		'r': 'hithpolel',
		'm': 'poel',
		'M': 'poal',
		'k': 'palel',
		'K': 'pulal',

		'Q': 'qal passive',
		'l': 'pilpel',
		'L': 'polpal',
		'f': 'hithpalpel',
		'D': 'nithpael',
		'j': 'pealal',
		'i': 'pilel',
		'u': 'hothpaal',
		'c': 'tiphil',
		'v': 'hishtaphel',
		'w': 'nithpalel',
		'y': 'nithpoel',
		'z': 'hithpoel'
	},

	aramaicVerbStems: {

		'q': 'peal',
		'Q': 'peil',
		'u': 'hithpeel',
		'p': 'pael',
		'P': 'ithpaal',
		'M': 'hithpaal',
		'a': 'aphel',
		'h': 'haphel',
		's': 'saphel',
		'e': 'shaphel',
		'H': 'hophal',
		'i': 'ithpeel',
		't': 'hishtaphel',
		'v': 'ishtaphel',
		'w': 'hithaphel',
		'o': 'polel',
		'z': 'ithpoel',
		'r': 'hithpolel',
		'f': 'hithpalpel',
		'b': 'hephal',
		'c': 'tiphel',
		'm': 'poel',
		'l': 'palpel',
		'L': 'ithpalpel',
		'O': 'ithpolel',
		'G': 'ittaphal'

	},

	verbConjugationTypes: {
		'p': 'perfect (qatal)',
		'q': 'sequential perfect (weqatal)',
		'i': 'imperfect (yiqtol)',
		'w': 'sequential imperfect (wayyiqtol)',
		'h': 'cohortative',
		'j': 'jussive',
		'v': 'imperative',
		'r': 'participle active',
		's': 'participle passive',
		'a': 'infinitive absolute',
		'c': 'infinitive construct'
	},

	adjectiveTypes: {
		'a': 'adjective',
		'c': 'cardinal number',
		'g': 'gentilic',
		'o': 'ordinal number'
	},

	nounTypes: {
		'c': 'common',
		'g': 'gentilic',
		'p': 'proper name'
	},

	pronounTypes: {
		'd': 'demonstrative',
		'f': 'indefinite',
		'i': 'interrogative',
		'p': 'personal',
		'r': 'relative'
	},

	prepositionTypes: {
		'd': 'definite article'
	},

	suffixTypes: {
		'd': 'directional he',
		'h': 'paragogic he',
		'n': 'paragogic nun',
		'p': 'pronominal'
	},

	particleTypes: {
		'a': 'affirmation',
		'd': 'definite article',
		'e': 'exhortation',
		'i': 'interrogative',
		'j': 'interjection',
		'm': 'demonstrative',
		'n': 'negative',
		'o': 'direct object marker',
		'r': 'relative'
	},

	person: {
		'1': 'first',
		'2': 'second',
		'3': 'third'
	},

	gender: {
		'b': 'both (noun)',
		'c': 'common (verb)',
		'f': 'feminine',
		'm': 'masculine'
	},

	number: {
		'd': 'dual',
		'p': 'plural',
		's': 'singular'
	},

	state: {
		'a': 'absolute',
		'c': 'construct',
		'd': 'determined'
	},

	languages: {
		'H': 'Hebrew',
		'A': 'Aramaic'
	}
};

bible.morphology['Hebrew'] = bible.morphology['OSHB'];
