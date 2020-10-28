import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import profile_picture from '@salesforce/resourceUrl/profPic';

export default class UseCase5ComponentThree extends NavigationMixin(LightningElement) {
    picture = profile_picture;
    @api recordId;
    @api name;
    @api phone;
    @api email;

    navigatetoDetails(event){
        console.log('Navigation is being called');
        console.log('record Id', this.recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {  
                recordId : this.recordId,             
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
    }
}