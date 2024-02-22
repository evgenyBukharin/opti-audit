/******/ (() => {
	// webpackBootstrap
	/******/ var __webpack_modules__ = {
		/***/ 161: /***/ () => {
			const fileLabels = document.querySelectorAll(".audit__label-file");
			fileLabels.forEach((label) => {
				let input = label.querySelector("input");
				let textElement = label.querySelector("span");
				input.addEventListener("change", () => {
					switch (input.files.length) {
						case 0:
							textElement.innerText = "Выберите файл";
							break;
						case 1:
							textElement.innerText = `Выбран файл: ${input.files[0].name}`;
							break;
						default:
							textElement.innerText = `Выбрано файлов: ${input.files.length}`;
							break;
					}
				});
			});

			/***/
		},

		/******/
	};
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		});
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be in strict mode.
	(() => {
		"use strict"; // CONCATENATED MODULE: ./src/js/_vars.js

		/* harmony default export */ const _vars = {
			windowEl: window,
			documentEl: document,
			htmlEl: document.documentElement,
			bodyEl: document.body,
		};
		// EXTERNAL MODULE: ./src/js/components/file-inputs.js
		var file_inputs = __webpack_require__(161); // CONCATENATED MODULE: ./src/js/_components.js // CONCATENATED MODULE: ./src/js/main.js
	})();

	/******/
})();
