import { LightningElement, api, track } from 'lwc';
import insertContactMethod from '@salesforce/apex/lwcApexController.insertContactMethod';
import Name from '@salesforce/schema/signupOrder__c.Name';
import fname from '@salesforce/schema/signupOrder__c.First_Name__c';
import lname from '@salesforce/schema/signupOrder__c.Last_Name__c';
import comp from '@salesforce/schema/signupOrder__c.Company__c';
import add from '@salesforce/schema/signupOrder__c.Address__c';
import app from '@salesforce/schema/signupOrder__c.Appartment__c';
import city from '@salesforce/schema/signupOrder__c.City__c';
import states1 from '@salesforce/schema/signupOrder__c.State__c';
import country from '@salesforce/schema/signupOrder__c.Country__c'

import {ShowToastEvent} from 'lightning/platformShowToastEvent';


// import { APPLICATION_SCOPE, subscribe, unsubscribe, createMessageContext, releaseMessageContext } from 'lightning/messageService';
// import samplemessage from "@salesforce/messageChannel/MyMessageChannel__c";


export default class Signupformlwc extends LightningElement {

  Emailval;
  firstnameval;
  lastname1;
  compval;
  addressval;
  cityval;
  stateval;
  countryval;
  @api productName;
  @api totalprice;
  @api totalquantity;

  @track ids;
  @track error;    
  @track getRegRecord={
    Name:Name, 
    firstname:fname,
    lastname:lname, 
    comp:comp, 
    add:add,         
    city:city,
    country1:country          
  };   

//@track sendfile = [];


  nameInpChange(event){
      this.getRegRecord.Name = event.target.value;
    
      console.log(this.getRegRecord.Name);
    }

    lastNameInpChange(event){
      this.getRegRecord.lastname = event.target.value;
      this.lastname1 = event.target.value;
      console.log(this.getRegRecord.lastname);
    }
    firstNameInpChange(event){
      this.getRegRecord.firstname = event.target.value;
      this.firstnameval = event.target.value;
      console.log(this.getRegRecord.firstname);
    }


    compNameInpChange(event){
      this.getRegRecord.comp = event.target.value;
      this.compval = event.target.value;
      console.log(this.getRegRecord.comp);
    }

    addNameInpChange(event){
      this.getRegRecord.add = event.target.value;
      this.addressval = event.target.value;
      console.log(this.getRegRecord.add);
    }
      /*
    appNameInpChange(event){
      this.getRegRecord.app = event.target.value;
      console.log(this.getRegRecord.app);
    }
  */
    cityNameInpChange(event){
      this.getRegRecord.city = event.target.value;
      this.cityval = event.target.value;
      console.log(this.getRegRecord.city);
    }

  /*
    stateNameInpChange(event){
      this.getRegRecord.states1 = event.target.value;
      this.stateval = event.target.value;
      console.log(this.getRegRecord.states1);
    }
  */
    countryNameInpChange(event){
      this.getRegRecord.country1 = event.target.value;
      this.countryval = event.target.value;
      console.log(this.getRegRecord.country);
  }

  saveAccountAction(){  
  console.log('before save');
  insertContactMethod({signobj: this.getRegRecord})
    .then(result=>{
        console.log(this.createAccount);
       
        this.ids=result.Id;
        console.log('after save' + this.ids);
        
        this.Emailval = result.Name
        console.log(this.Emailval)
        console.log(this.lastname1)
        console.log(this.firstnameval)
        console.log(this.compval)
        console.log(this.addressval)
        console.log(result)
        const toastEvent = new ShowToastEvent({
          title:'Success!',
          message:'Account created successfully',
          variant:'success'
        });
        this.dispatchEvent(toastEvent);
    })
    .catch(error=>{
       
      const evt = new ShowToastEvent({
        title:'Failed please check!',
        message:'Failed',
        variant: 'warning',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
    });
  }


  // context = createMessageContext();

  // connectedCallback() {
  //   if (this.subscription) {
  //     return;
  //   }
  //   this.subscription = subscribe(this.context, samplemessage, (passparam1) => {
  //     this.handlermethod(passparam1);
  //   }, { scope: APPLICATION_SCOPE }

  //   );
  // }
  // handlermethod(passparam1) {
  //   console.log("-----answere subscriber in rahul's");
  //   console.log(JSON.stringify(passparam1));
  //   console.log(passparam1.totalPrice)
  //   this.totalprice = passparam1.totalPrice;
  //   this.totalquantity = passparam1.quantity;
  // }



}
