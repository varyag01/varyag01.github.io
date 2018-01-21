var procent=60; /*Заранее заданный процент*/
var ProgressUnit=document.getElementById('ProgressUnit');/*создание и определение переменной всего блока(во избежание повторения)*/
var shadowColor='#EFEFEC'
/*Создание элемента ПРОГРЕСС (заполненным на 100%) заранее, но с цветом невидимым глазу (можно вообще без цвета) */
for (var glob=0;glob<100;glob++) {
	var progressCircle=document.createElement('div');
	progressCircle.className='progress';
	progressCircle.style.transform='rotate('+glob*3.6+'deg)';
	progressCircle.style.borderTopColor=shadowColor;
	ProgressUnit.appendChild(progressCircle);
};
var fullProcent=0;
var interval;
var nonShadowColor='#FFDB4D';
/*Функции, управляемые кнопкой "Анимация"*/
var animateAfterValue=0;/*Создание переменной, которая помогает определять использовалось ли значение "Value" (ниже по коду), это нужно для сброса вида анимационного круга*/
function startAnimate() {   /*Запуск Анимации.*/
	/*если использовался ввод значения в поле Value, то есть необходимость предварительно очистить круг анимации (следующие 8 строк(18-26) кода)*/
	if(animateAfterValue!=0) {
		for (var c=0;c<animateAfterValue;c++) {
				document.getElementsByClassName("progress")[c].style.borderTopColor=shadowColor; /*очистка круга (анимации)*/
				fullProcent=0;
				document.getElementById('Value').value='0'; /*очистка значения в текстовом блоке*/
				value=0;
			};
			
	};
	animateAfterValue=0; /*сброс значения переменной*/
	interval=setInterval(animateRegular,50);
	nonShadowColor='#FFDB4D';
};
function stopAnimate() {   /*Остановка Анимации.*/
	clearInterval(interval)
};
function animateRegular(){  /*Функция непрерывной анимации*/
	
	if (fullProcent==100) {
		for (var c=0;c<glob;c++) {
			document.getElementsByClassName("progress")[c].style.borderTopColor=shadowColor;
		};
		fullProcent=0;/*обеспечивается непрерывность цикла, и 'fullProcent'не увеличивается до бесконечночти*/
	} else {
		document.getElementsByClassName("progress")[fullProcent].style.borderTopColor=nonShadowColor;
		fullProcent++;
	};
};

/*Блок управления*/
/*Кнопка управления анимацией*/
var onAnimate=0;
var value;
function AnimateButton() {
	value=document.getElementById('Value').value;
	var circleInButton=document.getElementById('AnimatCircleInButton');
	var marginCircle=getComputedStyle(circleInButton).marginLeft;
	var animateButton=document.getElementById('AnimateButton');
		if (marginCircle=='1px') {
		circleInButton.style.marginLeft='21px';
		animateButton.style.background='#7ED321';
		circleInButton.style.background='#FFFFFF';
		onAnimate=1;
		} else {
		circleInButton.style.marginLeft='1px'
		animateButton.style.background='#4A4A4A'
		circleInButton.style.background='#D8D8D8'
		onAnimate=0;
		};
	/*следующий код для запуска функции, которой управляет кнопка (АНИМАЦИЯ)*/
	if (onAnimate!=0) {
		startAnimate();
	} else {
		stopAnimate();
		valueInput();
	};
};
/*Кнопка управления скрытием объекта*/

/*ВНИМАНИЕ!!! скрываться будет путем изменения прозрачности видимой части круга!!!*/

var onHide=0;
function HideButton() {
	var HideCircleInButton=document.getElementById('HideCircleInButton');
	var marginCircle=getComputedStyle(HideCircleInButton).marginLeft;
	var HideButton=document.getElementById('HideButton');
		if (marginCircle=='1px') {
		HideCircleInButton.style.marginLeft='21px';
		HideButton.style.background='#7ED321';
		HideCircleInButton.style.background='#FFFFFF';
		onHide=1;
		} else {
		HideCircleInButton.style.marginLeft='1px'
		HideButton.style.background='#4A4A4A'
		HideCircleInButton.style.background='#D8D8D8'
		onHide=0;
		};
	/*следующий код для запуска функции, которой управляет кнопка*/
	var progress=document.getElementsByClassName('progress');
	
	if (onHide!=0) {
		nonShadowColor=shadowColor;
		for (var a=0;a<100;a++) {
			progress[a].style.borderTopColor=shadowColor;
		};
		if (value!=0) {
			for (var a=0;a<value;a++) {
			progress[a].style.borderTopColor=shadowColor;
		};
		};
	} else {
		nonShadowColor='#FFDB4D';
		for (var a=0;a<fullProcent;a++) {
			progress[a].style.borderTopColor=nonShadowColor;
		};
		if (value!=0) {for (var a=0;a<value;a++) {
			progress[a].style.borderTopColor=nonShadowColor;
			};
		};
	};
};

/*блок ввода значения, реакция на него: если оно не пустое и нажата кнопка анимации (переводится п в положение выкл.)*/

function valueInput() {
	
	if (value>0) { /*проверка значения value (-введено или нет)*/
		/*если введено, то следующие 14 строк кода (сначала очистка, затем анимация*/
		/*Очистка круга*/
		if (fullProcent>0) {
			for (var c=0;c<glob;c++) {
				document.getElementsByClassName("progress")[c].style.borderTopColor=shadowColor; /* сам процесс очистки круга анимации*/
				fullProcent=0;
			};
		};
		 /*При использовании Value Анимация*/
		 if (fullProcent==0) {
		 		var c=0;
		 		var valueAnimInterval;
		 		function valueAnim() {
					document.getElementsByClassName("progress")[c++].style.borderTopColor=nonShadowColor;
					animateAfterValue++;
					if (c==value) {clearInterval(valueAnimInterval)}
		 		};
			valueAnimInterval=setInterval(valueAnim,50);
		};
	};
}

