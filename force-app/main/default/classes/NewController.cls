public with sharing class NewController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accId){
        return [Select Id,Name,Phone,Email From Contact where accountId = :accId ];   
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpps(String accId){
        return [Select Id,Name,stageName,closeDate From Opportunity Where accountId = :accID ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsForDynamicFilter(){
        return [Select Id, Name, Phone, Email From Contact];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactByName(String conName,Integer pageSize, Integer pageNo){
        String searchKey = '%' + conName + '%';
        Integer offset = (pageNo - 1)*pageSize;
        return [Select Id, Name, Phone, Email 
                From Contact 
                Where Name LIKE :searchKey
                LIMIT :pageSize
                OFFSET :offset];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalProducts(){
        return [Select count() From Product__c];        
    }
    @AuraEnabled(cacheable=true)
    public static Integer getTotalContacts(){
        return [Select count() From Contact];        
    }

    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProducts(String prodName,String catName,String brand, String makers, Integer maxRange, Boolean isSort, Integer pageSize, Integer pageNo){
        String product_name = '%' + prodName + '%';
        String category_name = '%' + catName + '%';
        String brandName = '%' + brand + '%';
        String makersName = '%' + makers + '%';
        Integer offset = (pageNo - 1)*pageSize;
        if(isSort){ 
            return [Select Id, Name, Brand__c, Makers__c, Price__c, Product_Image__c from Product__c Where Name LIKE :product_name AND 
                Brand__c LIKE :brandName AND
                Makers__c LIKE :makersName AND
                Price__c <= :maxRange AND
                Category_Name__c LIKE :category_name
                ORDER BY Name
                LIMIT :pageSize
                OFFSET :offset
                ]; 
        } else{
            return [Select Id, Name, Brand__c, Makers__c, Price__c, Product_Image__c from Product__c Where Name LIKE :product_name AND 
                    Brand__c LIKE :brandName AND
                    Makers__c LIKE :makersName AND
                    Price__c <= :maxRange AND
                    Category_Name__c LIKE :category_name
                    LIMIT :pageSize
                    OFFSET :offset
                    ];
        }
    } 

    @AuraEnabled(cacheable=true)
    public static List<Product__c> getGlobalSearch(String searchItem){
        String product_name = '%' + searchItem + '%';
        String brandName = '%' + searchItem + '%';
        String makersName = '%' + searchItem + '%'; 
        String catName = '%' + searchItem + '%';
        return [Select Id, Name, Brand__c, Makers__c, Price__c, Product_Image__c from Product__c Where Name LIKE :product_name OR 
                Brand__c LIKE :brandName OR
                Makers__c LIKE :makersName OR
                Category_Name__c LIKE :catName];
        }    
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getDropDownBrands(){
        return [Select Id,Brand__c from Product__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getDropDownProducts(String brand){
        String brandName = '%' + brand + '%';
        return [Select Id, Name, Brand__c from Product__c Where Brand__c LIKE :brandName];
    }

    @AuraEnabled(cacheable=true)
    public static Product__c getProductImage(String prodName){
        String product_Name = '%' + prodName + '%';
        return [Select Product_Image__c, Category_Name__c from Product__c Where Name LIKE :product_Name];
    }

}