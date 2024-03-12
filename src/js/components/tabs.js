export default class Tabs {
	constructor(selector, innerElems, starterId) {
		this.selector = selector;
		this.innerElements = innerElems;
		this.starterId = starterId;
		this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
		if (this.tabs) {
			this.tabList = this.tabs.querySelector("." + innerElems.list);
			this.tabsBtns = this.tabList.querySelectorAll("." + innerElems.button);
			this.tabsPanels = this.tabs.querySelectorAll("." + innerElems.panel);
		} else {
			return;
		}
		this.init();
		this.events();
	}
	init() {
		this.tabList.setAttribute("role", "tablist");
		this.tabsBtns.forEach((el, i) => {
			el.setAttribute("role", "tab");
			el.setAttribute("tabindex", "-1");
			el.setAttribute("id", `${this.selector}${i + 1}`);
			el.classList.remove(this.innerElements.button + "-active");
		});
		this.tabsPanels.forEach((el, i) => {
			el.setAttribute("role", "tabpanel");
			el.setAttribute("tabindex", "-1");
			el.setAttribute("aria-labelledby", this.tabsBtns[i].id);
			el.classList.remove(this.innerElements.panel + "-active");
		});
		this.tabsBtns[this.starterId].classList.add(this.innerElements.button + "-active");
		this.tabsBtns[this.starterId].removeAttribute("tabindex");
		this.tabsBtns[this.starterId].setAttribute("aria-selected", "true");
		this.tabsPanels[this.starterId].classList.add(this.innerElements.panel + "-active");
	}
	events() {
		this.tabsBtns.forEach((el, i) => {
			el.addEventListener("click", (e) => {
				let currentTab = this.tabList.querySelector("[aria-selected]");
				if (e.currentTarget !== currentTab) {
					this.switchTabs(e.currentTarget, currentTab);
				}
			});
			el.addEventListener("keydown", (e) => {
				let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
				let dir = null;
				if (e.which === 37) {
					dir = index - 1;
				} else if (e.which === 39) {
					dir = index + 1;
				} else if (e.which === 40) {
					dir = "down";
				} else {
					dir = null;
				}
				if (dir !== null) {
					if (dir === "down") {
						this.tabsPanels[i].focus();
					} else if (this.tabsBtns[dir]) {
						this.switchTabs(this.tabsBtns[dir], e.currentTarget);
					}
				}
			});
		});
	}
	switchTabs(newTab, oldTab = this.tabs.querySelector("[aria-selected]")) {
		newTab.focus();
		newTab.removeAttribute("tabindex");
		newTab.setAttribute("aria-selected", "true");
		oldTab.removeAttribute("aria-selected");
		oldTab.setAttribute("tabindex", "-1");
		let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
		let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);
		this.tabsPanels[oldIndex].classList.remove(this.innerElements.panel + "-active");
		this.tabsPanels[index].classList.add(this.innerElements.panel + "-active");
		this.tabsBtns[oldIndex].classList.remove(this.innerElements.button + "-active");
		this.tabsBtns[index].classList.add(this.innerElements.button + "-active");
	}
}

// data-saving
const auditSection = document.querySelector(".audit");
let companyId = 14;
const auditData = {
	part1: [],
	part2: [],
	part3: [],
};
let auditDataKeys = Object.keys(auditData);
if (auditSection) {
	const auditTabs = new Tabs(
		"audit-tabs",
		{
			list: "audit__nav",
			button: "tabs__nav-btn",
			panel: "tabs__panel",
		},
		0
	);

	const nextButtons = document.querySelectorAll(".audit__button-next");
	nextButtons.forEach((btn, idx) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();

			// изменяем данные
			let currentPanel = auditTabs.tabsPanels[idx];
			updatePartData(currentPanel, idx);
			updateLocalStorageData(companyId);

			// переключаем на следующую панель
			let nextPanel = document.querySelector(`#audit-tabs${idx + 2}`);
			auditTabs.switchTabs(nextPanel);
		});
	});
}

const mainTabs = new Tabs(
	"root-tabs",
	{
		list: "root__nav",
		button: "root__btn",
		panel: "root__panel",
	},
	0
);

function updatePartData(panel, idx) {
	auditData[auditDataKeys[idx]] = [
		...getValueIdObjectsArray(panel.querySelectorAll("input[type='text']")),
		...getValueIdObjectsArray(panel.querySelectorAll("input[type='number']")),
		...getValueIdObjectsArray(panel.querySelectorAll("input[type='date']")),
		...getValueIdObjectsArray(panel.querySelectorAll("textarea")),
		...getValueIdObjectsArray(panel.querySelectorAll("input:checked")),
	];
}

function updateLocalStorageData(companyId) {
	console.log(auditData);
	localStorage.setItem(`savedAuditData${companyId}`, JSON.stringify(auditData));
}

function getValueIdObjectsArray(nodes) {
	let array = [];
	nodes.forEach((node) => {
		array.push({
			nodeId: node.getAttribute("id"),
			nodeValue: node.value,
		});
	});
	return array;
}

function parseSavedAuditData() {
	let savedAuditData = JSON.parse(localStorage.getItem(`savedAuditData${companyId}`));
	for (const key in savedAuditData) {
		if (Object.hasOwnProperty.call(savedAuditData, key)) {
			const field = savedAuditData[key];
			field.forEach((inputObj) => {
				document.getElementById(inputObj.nodeId).value = inputObj.nodeValue;
			});
		}
	}
}

parseSavedAuditData();
