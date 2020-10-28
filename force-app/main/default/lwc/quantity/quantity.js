import { LightningElement, api } from 'lwc';


export default class Quantity extends LightningElement {

    @api price;
    @api totalprice;
    @api productName;
    flagTest = true;
    flag = true;
    @api quantity = 1;
    modalStatus = false;


    handleDecrement() {

        if ((this.quantity -= 1) == 1) {
            this.flag = true;
        }
        this.totalprice = this.quantity * this.price;
    }

    handleIncrement() {

        this.quantity += 1;
        this.flag = false;
        this.totalprice = this.quantity * this.price;

    }


    showModal(){
        this.totalprice = this.quantity * this.price;
        this.template.querySelector("c-modalpopup").showModal(); 
    }

}