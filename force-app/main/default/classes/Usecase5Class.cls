public with sharing class Usecase5Class {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accID){
        return [Select Id,Name,Phone,Email From Contact where accountId = :accId ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpps(String accId){
        return [Select Id,Name,stageName,closeDate From Opportunity Where accountId = :accID ];
    }
}