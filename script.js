const lista = document.querySelector("#lista-task");
const contatore = document.querySelector("#contatore");
const nuovo = document.querySelector("#nuovo-task");
const bottoneAggiungi = document.querySelector("#bottone-aggiungi");
const filtri = document.querySelectorAll(".filtri button");

let task = [
   {
      nome: "Pagare le bollette",
      id: 1,
      completato: true,
   },
   {
      nome: "Studiare JavaScript",
      id: 2,
      completato: false,
   },
   {
      nome: "Comprare il pane",
      id: 3,
      completato: true,
   },
   {
      nome: "Chiamare il dentista",
      id: 4,
      completato: false,
   },
]

/*CORREZIONE DI DARIO

FACENDO COSI MI ELIMINO L'IF PERCHÈ RIPORTO TUTTO DIRETTAMENTE
*/
let filtro = 'tutti';
let prossimoId = 5;

function aggiungiTask() {
   lista.innerHTML = '';

   // Filtra i task in base alla variabile "filtro" corrente
   const visibili = task.filter((t) => {
      if (filtro === 'attivi') return !t.completato;
      if (filtro === 'completati') return t.completato;
      return true;
   });

   //  Per ogni task visibile, crea gli elementi HTML corrispondenti
   visibili.forEach((singolo) => {
      const li = document.createElement('li');
      if (singolo.completato) li.classList.add('completato');
      // Crea la checkbox per spuntare il task
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = singolo.completato;
      // Evento al cambio di stato della checkbox (spunta / togli spunta)
      checkbox.addEventListener('change', (e) => {
         singolo.completato = checkbox.checked;
         // Aggiorna la schermata
         aggiungiTask();
      });
      // Crea lo <span> che contiene il testo del task
      const testo = document.createElement('span');
      testo.classList.add('testo');
      testo.textContent = singolo.nome;
      // Crea il pulsante "Elimina" per cancellare il task
      const bottone = document.createElement('button');
      bottone.setAttribute('type', 'button');
      bottone.classList.add('elimina');
      bottone.textContent = 'Elimina';
      // Evento al click sul pulsante elimina
      bottone.addEventListener('click', (e) => {
         // Rimuove il task filtrando via quello con l'ID corrispondente
         task = task.filter((t) => t.id !== singolo.id);
         // Aggiorna la schermata
         aggiungiTask();
      });

      //appendi tutti i child al padre
      li.appendChild(checkbox);
      li.appendChild(testo);
      li.appendChild(bottone);
      lista.appendChild(li);
   });
   //Aggiorna il contatore calcolando quanti task NON sono completati
   contatore.textContent = task.filter((t) => !t.completato).length;
   //Aggiorna la grafica dei bottoni di filtro (aggiunge o toglie la classe "attivo")
   // Aggiorna la grafica dei bottoni di filtro usando l'IF/ELSE con add e remove
   filtri.forEach((bottone) => {
      if (bottone.textContent.toLowerCase() === filtro) {
         bottone.classList.add("attivo");     // Aggiunge la classe se è il filtro attivo
      } else {
         bottone.classList.remove("attivo");  // La rimuove dagli altri
      }
   });
}

bottoneAggiungi.addEventListener("click", (e) => {
   // Legge il valore dell'input rimuovendo gli spazi vuoti
   const valore = nuovo.value.trim();
   // Se il campo è vuoto, interrompe l'esecuzione
   if (valore === "") return; 

   // Aggiunge il nuovo oggetto task all'array principale
   task.push({ nome: valore, id: prossimoId, completato: false });
   // Incrementa l'ID per il prossimo task futuro e pulisce il campo di input
   prossimoId++;
   nuovo.value = "";
   // Aggiorna la schermata
   aggiungiTask();
});

filtri.forEach((bottone) => {
   bottone.addEventListener("click", (e) => {
      filtro = bottone.textContent.toLowerCase();
      // Aggiorna la schermata
      aggiungiTask();
   });
});

aggiungiTask();




/*

FUNZIONE DI PARTENZA DA IERI

function aggiungiTask() {

   myTask.forEach((task) => {
      const newLi = document.createElement('li');
      newLi.classList.add(`priorita-${task.priorita}`);



      const text = document.createElement('span');
      text.textContent = task.nome;
      newLi.appendChild(text);

      const badge = document.createElement('span');
      badge.classList.add('badge');
      badge.textContent = task.priorita.toUpperCase();
      newLi.appendChild(badge);

      const taskDate = document.createElement('span');
      taskDate.classList.add('data', 'divData');
      taskDate.textContent = task.data.toLocaleString("it-IT") + " ";

      const elimina = document.createElement('button');
      elimina.textContent = 'Elimina';

      taskDate.appendChild(elimina);
      newLi.appendChild(taskDate);

      lista.appendChild(newLi);
   }); // Il forEach ora racchiude tutto la creazione dell'elemento
}

function aggiornaContatore() {
   if (contatore) {
      contatore.textContent = myTask.length;
   }
}

// Chiamata iniziale per mostrare i task all'avvio della pagina
aggiungiTask();
aggiornaContatore()

*/

