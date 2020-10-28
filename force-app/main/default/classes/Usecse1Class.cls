public with sharing class Usecse1Class {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [Select Id,Name,Phone From Account];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [Select Id,Name,Phone,Email From Contact LIMIT 10];   
    }
    
}