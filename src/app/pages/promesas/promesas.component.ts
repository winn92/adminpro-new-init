import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then(msg => console.log('Termino!', msg))
      .catch(error => console.error('Error en la promesa', error));
  }

  ngOnInit() {
  }

  private contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          // reject('Simplemente un error');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
