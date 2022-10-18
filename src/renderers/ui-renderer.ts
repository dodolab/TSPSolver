

export class UIRenderer {
	canvas: HTMLCanvasElement;
	mapWidth: number;
	mapHeight: number;

	init(canvas: HTMLCanvasElement, mapWidth: number, mapHeight: number) {
		this.canvas = canvas;
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.initResizeHandler();
		this.initSliders();
	}

	initResizeHandler = () => {
		this.resizeHandler();
		window.addEventListener('resize', this.resizeHandler.bind(this));
	}

	resizeHandler = () => {
		if (window.innerWidth > window.innerHeight) {
			this.canvas.height = window.innerHeight;
			this.canvas.width = this.canvas.height * (this.mapHeight / this.mapWidth);
		} else {
			this.canvas.width = window.innerWidth;
			this.canvas.height = this.canvas.width * (this.mapHeight / this.mapWidth);
		}
	}

	initSliders() {
		const parent = document.querySelector('.range-slider');

		const rangeS = parent.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>,
			numberS = parent.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;

		rangeS.forEach((el: HTMLElement) => {
			el.oninput = () => {
				let slide1 = parseFloat(rangeS[0].value),
					slide2 = parseFloat(rangeS[1].value);

				if (slide1 > slide2) {
					[slide1, slide2] = [slide2, slide1];
				}

				numberS[0].value = `${slide1}`;
				numberS[1].value = `${slide2}`;
			}
		});

		numberS.forEach((el) => {
			el.oninput = () => {
				let number1 = parseFloat(numberS[0].value),
					number2 = parseFloat(numberS[1].value);

				if (number1 > number2) {
					let tmp = number1;
					numberS[0].value = `${number2}`;
					numberS[1].value = `${tmp}`;
				}

				rangeS[0].value = `${number1}`;
				rangeS[1].value = `${number2}`;
			}
		});
	};
}