import { api, LightningElement, track, wire } from 'lwc';
import saveConAccount from '@salesforce/apex/lwcApexController.saveConAccount';
import applynow from '@salesforce/apex/lwcApexController.applynow';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getProductImage from '@salesforce/apex/NewController.getProductImage';
import { NavigationMixin } from 'lightning/navigation';

export default class OrderPagessChild extends NavigationMixin(LightningElement) {

@api productName;
@api totalprice;
@api totalquantity;
totalamount
product_image;
@api emailid;
@api lastname;
@api firstname;
@api ids
@api maillingstreet;
@api mailingcity;
@api mailingcontry;
discountval;
  // totalamount;
  @api currentamount;
@track getorderinputvalues={
  couponcode:'',
};

@wire(getProductImage,{ prodName : '$productName'}) wiredImage({error, data}){ 
  if(data){ 
    this.product_image = data.Product_Image__c;
  }if(error){ 
    console.log(error);
  }
}

discountFun(event) {
  this.getorderinputvalues.couponcode = event.target.value;
  this.discountval = this.getorderinputvalues.couponcode;
  console.log( this.getorderinputvalues.couponcode)
      };
  

OrderHandl(){
   console.log("clicked")
   console.log(this.totalprice)
   console.log(this.totalquantity)
   console.log(this.productName)
    saveConAccount({cemail:this.emailid,cname:this.lastname,
      cfname:this.firstname,
      maillingstret:this.maillingstreet, 
      mailingcity:this.mailingcity,
      mailingcontry:this.mailingcontry,totalQty : this.totalquantity, 
      prodName : this.productName}).then(result=>{
               
        const toastEvent = new ShowToastEvent({
          title:'Success!',
          message:'Order placed successfully',
          variant:'success'
        });
        this.dispatchEvent(toastEvent);
    })
    .catch(error=>{    
      console.error(error);
      const evt = new ShowToastEvent({
        title:'Failed please check!',
        message:'Failed',
        variant: 'warning',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);    
    });
    this[NavigationMixin.Navigate]({
      type: 'standard__webPage',
      attributes: { 
          url : "https://resilient-panda-49v1w9-dev-ed.lightning.force.com/lightning/n/Home"
      }
  });
    }


   
//handel apply now section -->

    handleApply() {
      applynow({coupon:this.discountval,curramt:this.currentamount})
      .then(result=>{

        this.totalamount = result;
        console.log(result)
        const toastEvent = new ShowToastEvent({
          title:'Success!',
          message:'Offer Applied ! Check Final Amount.',
          variant:'success'
        });
        this.dispatchEvent(toastEvent);
      })
      .catch(error=>{
        this.totalamount = this.currentamount;
        this.error=error.message;
        window.console.log(this.error);
     });
     
    }
  }












