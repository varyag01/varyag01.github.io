/** 
*Объявление и определение переменной-всего блока(во избежание повторения).
*/
var ProgressUnit=document.getElementById('ProgressUnit');
/**
*Объявление переменной ("затемненный цвет"), содержащей в себе свойства цвета при невидимом блоке анимации, т.к. блок создается сразу (но без цвета)
*/
var shadowColor='#EFEFEC'
/**
*Цикл, совершающий 100 интераций (подразумевает 100%), создащий элемент ПРОГРЕСС (заполненный на 100%) заранее, из 100 объектов,
 но с цветом невидимым глазу (но, можно вообще без цвета).
*/

for (var glob=0;glob<100;glob++) {
/**
*Создание элемента "div" и объявление под него переменной.
*/	
	var progressCircle=document.createElement('div');
/**
*Присваивание элементу класса.
*/
	progressCircle.className='progress';
/**
*Присваивание создаваемому элементу свойства "transform", со значением, при каждой новой интерации, 
увеличенным на 3.6 градуса(360градусов/100%=3.6градуса)
*/
	progressCircle.style.transform='rotate('+glob*3.6+'deg)';
/**
*Присваивание создаваемому элементу свойства "border-top-color", со значением из переменной "shadowColor".
*/
	progressCircle.style.borderTopColor=shadowColor;
/**
*Добавление элемента в конец дочерних элементов "ProgressUnit" (Всего блока анимации)
*/
	ProgressUnit.appendChild(progressCircle);
};
/**
*Объявление переменной, означающая процент заполненяемости, а также и заполненности визульного блока анимации.
*/
var fullProcent=0;
/**
*Создание переменной, которой, в одной из следующих функций, будет присвоено значение "внутренний таймер-планировщик".
*Переменная выведена в эту чать документа для вывода ее из области видимости "только внутри функции".
*/
var interval;
/**
*создание переменной, содержащей информацию о цвете визульного блока
*/
var nonShadowColor='#FFDB4D';
/**
*Создание переменной, которая помогает определять вводилось ли значение в поле "Value" , 
это понадобится для сброса вида анимационного круга.
*/
var animateAfterValue=0;
/**
*Функция Анимации. Управляется кнопкой "Анимация".
*/
function startAnimate() {
/**
*Проверка: вводилось ли значение в поле "Value", и если да,- то очистка 
анимационного блока в первоначальное (незаполненное) состояние, т.е. изменение цвета.
*/	
if(animateAfterValue!=0) {
/**
*Цикл, совершающий интерации в количестве равном значению 'Value'
*/	
	for (var c=0;c<animateAfterValue;c++) {
/**
*Получение элементов с классом "progress", перебор их, и присваивание им цвета "shadowColor" (цвет, при котором прогресс блок становится невидимым), 
* как бы очистка круга (анимации)
*/		
		document.getElementsByClassName("progress")[c].style.borderTopColor=shadowColor;
/**
*Очистка переменной, означающей процент заполненяемости, а также и заполненности визульного блока анимации.
*/		
		fullProcent=0;
/**
* Получение элемента с ID='Value' - текстового блока (блока ввода значения),
*и его очистка.
*/		
		document.getElementById('Value').value='0';
/**
*Присваивание переменной value, значения 0 (обнуление).
*/
		value=0;
	};
};
/**
*Сброс значения переменной (эта переменная, которая помогает определять вводилось ли значение в поле "Value")
*/
	animateAfterValue=0;
/**
*Внутренний таймер-планировщик, присваивается значением переменной, для возможности в последующем остановить.
*/
	interval=setInterval(animateRegular,50);
/**
*Присваивание переменной, используемой в анимационном блоке как цвет не скрытий от глаз, значения цвета.
*/	
	nonShadowColor='#FFDB4D';
};
/**
*Объявление функции и запись в нее параметров для остановки анимации.
*/
function stopAnimate() {
	clearInterval(interval)
};
/**
*Объявление функции непрерывной анимации.
*/
function animateRegular(){
	
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
var apiControl=0;
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
		apiControl=0;
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

/**
*Объявление функции очистки круга анимации (в случае, если он не пуст, кроме случая управления через API)
*/
function clearAnimCircle () {
	for (var c=0;c<glob;c++) {
				document.getElementsByClassName("progress")[c].style.borderTopColor=shadowColor; /* сам процесс очистки круга анимации*/
				fullProcent=0;
	};
};


function valueInput() {
/**
*проверка значения value (-введено или нет), в случае ввода в блоке "input"
*/	
	if (value>0) {
/**
*Проверка заполненности круга, и если заполнен, то вызов функции очистки круга.
*/		
		if (fullProcent>0) {
			clearAnimCircle();
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
};

/*API*/
var progress={
	setValue: function() {value=arguments[0];apiControl+=1;stopAnimate();apiAnim();},
 	setMod:function animated() {
 		if (arguments[0]=='animated'){
 			if(arguments[1]=='yes') {startAnimate()}
 			else if (arguments[1]=='') {stopAnimate()};
 		};
 	}
};
/**
*Объявление функции запускающейся под управлением API 'progress.setValue()'.
*Под эту функцию создается отдельная переменная, сохраниющая предыдущее значение - необходима для продолжения с последнего значения.
*/
var lastValueApi=0;
function apiAnim() {
/**
*Проверка запуска функции через апи "progress.setValue()". 1 -означает первый запуск и требуется очистка, 
*2 и более - последующий запуск и очистка не требуется.
*/	
	if (apiControl<2) {
		for (var c=0;c<100;c++) {
				document.getElementsByClassName("progress")[c].style.borderTopColor=shadowColor; 
	};};
/**
*Сам процесс заполнения
*/
	for (lastValueApi=0;lastValueApi<value;lastValueApi++) {
	document.getElementsByClassName("progress")[lastValueApi].style.borderTopColor='#ffdb4d';
	}
};


/*
progress.setMod('animated','start')
progress.setValue(75)
*/
