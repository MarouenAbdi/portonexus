function changeLanguage(lang) {
	// Load the language file
	fetch(`${lang}.json`)
		.then((response) => response.json())
		.then((translationData) => {
			// Get all elements with the data-translate attribute
			document.querySelectorAll('[data-translate]').forEach((element) => {
				// Get the key for the translation
				const key = element.getAttribute('data-translate');

				// Look for the translation in the loaded JSON data
				if (translationData[key]) {
					element.textContent = translationData[key];
				} else {
					console.warn(`Translation key '${key}' not found in '${lang}.json'`);
				}
			});
		})
		.catch((error) => {
			console.error(`Error loading ${lang}.json:`, error);
		});
}
