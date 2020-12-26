public class HolidaysAPIMock implements HttpCalloutMock {
    
    public HTTPResponse respond(HTTPRequest req) {        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"meta":{"code":200},"response":{"holidays":[{"name":"New Year\'s Day","description":"New Year\'s Day is the first day of a new year according to the Gregorian calendar used in Canada and many other countries.","country":{"id":"ca","name":"Canada"},"date":{"iso":"2020-01-01","datetime":{"year":2020,"month":1,"day":1}},"type":["National holiday"],"locations":"All","states":"All"}]}}');
        res.setStatusCode(200);
        return res;
    }
}