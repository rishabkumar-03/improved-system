import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/Usecse1Class.getContacts'

export default class LwcUsecase1Comp extends LightningElement {
    @wire(getContacts) contacts;

}