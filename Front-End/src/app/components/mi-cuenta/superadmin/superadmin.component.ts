import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SingletonService } from '../../singleton.service';
import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/typings/dir-document-token';

export interface Botones {
  icono: string,
  texto: string,
  link: string,
}

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit, AfterViewInit {

  constructor(private singleton: SingletonService, private elementRef: ElementRef) { }

  @ViewChild('botonMP', { static: false }) boton: ElementRef;

  ngOnInit() {
    Mercadopago.setPublishableKey('TEST-e63e4db8-7105-4505-8794-9b880390b25a');
    Mercadopago.getIdentificationTypes();
    console.log(Mercadopago);
  }

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    //s.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    s.src = "../../../../assets/js/web-payment-checkout.js"
    
    this.boton.nativeElement.appendChild(s);

    console.log(this.boton);
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  botones: Botones[] = [
    { icono: "account_box", texto: "Usuarios", link: "/mi-cuenta/superadmin/usuarios" },
    { icono: "storefront", texto: "Publicaciones", link: "/mi-cuenta/superadmin/publicaciones" },
    { icono: "dashboard", texto: "Alquileres", link: "/mi-cuenta/superadmin/alquileres" },
    { icono: "menu_book", texto: "Reclamos", link: "/mi-cuenta/superadmin/reclamos" },
    { icono: "assessment", texto: "Estadísticas", link: "/mi-cuenta/superadmin/estadisticas" },
    { icono: "exit_to_app", texto: "Salir", link: "" },
  ]

}
