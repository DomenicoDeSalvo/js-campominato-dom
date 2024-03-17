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
generateGrid();
//Assegnazione del valore al click.
submitElement.addEventListener('click', generateGrid);
function generateGrid(){
    //Cliccando il bottone la griglia prevedente sparirà per lasciare spazio ad una nuova.
    gridElement.innerHTML = ('');
    difficulty = difficultyElement.value;//string
    //Quando la griglia viene generate vengono generate anche le bombe.
    //Il numero minimo sarà 1.
    const min = 1;//Number
    //Il numero massimo corrisponderà al numero delle caselle della griglia per il dato livello.
    const max = gridSize(difficulty); //Number
    const bombs = 16; //Number
    const bombsArray = []; //Array
    //Ciclo while per determinare i numeri.
    while(bombsArray.length < 16){
        //Generazione nuovo numero.
        const bombPosition = Math.floor(Math.random() * max) + min;
        //Controllare che non sia già nell'array.
        if(bombsArray.includes(bombPosition) === false){
            bombsArray.push(bombPosition);
        }    
    }
    
    //Dichiarazione dellárray che avrà  il compito di controllare se le caselle siano state già cliccate o meno.
    let clickedCells = []; //Array
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

       //Quando si clicca su una cella essa si colora di azzurro, se vi è una bomba, si colora di rosso.
        cellElement.addEventListener('click', function (){
            //Se la cella è già stata cliccata non accadrà nulla.
            if(clickedCells.includes(num)){
                return
            }
            //Se la cella viene cliccata per la prima volta, il numero viene aggiunto allárray di controllo.
            clickedCells.push(num);

            //La cella contiene una bomba.
            if(bombsArray.includes(num)){
                //La cella si colora di rosso.
                cellElement.classList.add('bomb');
            
            // La cella non contiene una bomba.
            } else {
                //La cella si colora diazzurro.
                cellElement.classList.add('safe');
            }
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














