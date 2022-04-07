import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  valorGasolina: number = null;
  distanciaViagem: number = null;
  consumoCarro: number = null;
  precoViagem: number = 0;
  valorViagem: number = null;
  myForm : FormGroup;

  constructor(private maskPipe: MaskPipe) {
    this.myForm = new FormGroup({
      gasolina: new FormControl(''),
      distancia: new FormControl(''),
      consumo: new FormControl(''),
    });
  }

  calcularTotal() {
    this.precoViagem =
      (this.valorGasolina * this.distanciaViagem) / this.consumoCarro;
    this.precoViagem.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    if (!this.precoViagem) {
      alert('Complete todos os campos!');
      return;
    }
  }
  limpar() {
    this.valorGasolina = null;
    this.distanciaViagem = null;
    this.consumoCarro = null;
    this.precoViagem = null;
    this.valorViagem = null;
  }

  updateWithMask(event) {
    this.myForm.controls.gasolina.setValue(
      this.maskPipe.transform(event.currentTarget.value, 'separator.2;thousandSeparator:.')
    );
  }
}
