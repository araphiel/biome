// Yes TS I am a module.
export type {};

const selectorButtons = document.querySelectorAll(
	".package-manager-selector li",
);
const elements = document.querySelectorAll(
	".package-manager-selector li, .package-manager-command",
);

function setActivePackageManager(name: string) {
	localStorage.setItem("package-manager", name);

	for (const elem of elements) {
		elem.classList.remove("active");
		if (elem.getAttribute("data-name") === name) {
			elem.classList.add("active");
		}
	}
}

for (const button of selectorButtons) {
	button.addEventListener("click", () => {
		setActivePackageManager(button.getAttribute("data-name") ?? "");
	});
}

const stored = localStorage.getItem("package-manager");
if (stored != null) {
	setActivePackageManager(stored);
}

const copyButtons = document.querySelectorAll(
	".package-manager-command button",
);

function commandCopyHandler(button: Element) {
	button.classList.add("copied");
	setTimeout(() => {
		button.classList.remove("copied");
	}, 1000);

	if (button.parentElement !== null) {
		const cmd = button.parentElement.querySelector("code")?.textContent ?? "";
		navigator.clipboard.writeText(cmd);
	}
}

for (const button of copyButtons) {
	button.addEventListener("click", () => {
		commandCopyHandler(button);
	});
}
