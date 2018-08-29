import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaElObservable().subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaElObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        /*if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }*/
        /*if (contador === 2) {
          observer.error('Auxilio!');
        }*/
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((value, index) => {
        if (value % 2 === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }

}
