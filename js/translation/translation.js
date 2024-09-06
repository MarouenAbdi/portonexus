// Function to change language and update UI
function changeLanguage(lang) {
	fetch(`/js/translation/${lang}.json`)
		.then((response) => response.json())
		.then((data) => {
			// Update elements with data-translate attributes
			document.querySelectorAll('[data-translate]').forEach((el) => {
				const key = el.getAttribute('data-translate');
				if (data[key]) {
					el.innerHTML = data[key];
				}
			});

			// Update placeholders
			document
				.querySelectorAll('[data-translate-placeholder]')
				.forEach((el) => {
					const placeholderKey = el.getAttribute('data-translate-placeholder');
					if (data[placeholderKey]) {
						el.setAttribute('placeholder', data[placeholderKey]);
					}
				});

			// Update buttons
			document.querySelectorAll('[data-translate-button]').forEach((el) => {
				const key = el.getAttribute('data-translate-button');
				if (data[key]) {
					el.innerHTML = data[key];
				}
			});
		})
		.catch((error) => {
			console.error('Error loading translation file:', error);
		});
}

// Function to set and save the selected language
function setLanguage(lang) {
	localStorage.setItem('selectedLang', lang.substring(0, 2)); // Save selected language in localStorage
	const langButtons = {
		en: document.getElementById('lang-en'),
		fr: document.getElementById('lang-fr'),
		pt: document.getElementById('lang-pt'),
		es: document.getElementById('lang-es'),
	};

	for (let key in langButtons) {
		if (key === lang) {
			langButtons[key].classList.add('selected');
		} else {
			langButtons[key].classList.remove('selected');
		}
	}
	changeLanguage(lang); // Update the language content on the page
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
	const defaultLang = 'en';
	const systemLang = navigator.language.substring(0, 2);

	// Check if the user has selected a language previously; if not, fall back to system language
	const savedLang = localStorage.getItem('selectedLang') || systemLang;

	const lang = savedLang.startsWith('fr')
		? 'fr'
		: savedLang.startsWith('pt')
		? 'pt'
		: savedLang.startsWith('es')
		? 'es'
		: defaultLang;

	setLanguage(lang);

	// Add event listeners for language buttons
	document
		.getElementById('lang-en')
		.addEventListener('click', () => setLanguage('en'));
	document
		.getElementById('lang-fr')
		.addEventListener('click', () => setLanguage('fr'));
	document
		.getElementById('lang-pt')
		.addEventListener('click', () => setLanguage('pt'));
	document
		.getElementById('lang-es')
		.addEventListener('click', () => setLanguage('es'));
});
