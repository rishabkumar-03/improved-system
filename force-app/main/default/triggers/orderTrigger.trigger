trigger orderTrigger on orderProducts__c (after insert) {
    Decimal var1=0;
    List<String> orderstr = new List<String>();

    List<orderProducts__c> op1= [select ProductName__c from orderProducts__c order by orderDate__c DESC Limit 1]; 
    
    for(orderProducts__c ord : op1){
        orderstr.add(ord.ProductName__c);
        
    }

    orderProducts__c op= [ select totalQuantity__c from orderProducts__c where ProductName__c Like :orderstr[0] 
    order by orderDate__c DESC Limit 1]; 
	var1 = op.totalQuantity__c;
    Product__c pro = [Select Quantity__c from Product__c where Name Like : orderstr[0] limit 1];
    List<Product__c> listpro =[Select Quantity__c,Name from Product__c]; 
    List<Product__c> updateproduct = new List<Product__c>(); 
    Decimal var2=0;
    var2 =pro.Quantity__c;
    var2 = var2-var1;
 
    for(Product__c p :listpro ){
        if(p.Name == orderstr[0]){
            
            p.quantity__c = var2;
            updateproduct.add(p);
        }
        
    }

    if(updateproduct.size()>0){
        update updateproduct; 
    }

}