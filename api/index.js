const express = require('express');
const cors = require('cors');
const ytdl = require("ytdl-core");
const fs = require('fs');
const path = require('path');


const app = express();


app.use(express.static(path.join(__dirname+"/public")));

app.use(cors());
app.use(express.json());



app.get('/api/message', (req, res) => {
    // console.log(req.body);
    res.send(`hello`);
});

app.get('/api/qualities/:id?', async (req, res) => {

    try {

        // console.log(req.params.id);
    

        // res.send(`Hello ${req.params.id}`)
        // var videoURL = req.body.url;

        var videoID = req.params.id;

        // var videoType = req.body.type;

        let info = await ytdl.getInfo(videoID);

        // console.log(info);


        // if (videoType == "mp3") {
        //     // console.log("Music");
        //     let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        //     // console.log(audioFormats);
        //     // fs.writeFile('myjsonfile.json', JSON.stringify(audioFormats), 'utf8', () => {
        //     //     // console.log("Done");
        //     // });
        //     res.send(audioFormats)
        // }
        // if (videoType == "mp4") {
        //     // console.log("Music+Video");
            let videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio');
        //     // console.log(videoFormats);
        //     // fs.writeFile('myjsonfile.json', JSON.stringify(videoFormats), 'utf8', () => {
        //     //     // console.log("Done");
        //     // });

        //     // console.log(videoFormats);
            res.send(videoFormats);
        // }
    }
    catch (e) {
        // console.log(e);
        res.send(e);
    }
});



app.get('/api/downloadVideo/:id?/:itag?', async (req, res) => {

    try {
        
        var videoID = req.params.id;

        var videoURL = `https://www.youtube.com/watch?v=${videoID}`;

        var Itag = req.params.itag;

        // console.log(Itag);


        let info = await ytdl.getInfo(videoID);

        var videoTitle = info["videoDetails"]["title"];
        // var desc = info["videoDetails"]["description"];
        // var length = info["videoDetails"]["lengthSeconds"];

        // console.log("Music+Video");

        ytdl(videoURL, { filter : 'videoandaudio', quality: Itag }).on('progress', (_, totalDownloaded, total) => {
            // console.log('totalDownloaded: ' + totalDownloaded);
        }).on('end', (err, info) => {
            if (err) {
                // console.log("Not Downloaded");
                res.send('Video Download Error!');
            }
            // console.log('Video Download Completed!!');
            res.send('Video Download Completed!!');
        }).pipe(
            fs.createWriteStream(`${videoTitle} ${Itag}.mp4`))

    }
    catch (e) {
        // console.log(e);
        res.send('Video Download Error!');
    }
});




app.get('/api/downloadAudio/:id?', async (req, res) => {

    try {
        var videoID = req.params.id;

        var videoURL = `https://www.youtube.com/watch?v=${videoID}`;


        console.log(videoURL);

        let info = await ytdl.getInfo(videoID);

        var AudioTitle = info["videoDetails"]["title"];
        // var desc = info["videoDetails"]["description"];
        // var length = info["videoDetails"]["lengthSeconds"];

        // console.log("Music");

        ytdl(videoURL, { filter : 'audioonly', quality : 'highestaudio' }).on('progress', (_, totalDownloaded, total) => {
            // console.log('totalDownloaded: ' + totalDownloaded);
            // console.log(global.window);
        }).on('end', (err, info) => {
            if (err) {
                // console.log("Not Downloaded");
                res.send('Audio Download Error!');
            }
            // console.log('Audio Download Completed!!');
            res.send('Audio Download Completed!!');
        }).pipe(fs.createWriteStream(`${AudioTitle}.mp3`));
    }
    catch (e) {
        // console.log('Audio Download Completed!!');
        res.send('Audio Download Error!');
    }
});


app.listen(8081);
