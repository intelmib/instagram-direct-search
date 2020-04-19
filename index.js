let Glkeyworlds = []; //palavras que o user quer buscar
let GlmaxChats = 20; //valor padrao quantidade de chats a serem abertos
let Glmatch = {};
let listChats = null;
let end = false;

const createLabelstoKeyworlds = (keyworlds) => {
	const label = document.createElement("span");
	label.innerText = keyworlds;
	label.className = "labelKeyworlds";
	label.title = "clique para excluir";

	if (!Glkeyworlds.includes(keyworlds)) {
		Glkeyworlds.push(keyworlds.toLowerCase());
	} else {
		alert("Opa, tu ja inseriu essa");
		return null;
	}

	label.addEventListener("click", () => {
		Glkeyworlds = Glkeyworlds.filter((item) => {
			return item !== label.innerText;
		});
		label.parentNode.removeChild(label);
	});
	return label;
};

const createLabelstoKeyworldsResetLayout = (keyworlds) => {
	const label = document.createElement("span");
	label.innerText = keyworlds;
	label.className = "labelKeyworlds";
	label.title = "clique para excluir";

	label.addEventListener("click", () => {
		Glkeyworlds = Glkeyworlds.filter((item) => {
			return item !== label.innerText;
		});
		label.parentNode.removeChild(label);
	});
	return label;
};

const createLayout = () => {
	const div = document.querySelector(
		".pV7Qt._6Rvw2.Igw0E.IwRSH.YBx95.ybXk5._4EzTm.i0EQd"
	);

	if (div) {
		const mainDiv = document.createElement("div");
		const oneDiv = document.createElement("div");
		const secDiv = document.createElement("div");
		const containerInputs = document.createElement("div");
		const containerKeyworlds = document.createElement("div");
		const gridLayout = document.createElement("div");

		oneDiv.className = "containerOne";
		secDiv.className = "containerOne";
		containerInputs.className = "containerInputs";
		containerKeyworlds.className = "containerKeyworlds";
		gridLayout.className = "gridLayout";

		const myTextarea = document.createElement("textarea");
		myTextarea.placeholder = "Ex.: Rua alameda";

		const myButton = document.createElement("button");
		myButton.innerText = "+";

		const myTextareatwo = document.createElement("textarea");
		myTextareatwo.placeholder = "Ex.: 10";
		myTextareatwo.classList.add("textAreatwo");

		const myButtontwo = document.createElement("button");
		myButtontwo.innerText = "definir";

		const buttonSearch = document.createElement("button");
		buttonSearch.innerText = "Buscar";
		buttonSearch.className = "buttonSearch";

		const spanOne = document.createElement("span");
		const spanTwo = document.createElement("span");

		spanOne.innerText =
			"Add as palavras para serem procuradas(uma por vez, ou uma frase)";
		spanTwo.innerText =
			"Coloque a quantidade de conversas que você deseja conferir";

		myButton.addEventListener("click", () => {
			if (myTextarea.value) {
				let result = createLabelstoKeyworlds(myTextarea.value);
				if (result) {
					myTextarea.value = "";
					gridLayout.appendChild(result);
				}

				// console.log(Glkeyworlds);
			}
		});

		myButtontwo.addEventListener("click", () => {
			if (myTextareatwo.value) {
				if (/^[0-9]+$/.test(myTextareatwo.value)) {
					GlmaxChats = parseInt(myTextareatwo.value);
				} else {
					alert("apenas números, e também maior que 0");
				}
			}
		});

		buttonSearch.addEventListener("click", () => {
			if (Glkeyworlds.length === 0) {
				alert("Sem palavra pra buscar o algoritmo não roda");
			} else {
				Play();
			}
		});

		if (Glkeyworlds.length > 0) {
			Glkeyworlds.map((key) => {
				let result = createLabelstoKeyworldsResetLayout(key);
				if (result) {
					gridLayout.appendChild(result);
				}
			});
		}

		containerKeyworlds.appendChild(gridLayout);

		oneDiv.appendChild(myButton);
		oneDiv.appendChild(myTextarea);

		secDiv.appendChild(myButtontwo);
		secDiv.appendChild(myTextareatwo);

		containerInputs.appendChild(spanOne);
		containerInputs.appendChild(oneDiv);
		containerInputs.appendChild(spanTwo);
		containerInputs.appendChild(secDiv);
		containerInputs.appendChild(buttonSearch);

		mainDiv.appendChild(containerInputs);
		mainDiv.appendChild(containerKeyworlds);

		mainDiv.className = "extensionContainer";
		div.parentNode.insertBefore(mainDiv, div);
		return true;
	} else {
		return false;
	}
};

const loop = setInterval(() => {
	if (createLayout()) {
		clearInterval(loop);
	}
}, 1000);

