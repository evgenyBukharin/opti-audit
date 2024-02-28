const auditForm = document.getElementById("auditForm");
auditForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let formData = new FormData(auditForm);
	for (var pair of formData.entries()) {
		console.log(pair[0] + ", " + pair[1]);
	}
});
