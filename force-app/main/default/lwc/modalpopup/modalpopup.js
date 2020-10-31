
import { LightningElement, api, wire } from 'lwc';
// import { publish, subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
// import samplemessage from '@salesforce/messageChannel/MyMessageChannel__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class Modalpopup extends NavigationMixin(LightningElement) {
    @api price;
    @api productName='dadad';
    @api totalPrice;
    @api quantity;
    flagTest = true;
    flag = true;

    // @wire(MessageContext)
    // messageContext;

    modalStatus = false;
    disableCheckout = true;
    

    handleDecrement() {

        if ((this.quantity -= 1) == 1) {
            this.flag = true;
        }
        this.totalPrice = this.quantity * this.price;
    }

    handleIncrement() {
        
        this.quantity += 1;
        this.flag = false;
        this.totalPrice = this.quantity * this.price;
       
    }


    @api showModal() {

        this.modalStatus = true;
        if (this.quantity == 1) {
            this.flag = true;
        }
        else if (this.quantity > 1) {
            this.flag = false;
        }
        // this.totalPrice = this.price;
    }

    closeModal() {
        this.modalStatus = false;
    }

    submitDetails() {

        this.modalStatus = false;
        // const message = {
        //     productName: this.productName,
        //     totalPrice: this.totalPrice,
        //     quantity: this.quantity
        // }
        // console.log(message);
        // publish(this.messageContext, samplemessage, message);
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName : "c__signupFormComponent"
            },
            state : { 
                c__productName : this.productName,
                c__totalPrice : this.totalPrice,
                c__quantity : this.quantity
            }
        });
    }

    handleCheckBoxChange(event) {

        let status = event.target.checked;
        if (status === true) {
            this.disableCheckout = false;
        }
        else if (status === false) {
            this.disableCheckout = true;
        }
        // console.log("test");
    }

    handleDelete(){ 
         // console.log("delete");
         this.modalStatus = false;
         const evt = new ShowToastEvent({
             title: 'Alert',
             message: 'Item removed from cart',
             variant: 'error',
             mode: 'dismissable'
         });
         this.dispatchEvent(evt);
         this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url : 'https://resilient-panda-49v1w9-dev-ed.lightning.force.com/lightning/n/Home'
            }
        });
    }

    
}