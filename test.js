if (!global.Promise) {
    global.Promise = require('q');
}

var chai = require('chai')
, chaiHttp = require('chai-http');

chai.use(chaiHttp);

const Muneem = require("muneem");
const bridge = require("./bridge");
const cookieParser = require("cookie-parser");

describe ('Express bridge', () => {

    it('should parse cookies using express cookie-parser middleware.', (done) => {
        const app = Muneem();

        app.use( bridge, cookieParser() );
        app.get("/test", (req, res) =>{
            expect( req.cookies ).toEqual({
                cookieName: "cookieValue",
                otherName: "otherValue"
            });
            
            res.write("I'm glad to response you back.");
        })
        
        app.start();

        chai.request("http://localhost:3002")
            .get('/test')
            .set('Cookie', 'cookieName=cookieValue;otherName=otherValue')
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.text).toBe("I'm glad to response you back.");
                done();
            }).catch( err => {
                done.fail("not expected " + err);
            });
    });

});