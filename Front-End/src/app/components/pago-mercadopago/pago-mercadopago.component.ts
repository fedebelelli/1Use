import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-pago-mercadopago',
  templateUrl: './pago-mercadopago.component.html',
  styleUrls: ['./pago-mercadopago.component.css']
})
export class PagoMercadopagoComponent implements OnInit {

  constructor() { }

  @ViewChild('pay', { static: false }) pay: ElementRef;

  cardnumber = '5031755734530604';
  payment_method_id = 1;
  amount = 500;
  installments = 1;

  ngOnInit() {
    Mercadopago.setPublishableKey('TEST-366bb1a8-1506-4b7f-935f-e10999fe6b5c');
    Mercadopago.getIdentificationTypes();
    console.log(Mercadopago);
    this.guessPaymentMethod();
  }

  guessPaymentMethod() {
    //let cardnumber = document.getElementById("cardNumber").value;

    if (this.cardnumber.length >= 6) {
      let bin = this.cardnumber.substring(0, 6);
      Mercadopago.getPaymentMethod({ "bin": bin }, this.setPaymentMethod);
    }
  };

  setPaymentMethod(status, response) {
    if (status == 200) {
      // let paymentMethodId = response[0].id;
      // let element = this.payment_method_id;
      this.getInstallments();
    } else {
      alert(`payment method info error: ${response}`);
    }
  }

  getInstallments() {
    Mercadopago.getInstallments(
      {
        "payment_method_id": this.payment_method_id,
        "amount": this.amount
      },
      function (status, response) {
        if (status == 200) {
          //document.getElementById('installments').options.length = 0;
          response[0].payer_costs.forEach(installment => {
            let opt = document.createElement('option');
            opt.text = installment.recommended_message;
            opt.value = installment.installments;
            this.installments.appendChild(opt);
            //document.getElementById('installments').appendChild(opt);
          });
        } else {
          alert(`installments method info error: ${response}`);
        }
      });
  }

  doSubmit = false;

  doPay(event) {
    event.preventDefault();
    if (!this.doSubmit) {
      var $form = this.pay;
      Mercadopago.createToken($form, this.sdkResponseHandler);

      return false;
    }
  };

  sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
      alert("verify filled data");
    } else {
      var form = this.pay;
      var card = document.createElement('input');
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', response.id);
      form.nativeElement.appendChild(card);
      this.doSubmit = true;
      //form.submit();
    }
  };

}
