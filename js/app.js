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
//Quando la partita termina viene mostrato un messaggio in cui vi è anche il punteggio finale.
//Acquisizione div.
const proclamationElement = document.querySelector('.proclamation');//Element || Null
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
    //Generazione delle bombe.
    //Le bombe saranno sempre 16.
    const bombs = 16; //Number
    //Array con i numeri delle bombe.
    const bombsArray = []; //Array
    //Ciclo while per determinare i numeri.
    while(bombsArray.length < bombs){
        //Generazione nuovo numero.
        const bombPosition = Math.floor(Math.random() * max) + min;
        //Controllare che non sia già nell'array.
        if(bombsArray.includes(bombPosition) === false){
            //Includere il numero generato nell'array.
            bombsArray.push(bombPosition);
        }    
       
    }

    //Dichiarazione della variabile che avrà il compito di tenere il conto dei punti.
    let score = 0; //Number
    //L'utente vincerà se avrà cliccato su tutte le caselle che non contengolo una bomba.
    const cellsWithoutBombs = gridSize(difficulty) - bombsArray.length; //Number
    
    //Dichiarazione dell`array che avrà  il compito di controllare se le caselle siano state già cliccate o meno.
    let clickedCells = []; //Array
    // Se l'utente dovesse perdere, tutte le bombe dovranno essere mostrate. Deve essere quindi dichiarato un array in cui mettere tutte le celle per fare sí che in quel caso il sistema possa controllare tutte le celle con una bomba per poter applicare il colore.
    //Array contenente tutte le celle.
    const cellsArray = []; //Array
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
        //Inserire le celle nell'array che dovrà controllare se sono bombe o meno.
        cellsArray.push(cellElement); 

       //Quando si clicca su una cella essa si colora di azzurro, se vi è una bomba, si colora di rosso.
        cellElement.addEventListener('click', function (){
            //Se la cella è già stata cliccata non accadrà nulla.
            if(clickedCells.includes(num)){
                return
            }
            //Se la cella viene cliccata per la prima volta, il numero viene aggiunto all'array di controllo.
            clickedCells.push(num);

            //La cella contiene una bomba.
            if(bombsArray.includes(num)){
                //Tutte le celle contenenti bombe si colorano di rosso.
                for(index2 = 0; index2 < cellsArray.length; index2++){
                   const num2 = index2 + 1;//Number
                   if(bombsArray.includes(num2)){
                    cellsArray[index2].classList.add('bomb')
                   }
                }
                //L'utente ha perso.
                if(score === 0){
                    proclamationElement.innerHTML = `Hai perso. 
                <br>
                Non hai fatto nessun punto`;
                } else if(score === 1){
                    proclamationElement.innerHTML = `Hai perso. 
                <br>
                Hai totalizzato  ${score} punto.`;
                } else {
                proclamationElement.innerHTML = `Hai perso. 
                <br>
                Hai totalizzato  ${score} punti.`;
                }
            
            // La cella non contiene una bomba.
            } else {
                //La cella si colora diazzurro.
                cellElement.classList.add('safe');
                //Si aggiunge un punto al punteggio.
                score++;

                //L'utente ha vinto.
                //Il punteggio equivale al numero di celle senza bombe.
                if(score === cellsWithoutBombs){
                    proclamationElement.innerHTML = `Hai vinto! 
                <br>
                Hai totalizzato  ${score} punti.`;
                }
            }
            console.log(score);
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














