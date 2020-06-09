const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const app = express();

mongoose.connect("mongodb+srv://admin:ramanjot@1@cluster0-iikae.gcp.mongodb.net/classDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const cs = {
    s: String,//subject
    fl: String,//fileLocation
    ft: String,//fileType
    fd: String,
}
const mc = mongoose.model("Mc", cs);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'covid19helper4u@gmail.com',
        pass: 'Ramanjot@12'
    }
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    mc.find({s: "Maths"}, (err, arr) => {
        mc.find({s: "English"}, (errr, arrr) => {
            mc.find({s: "Science"}, (errrr, arrrr) => {
                mc.find({s: "s.s.t"}, (eq, aq) => {
                    mc.find({s: "Punjabi"}, (eqq, aqq) => {
                        mc.find({s: "Hindi"}, (eqqq, aqqq) => {
                            res.render("class8", {ma: arr, eaa: arrr, sci: arrrr, sst: aq, punj: aqq,hin:aqqq})
                        })
                    })
                })
            })
        })
    })
})
app.post("/",(req,res)=>{
    const r = req.body.enquiry;

    var mailOptions = {
        from: 'covid19helper4u@gmail.com',
        to: 'ramanjot2007@outlook.com,mandeep2684@gmail.com,ramanjot16@outlook.com',
        subject: 'request ',
        text: `${r} raman you are having 2 days to complete it be agile`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send("<a href='/'><h1 style='font-size: 30px'>Your request has been sent</h1> Click here to go home.</a>")
})
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log("server har started")
})
