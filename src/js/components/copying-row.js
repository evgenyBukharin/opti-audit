const addNewRowButtons = document.querySelectorAll(".audit__button-new");
addNewRowButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		appendNewEmptyRow(btn);
	});
});

function appendNewEmptyRow(btn) {
	let parentRow = btn.closest(".audit__row");
	let newRow = document.createElement("div");
	newRow.classList = "audit__row";
	newRow.innerHTML = parentRow.innerHTML;
	let textarea = newRow.querySelector(".audit__textarea");
	if (textarea) {
		let splittedTextareaId = textarea.getAttribute("id").split("-");
		splittedTextareaId[1]++;
		let newTextareaId = splittedTextareaId.join("-");
		textarea.setAttribute("name", newTextareaId);
		textarea.setAttribute("id", newTextareaId);
	}
	let fileInput = newRow.querySelector(".audit__input-file");
	if (fileInput) {
		let splittedId = fileInput.getAttribute("id").split("-");
		splittedId[1]++;
		let newId = splittedId.join("-");
		fileInput.closest("label").setAttribute("for", newId);
		fileInput.setAttribute("id", newId);
		fileInput.setAttribute("name", newId);

		let textElement = newRow.querySelector(".audit__text");
		textElement.innerText = "Выберите файл";
		fileInput.addEventListener("change", () => {
			switch (fileInput.files.length) {
				case 0:
					textElement.innerText = "Выберите файл";
					break;
				case 1:
					textElement.innerText = `Выбран файл: ${fileInput.files[0].name}`;
					break;
				default:
					textElement.innerText = `Выбрано файлов: ${fileInput.files.length}`;
					break;
			}
		});
	}
	let newRowBtn = newRow.querySelector(".audit__button-new");
	newRowBtn.addEventListener("click", () => {
		appendNewEmptyRow(newRowBtn);
	});
	let deleteRowBtn = newRow.querySelector(".audit__button-delete");
	deleteRowBtn.addEventListener("click", () => {
		deleteRow(deleteRowBtn);
	});

	btn.disabled = true;

	parentRow.insertAdjacentElement("afterend", newRow);
}

function deleteRow(button) {
	let parentRow = button.closest(".audit__row");
	parentRow.previousElementSibling.querySelector(".audit__button-new").disabled = false;
	parentRow.remove();
}
