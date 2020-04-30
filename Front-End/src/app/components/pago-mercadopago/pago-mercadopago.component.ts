import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago-mercadopago',
  templateUrl: './pago-mercadopago.component.html',
  styleUrls: ['./pago-mercadopago.component.css']
})
export class PagoMercadopagoComponent implements OnInit {

  mercadoPagoFormGroup: FormGroup;
  description;
  transaction_amount;
  cardNumber;
  cardholderName;
  cardExpirationMonth;
  cardExpirationYear;
  securityCode;
  installments;
  docType;
  docNumber;
  email;

  constructor(private _formBuilder: FormBuilder) { }

  @ViewChild('pay', { static: false }) pay: ElementRef;

  ngOnInit() {
    Mercadopago.setPublishableKey('TEST-366bb1a8-1506-4b7f-935f-e10999fe6b5c');
    Mercadopago.getIdentificationTypes();

    this.mercadoPagoFormGroup = this._formBuilder.group({
      description: [''],
      transaction_amount: ['', Validators.required],
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

  guessPaymentMethod(event) {
    let cardnumber = (<HTMLInputElement>document.getElementById("cardNumber")).value

    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0, 6);
      Mercadopago.getPaymentMethod({ "bin": bin }, this.setPaymentMethod);
    }
  };

  setPaymentMethod(status, response) {
    console.log(response)
    if (status == 200) {
      let paymentMethodId = response[0].id;
      let element = (<HTMLInputElement>document.getElementById('payment_method_id'));
      element.value = paymentMethodId;
      //this.obtenerInstallments();

      console.log(Mercadopago)

      Mercadopago.getInstallments(
        {
          "payment_method_id": (<HTMLInputElement>document.getElementById('payment_method_id')).value,
          "amount": parseFloat((<HTMLInputElement>document.getElementById('transaction_amount')).value)
        },
        function (status, response) {
          if (status == 200) {
            (<HTMLSelectElement>document.getElementById('installments')).options.length = 0;
            response[0].payer_costs.forEach(installment => {
              let opt = <HTMLOptionElement>document.createElement('option');
              opt.text = installment.recommended_message;
              opt.value = installment.installments;
              (<HTMLSelectElement>document.getElementById('installments')).appendChild(opt);
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

      console.log(Mercadopago)

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
