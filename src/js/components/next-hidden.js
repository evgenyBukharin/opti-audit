const auditSection = document.querySelector(".audit");
if (auditSection) {
	const controllers = auditSection.querySelectorAll(".audit__cell-field-radio");
	controllers.forEach((controller) => {
		let parentRow = controller.closest(".audit__row");
		let nextRow = parentRow.nextElementSibling;
		nextRow.classList.add("audit__row-hidden");
		controller.addEventListener("change", (event) => {
			let inputValue = event.target.value;
			if (nextRow) {
				switch (inputValue) {
					case "Да":
						nextRow.classList.remove("audit__row-hidden");
						break;
					case "Нет":
						nextRow.classList.add("audit__row-hidden");
						break;
				}
			}
		});
	});
}

const resultsection = document.querySelector(".result");
if (resultsection) {
	const controllers = resultsection.querySelectorAll(".audit__cell-field-radio");
	controllers.forEach((controller) => {
		let parentRow = controller.closest(".audit__row");
		let nextRow = parentRow.nextElementSibling;
		if (controller.querySelector("input[checked]").value == "Нет") {
			nextRow.classList.add("audit__row-hidden");
		}
	});
}
