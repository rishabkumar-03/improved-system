public with sharing class lwcApexController {
    @AuraEnabled
    public static Account insertAccountMethod(Account accountObj){
        try {
            insert accountObj;
            return accountObj;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }

    @AuraEnabled
    public static signupOrder__c insertContactMethod(signupOrder__c signobj){
        try {
            insert signobj;
            return signobj;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }

    @AuraEnabled
    public static Contact saveConAccount(String cemail,
    String cname,String cfname,String maillingstret,String mailingcity,String mailingcontry,Decimal totalQty, String prodName) {
        orderProducts__c op = new orderProducts__c();
        op.totalQuantity__c = totalQty;
        op.ProductName__c = prodName;
        op.orderDate__c = Date.today();

        Contact con= new Contact();        
            con.Email = cemail;
            con.LastName = cname;
            con.FirstName=cfname;
            con.MailingStreet = maillingstret;
            con.MailingCity = mailingcity;
            con.MailingCountry = mailingcontry;
            con.AccountId = '0012w00000PFgDfAAL';
        try {
            insert op;
            insert con;
            return con;
            } catch (Exception exp) {
                throw new AuraHandledException(exp.getMessage());
            }

    }

    @AuraEnabled
    public static Integer applynow(String coupon,Integer curramt){
        try {
            //couponcode__c discount = [select discount__c from couponcode__c where Name=:coupon];
            String discount = 'RANJITHSIR';
            String a='';
            a = '20';
            //a+=discount.discount__c;
            Integer discountoff =  Integer.ValueOf(a);
            Integer totalamt = curramt - ((discountoff * curramt) /100); 
            return totalamt;
            }catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


}
