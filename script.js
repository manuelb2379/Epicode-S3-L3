const lista = document.querySelector("#lista-task");
const contatore = document.querySelector("#contatore");
const nuovo = document.querySelector("#nuovo-task");
const bottoneAggiungi = document.querySelector("#bottone-aggiungi");
const filtri = document.querySelectorAll(".filtri button");

const task = [
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
let filtro = 'tutti'
let prossimoId = 5

function aggiungiTask() {
   lista.innerHTML = '';

   const visibili = task.filter((t) => {
      if (filtro === 'attivi') return !t.completato;
      if (filtro === 'completati') return t.completato;
      return true
   });

   visibili.forEach((singolo) => {
   const li = document.createElement('li');
   if (singolo.completato) li.classList.add('completato');

   const checkbox = document.createElement('input');
   checkbox.type = 'checkbox';
   checkbox.checked = singolo.completato;
   checkbox.addEventListener('change', () => {
      singolo.completato = checkbox.checked;
      aggiungiTask();
   });

   const testo = document.createElement('span');
   testo.classList.add('testo');
   testo.textContent = singolo.nome;

   const bottone = document.createElement('button');
   bottone.setAttribute('type', 'button');
   bottone.classList.add('elimina');
   bottone.textContent = 'Elimina';
   bottone.addEventListener('click', () => {
      task = task.filter((t) => t.id !== singolo.id);
      aggiungiTask();
   });

   li.appendChild(checkbox);
   li.appendChild(testo);
   li.appendChild(bottone);
   lista.appendChild(li);
});

   contatore.textContent = task.filter((t) => !t.completato).length;

   filtri.forEach((bottone) => {
      bottone.classList.toggle("attivo", bottone.textContent.toLowerCase() === filtro);
   });
}

bottoneAggiungi.addEventListener("click", () => {
   const valore = nuovo.value.trim();
   if (valore === "") return;

   task.push({ nome: valore, id: prossimoId, completato: false });
   prossimoId++;
   nuovo.value = "";
   aggiungiTask();
});

filtri.forEach((bottone) => {
   bottone.addEventListener("click", () => {
      filtro = bottone.textContent.toLowerCase();
      aggiungiTask();
   });
});

aggiungiTask();




/*
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

