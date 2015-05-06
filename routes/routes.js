/**
 * Created by raven on 5/5/2015.
 */
module.exports = function (app, xml, fs) {

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.post('/gpx', function (req, res) {
        var parser = new xml.Parser();
        var filePath = req.files.file.path;
        var originalname = req.files.file.originalname;
        var wpts = [];
        if (/.gpx/.test(filePath)) {
            fs.readFile(filePath, function (err, data) {
                parser.parseString(data, function (err, result) {
                    for (var i = 0; i < result.gpx.wpt.length; i++) {
                        var wpt = {
                            label: result.gpx.wpt[i].name[0],
                            lat: result.gpx.wpt[i].$.lat,
                            lon: result.gpx.wpt[i].$.lon
                        }
                        wpts.push(wpt);
                    }
                    res.send({
                        name: originalname,
                        markers: wpts
                    });
                });
            });
        } else {
            res.status(500).send({
                message: 'Filetype not supported'
            });
        }
        fs.unlink(filePath);
    });
}