import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pago-mercadopago',
  templateUrl: './pago-mercadopago.component.html',
  styleUrls: ['./pago-mercadopago.component.css']
})
export class PagoMercadopagoComponent implements OnInit {

  PUBLIC_KEY = 'TEST-366bb1a8-1506-4b7f-935f-e10999fe6b5c'
  AUTH_KEY = 'TEST-4098695958980794-042601-bbf0cd1a389dea655e9504621063e743-25259647'

  mercadoPagoFormGroup: FormGroup;
  description;
  transaction_amount = '1000';
  cardNumber;
  cardholderName;
  cardExpirationMonth;
  cardExpirationYear;
  securityCode;
  installments;
  docType;
  docNumber;
  email;
  installments_hidden;

  tiposDni = [];
  cuotas = [];
  hayCuotas = false;

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService) { }

  ngOnInit() {
    Mercadopago.setPublishableKey(this.PUBLIC_KEY);

    //NO ME SIRVE PORQUE NO ME DEJA TRAER LOS DATOS EN EL DATA-CHECKOUT DEL MAT-SELECT
    //Mercadopago.getIdentificationTypes(); 

    this._auth.get_tipos_dni(this.AUTH_KEY).subscribe(
      res => {
        for (let index = 0; index < res.length; index++) {
          this.tiposDni.push(res[index].name)
        }
      }
    )

    this.mercadoPagoFormGroup = this._formBuilder.group({
      description: [''],
      transaction_amount: ['1000'], //definir valor dependiendo de donde se pida a MP
      cardNumber: ['', Validators.required],
      cardholderName: ['', Validators.required],
      cardExpirationMonth: ['', Validators.required],
      cardExpirationYear: ['', Validators.required],
      securityCode: ['', Validators.required],
      installments: ['', Validators.required],
      docType: ['', Validators.required],
      docNumber: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  guessPaymentMethod() {
    //let cardnumber = (<HTMLInputElement>document.getElementById("cardNumber")).value
    let cardnumber = this.cardNumber;
    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0, 6);
      Mercadopago.getPaymentMethod({ "bin": bin }, this.setPaymentMethod);

      if (cardnumber.length > 6) {
        this.cuotas.length = 0;
        let cuotas_hidden = (<HTMLSelectElement>document.getElementById('installments_hidden')).children;
        for (let i = 0; i < cuotas_hidden.length; i++) {
          const element = cuotas_hidden[i];
          this.cuotas.push(element.innerHTML.toString())
        }
        console.log(this.cuotas.length)
        this.hayCuotas = true;
      } else {
        this.hayCuotas = false;
      }

    }
  };

  setPaymentMethod(status, response) {
    if (status == 200) {
      let paymentMethodId = response[0].id;
      let element = (<HTMLInputElement>document.getElementById('payment_method_id'));
      element.value = paymentMethodId;
      Mercadopago.getInstallments(
        /*
        {
          "payment_method_id": (<HTMLInputElement>document.getElementById('payment_method_id')).value,
          "amount": parseFloat((<HTMLInputElement>document.getElementById('transaction_amount')).value)
        },
        */
        {
          "payment_method_id": (<HTMLInputElement>document.getElementById('payment_method_id')).value,
          "amount": parseFloat((<HTMLInputElement>document.getElementById('transaction_amount_hidden')).value)
        },
        function (status, response) {
          if (status == 200) {
            (<HTMLSelectElement>document.getElementById('installments_hidden')).options.length = 0;
            response[0].payer_costs.forEach(installment => {
              let opt = <HTMLOptionElement>document.createElement('option');
              opt.text = installment.recommended_message;
              opt.value = installment.installments;
              (<HTMLSelectElement>document.getElementById('installments_hidden')).appendChild(opt);
            });
          } else {
            alert(`installments method info error: ${response}`);
          }
        });
    } else {
      alert(`payment method info error: ${response}`);
    }

  }

  doSubmit = false;

  doPay(event) {
    event.preventDefault();
    if (!this.doSubmit) {
      var $form = (<HTMLFormElement>document.querySelector('#pay'));
      Mercadopago.createToken($form, this.sdkResponseHandler);
      return false;
    }
  };

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
      alert("verify filled data");
    } else {
      var form = (<HTMLFormElement>document.querySelector('#pay'));
      var card = (<HTMLInputElement>document.createElement('input'));
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', response.id);
      form.appendChild(card);
      this.doSubmit = true;
      console.log(card)
      console.log(form)
      //form.submit();
    }
  };

}
