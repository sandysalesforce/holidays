@isTest
public class HolidaysControllerTest {
    
    @isTest
    public static void getHolidaysTest(){
        Test.setMock(HttpCalloutMock.class, new HolidaysAPIMock());
        Test.startTest();
        String resp = HolidaysController.getHolidays('CA', '2020');
        Test.stopTest();
    }
    
    @isTest
    public static void saveFavoriteTest(){
        Test.startTest();
        HolidaysController.saveFavorite('New Year');
        Test.stopTest();
    }
}