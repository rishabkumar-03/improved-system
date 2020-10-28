// import { LightningElement, api, wire } from 'lwc';
// import { publish, subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext }
//     from 'lightning/messageService';
// import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';
// export default class Modalpopup extends LightningElement {
//     @api price;
//     @api productName;
//     @api totalPrice;
//     @api quantity;
//     flagTest = true;
//     flag = true;

//     @wire(MessageContext)
//     messageContext;

//     modalStatus = false;
//     disableCheckout = true;
    

//     handleDecrement() {

//         if ((this.quantity -= 1) == 1) {
//             this.flag = true;
//         }
//         this.totalPrice = this.quantity * this.price;
//     }

//     handleIncrement() {
        
//         this.quantity += 1;
//         this.flag = false;
//         this.totalPrice = this.quantity * this.price;
       
//     }


//     @api showModal() {

//         this.modalStatus = true;
//         if (this.quantity == 1) {
//             this.flag = true;
//         }
//         else if (this.quantity > 1) {
//             this.flag = false;
//         }
//         // this.totalPrice = this.price;
//     }

//     closeModal() {
//         this.modalStatus = false;
//     }

//     submitDetails() {

//         this.modalStatus = false;
//         const message = {
//             productName: this.productName,
//             totalPrice: this.totalPrice,
//             quantity: this.quantity
//         }
//         publish(this.messageContext, SAMPLEMC, message);
//     }

//     handleCheckBoxChange(event) {

//         let status = event.target.checked;
//         if (status === true) {
//             this.disableCheckout = false;
//         }
//         else if (status === false) {
//             this.disableCheckout = true;
//         }
//         // console.log("test");
//     }

    
// }
import { LightningElement, api, wire } from 'lwc';
import { publish, subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext }
    from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';
export default class Modalpopup extends LightningElement {
    @api price;
    @api productName='dadad';
    @api totalPrice;
    @api quantity;
    flagTest = true;
    flag = true;

    @wire(MessageContext)
    messageContext;

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
        const message = {
            productName: 'test',
            totalPrice: this.totalPrice,
            quantity: this.quantity
        }
        console.log(message);
        publish(this.messageContext, SAMPLEMC, message);
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

    
}