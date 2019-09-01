import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
    selector: '[soloNumerosDirective]'
})
export class SoloNumerosDirective {

    regexStr = '^[0-9_]*$';
    @Input() isAlphaNumeric: boolean;

    constructor(private el: ElementRef) { }


    @HostListener('keypress', ['$event']) onKeyPress(event) {
        return new RegExp(this.regexStr).test(event.key);
    }

    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
        this.validateFields(event);
    }

    validateFields(event) {
        setTimeout(() => {

            this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
            event.preventDefault();

        }, 100)
    }

}