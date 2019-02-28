var arrayLts = [] //array donde se guardan las botellas utilizadas
var numberLts;
var cantLts = [7, 5, 3, 2, 1]; //número de litros que hay por botella
var nameBottles = ["Jumbo", "Big", "Medium", "Small", "Petit"]
var i=0;
var faltan = 0;
var fill = 0;
var arrayBottles = []

function getLts(lts){
	numberLts = $(lts).val() //Lee el número de litros a llenar
	faltan = numberLts;
	var fullFill = (numberLts/7).toFixed(2) //Solo toma las 2 primeras decimas
	knowLts(fullFill)
}


function knowLts(ltsRest) {
    if (ltsRest % 1 == 0) { //Si es entero 
        if (arrayBottles[i] >= parseInt(ltsRest)) {
            arrayLts.push(parseInt(ltsRest) + " botella(s) - tamaño  " + nameBottles[i])
            var ltsFill = cantLts[i] * ltsRest
            fill = fill + ltsFill
            faltan = faltan - ltsFill
            arrayBottles[i] = arrayBottles[i] - parseInt(ltsRest)
            if (faltan == 0) {
                printResult()
            } else {
                i = i + 1;
                var newresult = (faltan / parseInt(cantLts[i])).toFixed(2) //se hace una nueva division 
                knowLts(newresult)
            }
        } else if (arrayBottles[i] != 0) {
            arrayLts.push(arrayBottles[i] + " botella(s) - tamaño  " + nameBottles[i])
            var ltsFill = cantLts[i] * arrayBottles[i];
            fill = fill + ltsFill;
            faltan = faltan - ltsFill;
            arrayBottles[i] = arrayBottles[i] - arrayBottles[i]
            if (fill == numberLts) {
                printResult()
            } else {
                i = i + 1;
                var newresult = (faltan / parseInt(cantLts[i])).toFixed(2) //se hace una nueva division 
                knowLts(newresult)
            }
        } else {
            i = i + 1;
            var newresult = (faltan / parseInt(cantLts[i])).toFixed(2) //se hace una nueva division 
            knowLts(newresult)
        }
    } else if(ltsRest == "NaN"){
    	alert("No hay botellas suficientes")
    	resetForm()
    } 
    else { //Si es decimal
        if (ltsRest > 0 && ltsRest < 1) { //Si es mayor a 0 pero menor a 1 el. 0.32
            i = i + 1; //Se aumenta el i para recorrer los lts va de mayor a menor
            var newresult = (faltan / parseInt(cantLts[i])).toFixed(2)
            knowLts(newresult)
        } else {
            var separador = "."; //encuentra el punto en la cadena
            var arregloDeSubCadenas = ltsRest.split(separador); //separa las cantidades, enteros y decimales
            var checkBottles = parseInt(arregloDeSubCadenas[0]) - arrayBottles[i]
            if (arrayBottles[i] >= parseInt(arregloDeSubCadenas[0])) {
                arrayLts.push(arregloDeSubCadenas[0] + " botella(s) - tamaño  " + nameBottles[i]) //el entero son los lts llenados, las decimales lo que falta y se agrega al arreglo final
                var ltsFill = parseInt(arregloDeSubCadenas[0]) * parseInt(cantLts[i]); // se multiplica para saber cuantos litros llenamos
                fill = fill + ltsFill; //si ya se tenian llenados antes se suman con los nuevos
                faltan = faltan - ltsFill; //se hace la resta de los faltantes
                arrayBottles[i] = arrayBottles[i] - parseInt(arregloDeSubCadenas[0])
                i = i + 1;
                var newDiv = (faltan / parseInt(cantLts[i])).toFixed(2)
                knowLts(newDiv, i)
            } else if (arrayBottles[i] != 0) {
                arrayLts.push(arrayBottles[i] + " botella(s) - tamaño  " + nameBottles[i])
                var ltsFill = cantLts[i] * arrayBottles[i];
                fill = fill + ltsFill;
                faltan = faltan - ltsFill;
                arrayBottles[i] = arrayBottles[i] - arrayBottles[i]
                i = i + 1;
                var newresult = (faltan / parseInt(cantLts[i])).toFixed(2) //se hace una nueva division 
                knowLts(newresult)
            } else {
                i = i + 1;
                var newresult = (faltan / parseInt(cantLts[i])).toFixed(2) //se hace una nueva division 
                knowLts(newresult)
            }
        }
    }
}

function printResult(){
	$("#list-result").empty()
	for(var j=0; j < arrayLts.length; j++){
		var appendList = "<li>"+arrayLts[j]+"</li>"
		$("#list-result").append(appendList)
	}
	$("#accept-first").addClass("d-none")
	$("#litros").prop("disabled", true)
	$(".result").removeClass("d-none")
	for(var k=0; k < arrayBottles.length; k++){
		$(".bottles input:eq("+k+")").val(arrayBottles[k])
	}
}

function resetForm(){ 
	$(".result").addClass("d-none");
	$("#litros").prop("disabled", false);
	$("#accept-first").removeClass("d-none");
	arrayLts = [];
	$("#litros").val("")
	i = 0;
	fill = 0;
	faltan = 0;
}

function restrictToNumber(event) {
    event = (event) ? event : window.event
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
    return true
}

function addBottles(){
	var jumbo = $("#jumbo").val()
	var big = $("#big").val()
	var med = $("#med").val()
	var small = $("#small").val()
	var petit = $("#petit").val()

	arrayBottles.push(jumbo, big, med, small, petit)
	$(".bottles input").prop("disabled", true)
	$("#btn-add").addClass("d-none")
	console.log(arrayBottles)
}