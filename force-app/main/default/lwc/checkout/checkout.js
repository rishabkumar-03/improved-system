import { LightningElement, wire,  api } from 'lwc';
import getProductImage from '@salesforce/apex/NewController.getProductImage';


export default class Checkout extends LightningElement {
    
    @api productName;

    @wire(getProductImage, { prodName : '$productName'}) wiredProducts({error, data}){ 
        
    }

    handlechild(){
        console.log('Child');
    }

    handleparent(){
        console.log('Parent');
 
    }
}