const verifyLayout = setInterval(() => {
	let container = document.querySelector(".extensionContainer");
	if (!container) {
		createLayout();
	}
}, 1000);

//pra cima apenas pra criar o layout pro usuario

const test = async () => {
	const a = await document.querySelectorAll(".-qQT3.rOtsg");
	if (a) {
		return a;
	}
	return null;
};
let updateLoop = setInterval(async () => {
	listChats = await test();
}, 500);

const createCsv = () => {
	let csvContent;
	if (Glkeyworlds.length > 0) {
		Glkeyworlds.map((key) => {
			let csv = "user,date\n";
			Glmatch[key].map((e) => {
				csv +=
					e.name.split(",").join("-") +
					"," +
					e.date.split(",").join("-");
				csv += "\n";
			});

			let hiddenElement = document.createElement("a");
			hiddenElement.href =
				"data:text/csv;charset=utf-8," + encodeURI(csv);
			hiddenElement.target = "_blank";
			hiddenElement.download = `${key}.csv`;
			hiddenElement.click();
		});
	}
};

const endIntervalandExit = (intervals) => {
	if (intervals) {
		if (!end) {
			intervals.forEach((element) => {
				clearInterval(element);
			});
			console.log(Glmatch);
			createCsv();
			console.log("[x] A busca terminou. Adeus.");
		}
	} else {
		console.log("[!] Erro com os Interval.");
	}
};

const getMensages = async (people) => {
	let containerChat = await document.querySelector(".VUU41");
	let allDivs = null;
	let span = "";
	let peopleMessages = {
		user: people,
		msg: [],
	};
	if (containerChat) {
		allDivs = await containerChat.querySelectorAll(
			"._7UhW9.PIoXz.MMzan._0PwGv.fDxYl.l4b0S, ._7UhW9.xLCgt.MMzan.KV-D4.p1tLr.hjZTB"
		);
	}

	let subContainer = {
		date: null,
		spans: [],
	};
	for (let j = 0; j < allDivs.length; j++) {
		if (
			/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(
				allDivs[j].innerText
			)
		) {
			if (subContainer.date !== null) {
				// searchInText(subContainer.spans, keyFilter);
				// peopleMessages.msg.push(subContainer);
				// console.log(subContainer);
				subContainer = {
					date: null,
					spans: [],
				};
			}
			subContainer.date = allDivs[j].innerText;
		} else {
			span = allDivs[j].innerText;
			span = span.toLowerCase();
			if (span) {
				Glkeyworlds.map((key) => {
					span.includes(key)
						? Glmatch[key].push({
								date: subContainer.date,
								name: people,
						  })
						: null;
				});
				// subContainer.spans.push(span);
			}
		}
		if (subContainer.date === null || j === allDivs.length - 1) {
			// peopleMessages.msg.push(subContainer);
		}
	}
	// console.log(Glmatch);
};

async function Play() {
	let i = 0;
	let visited = [];
	let oldmaxHeight = 0;
	let people = null;
	end = false;

	Glkeyworlds.map((key) => {
		Glmatch[key] = [];
	});
	// console.log(Glmatch);

	let loop = setInterval(async function () {
		if (listChats[i]) {
			//var sendo att a cada 500ms
			people = await listChats[i].querySelector(
				"._7UhW9.xLCgt.MMzan.KV-D4.fDxYl"
			).innerText;
			if (!visited.includes(listChats[i].href)) {
				if (visited.length + 1 <= GlmaxChats) {
					visited.push(listChats[i].href);
					listChats[i].click();
					setTimeout(() => {
						getMensages(people);
					}, 900);
					i = i - 1; //instagram att os nodes, preciso voltar uma posicao para nao pular ninguem
					flag = true;
				}
			} else {
				// console.log("negado", people);
			}
		}
		if (visited.length === GlmaxChats) {
			//flag pro user definir o max de chats para verificar
			setTimeout(() => {
				endIntervalandExit([loop, updateLoop, verifyLayout]);
				end = true;
			}, 3000);
		}
		if (i === listChats.length) {
			//quando chega no fim das conversas visiveis, o scroll vai pra baixo
			let scroll = document.querySelectorAll(".N9abW");
			oldmaxHeight = scroll[0].scrollHeight;
			scroll[0].scrollTop = scroll[0].scrollHeight;

			if (scroll[0].scrollTop >= scroll[0].scrollHeight) {
				//fim do scroll, fim das conversas
				endIntervalandExit([loop, updateLoop, verifyLayout]);
				end = true;
			}

			setTimeout(() => {
				if (oldmaxHeight === scroll[0].scrollHeight) {
					//scroll nao foi no maximo, mas nao da pra att pq ja acabou as conversas
					setTimeout(() => {
						endIntervalandExit([loop, updateLoop, verifyLayout]);
						end = true;
					}, 3200);
				}
			}, 1000);

			i = 0;
		}

		i++;
	}, 1000);
}
