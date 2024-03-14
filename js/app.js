//Cliccando sul bottone "Play" verrà generata una griglia le cui dimensioni cambieranno in base alla difficoltà selezionata.
//Acquisizione del bottone.
const submitElement = document.querySelector('.submit');//Element || Null
//Acqisizione livelli di difficoltà.
const difficultyElement = document.querySelector('.difficulties');//Element || Null
//Dichirazione variabile a cui assegnare il valore.
let difficulty = '';//string

// La griglia sarà formata da quadrati uguali che si troveranno all'interno del div con classe grid del DOM
// Acquisizione dell div.
const gridElement = document.querySelector('.grid');//Element||Null
//All'apertura della pagina sarà già presente una prima griglia.
generateGrid()
//Assegnazione del valore al click.
submitElement.addEventListener('click', generateGrid);
function generateGrid(){
    //Cliccando il bottone la griglia prevedente sparirà per lasciare spazio ad una nuova.
    gridElement.innerHTML = ('');

    difficulty = difficultyElement.value;//string
    
    // In base alla difficoltà verrà generata una griglia di dimensioni diverse.
    for(let i = 0; i < gridSize(difficulty); i++){
        
        //Creazione del div che andrà inserito nella griglia.
        const cellElement = document.createElement('div'); //Object
        //Assegnazione al div della classe "cell"
        cellElement.className = 'cell';
        //All'interno di ogni cella ci sarà un numero corrispondente alla sua posizione nella griglia.
        const num = i + 1; //Number
        cellElement.innerHTML = num;
        //A Diversa difficoltà corrisponde una diversa quantità di celle, che quindi avranno dimensioni diverse.
        cellElement.style.width = `calc(100% / ${difficulty})`
        
        //Inserire le celle nel DOM.
        gridElement.append(cellElement);
        
        //Quando si clicca su una cella essa si colora di azzurro, cliccando una seconda volta il colore torna normale.
        cellElement.addEventListener('click', function(){
            cellElement.classList.toggle('colored');
            //Viene stampato un console log in cui si dichiare quale cella è stata cliccata.
            console.log('È stata cliccata la cella numero ' + num);
        })
        
    }
}
    

//Funzione che avrà il compito di determinare la grandezza della griglia.
function gridSize(number){
    let size = 81;
    if (number === '10'){
        size = 100;
    } else if (number === '7'){
        size = 49;
    }
    return size
}
