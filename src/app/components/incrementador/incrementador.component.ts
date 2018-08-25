import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() { }

  ngOnInit() { }

  onChanges(newValue: number) {

    // const elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log(this.txtProgress);

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(newValue);
  }

  cambiarValor(value: number) {
    if (this.progreso <= 0 && value < 0) {
      return this.progreso = 0;
    }

    if (this.progreso >= 100 && value > 0) {
      return this.progreso = 100;
    }

    this.progreso += value;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

}
