/*
 * Class Name: HolidaysController
 * Description: Controller class for Holidays_CA lwc
*/
public class HolidaysController {
    
    /* Get holidays list */
    @AuraEnabled(cacheable=true)
    public static String getHolidays(String country, String year){
        return HolidaysAPIHelper.getHolidays(country, year);
    }
    
    /* Save favorite holiday of the user */
    @AuraEnabled
    public static void saveFavorite(String holidayName){
        User currentUser = new User(Id = UserInfo.getUserId());
        currentUser.Favorite_Holiday__c = holidayName;
        update currentUser;
    }
}