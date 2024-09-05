function changeLanguage(lang) {
	fetch(`/js/translation/${lang}.json`)
		.then((response) => response.json())
		.then((data) => {
			// Update text content
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
		});
}
