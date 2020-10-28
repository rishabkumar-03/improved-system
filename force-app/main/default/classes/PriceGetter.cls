public with sharing class PriceGetter {

    @AuraEnabled(cacheable=true)
    public static Product__c priceFromApexMethod(String Name){
        String searchParam = '%'+ Name +'%';
        Product__c price = [SELECT Price__c
                                  FROM  Product__c 
                                  WHERE Name LIKE :searchParam LIMIT 1];
        return price;
    }
}
