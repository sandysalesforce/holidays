/*
 * Class Name: HolidaysAPIHelper
 * Description: Helper class for Calender APIs
*/
public class HolidaysAPIHelper {
    
    public static final String HOLIDAYS_END_POINT = Label.Holidays_End_Point;
    public static final String API_KEY = Label.API_Key;
    public static final String GET_REQUEST = 'GET';
    
    /* Making callout to Calender API to get holidays */
    public static String getHolidays(String country, String year){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(HOLIDAYS_END_POINT+'country='+country+'&year='+year+'&api_key='+API_KEY);
        request.setMethod(GET_REQUEST);
        
        HttpResponse resp = http.send(request);
            
        
        return resp.getBody();
    }
    
    
}