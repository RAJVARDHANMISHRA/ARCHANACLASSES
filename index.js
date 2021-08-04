const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


//********************************************************************************************
//all about admin database start here
// var conn1 = mongoose.createConnection("mongodb://localhost:27017/adminsDB", { useNewUrlParser: true });
var conn1 = mongoose.createConnection("mongodb+srv://admin-binodkumarthakur_archanaclasses:rajvardhan1234@archanaclasses.5gudw.mongodb.net/adminsDB", { useNewUrlParser: true, useUnifiedTopology: true});
//schema for admin database
const adminSchema = new mongoose.Schema({
    adminid:
    {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});
const Admin = conn1.model("Admin", adminSchema);
// const admin = new Admin({
//     adminid: "binod_archanaclasses",
//     password:"binod_1234"
// });
// admin.save();
app.post("/adminlogin", function (req, res) {
    var admin_user = req.body.username;
    var pass_word = req.body.password;
    Admin.find(function (err, admins) {
        if (err) {
            console.log(err);
        }
        else {
            admins.forEach(function (admin) {
                if (admin_user === admin.adminid && pass_word === admin.password) {
                    res.sendFile(__dirname + "/public/access.html");
                }
                else {
                    res.send('<script>alert("Your are not Authorised person for this page")</script>')
                }
            });
        }
    });
});
//all about admin database end here
//********************************************************************************************


// ****************************************************************************************
// all about inquiry database START
// var conn2 = mongoose.createConnection("mongodb://localhost:27017/inquiresDB", { useNewUrlParser: true });
var conn2 = mongoose.createConnection("mongodb+srv://admin-binodkumarthakur_archanaclasses:rajvardhan1234@archanaclasses.5gudw.mongodb.net/inquiresDB", { useNewUrlParser: true ,useUnifiedTopology: true});
//schema for inquiry database
const inquirySchema = new mongoose.Schema({
    firstName:
    {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: String
});

const Inquiry = conn2.model("Inquiry", inquirySchema);

app.post("/", function (req, res) {
    var firstName = req.body.firstname;
    var secondName = req.body.lastname;
    var phoneNumber = req.body.phonenumber;
    var email = req.body.email;

    const inquiry = new Inquiry({
        firstName: firstName,
        lastName: secondName,
        phoneNumber: phoneNumber,
        email: email
    });
    inquiry.save();
    res.sendFile(__dirname + "/index1.html");
});
// all about inquiry database END
// ****************************************************************************************


//******************************************************************************************** 
// all about admission database START
// var conn3 = mongoose.createConnection("mongodb://localhost:27017/admissionsDB", { useNewUrlParser: true });
var conn3 = mongoose.createConnection("mongodb+srv://admin-binodkumarthakur_archanaclasses:rajvardhan1234@archanaclasses.5gudw.mongodb.net/admissionsDB", { useNewUrlParser: true,useUnifiedTopology: true });
// schema for admission database
const admissionSchema = new mongoose.Schema({
    yourName: {
        type: String,
        required: true
    },
    yourFatherName: {
        type: String,
        required: true
    },
    yourMotherName: {
        type: String,
        required: true
    },
    yourEmail: {
        type: String
    },
    rollNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    physicsFee: {
        type: Number
    },
    physicsAtt: {
        type: Number
    },
    chemistryFee: {
        type: Number
    },
    chemistryAtt: {
        type: Number
    },
    mathFee: {
        type: Number
    },
    mathAtt: {
        type: Number
    },
    biologyFee: {
        type: Number
    },
    biologyAtt: {
        type: Number
    },
    targetFee: {
        type: Number
    },
    totalDayPhysics: {
        type: Number
    },
    totalDayChemistry: {
        type: Number
    },
    totalDayMaths: {
        type: Number
    },
    totalDayBiology: {
        type: Number
    },
    prevTest: {
        type: Number
    },
    feep: {
        type: Number
    },
    feec: {
        type: Number
    },
    feem: {
        type: Number
    },
    feeb: {
        type: Number
    },
    feet: {
        type: Number
    },
    testQuestion: {
        type: String
    },
    notes: {
        type: String
    }
});

const Admission = conn3.model("Admission", admissionSchema);
// const admission = new Admission({
//     yourName: "null",
//     yourFatherName: "null",
//     yourMotherName: "null",
//     yourEmail: "null",
//     rollNumber: 21001,
//     password: "null",
//     confirmPassword: "null",
//     physicsFee: 0.00,
//     chemistryFee: 0.00,
//     mathFee: 0.00,
//     biologyFee: 0.00,
//     targetFee: 0.00,
//     feep: 12500,
//     feec: 12500,
//     feem: 12500,
//     feeb: 12500,
//     feet: 25000,
//     physicsAtt: 0,
//     chemistryAtt: 0,
//     mathAtt: 0,
//     biologyAtt: 0,
//     totalDayPhysics: 0,
//     totalDayChemistry: 0,
//     totalDayMaths: 0,
//     totalDayBiology: 0,
//     prevTest: 0,
//     testQuestion:"NOT Available",
//     notes: "Not avalible"
// });
// admission.save();
app.post("/admission", function (req, res) {
    var your_name = req.body.name;
    var father_name = req.body.fname;
    var mother_name = req.body.mname;
    var _email = req.body.email;
    var roll_number = req.body.rollnumber;
    var pass_word = req.body.password;
    var confirm_Password = req.body.confirm;
    if (pass_word != confirm_Password) {
        res.send('<script>alert("SORRY YOUR PASSWORD DID NOT MATCH WITH CONFIRM PASSWORD TRY AGAIN")</script>');
    }
    else {
        Admission.find(function (err, admissions) {
            if (err) {
                console.log(err);
            }
            else {
                var f=0;
                admissions.forEach(function (admission) {
                    if (roll_number == admission.rollNumber && admission.yourName != "null") {
                        res.send('<script>alert("SORRY YOUR ROLL NUMBER ALRAEDY EXIST")</script>');
                    }
                    if (roll_number == admission.rollNumber && admission.yourName == "null") {
                        f=1;
                        Admission.updateOne({ rollNumber: roll_number }, { yourName: your_name }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { yourFatherName: father_name }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { yourMotherName: mother_name }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { yourEmail: _email }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { password: pass_word }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { confirmPassword: confirm_Password }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
                if(f==1){
                    res.sendFile(__dirname + "/public/index2.html");
                }
                else{
                    
                    res.send('<script>alert("Sorry,some thing went worng")</script>');
                }
            }
        });
        
    }
});
// all about admission database END
//******************************************************************************************** 


app.post("/login", function (req, res) {
    var roll_number = req.body.rollnumber;
    var pass_word = req.body.password;
    Admission.find(function (err, admissions) {
        if (err) {
            console.log(err);
        }
        else {
            var flag = 0;
            var alldetail = "";
            admissions.forEach(function (admission) {
                if (roll_number == admission.rollNumber && pass_word == admission.password) {
                    alldetail = admission;
                    flag = 1;
                }
            });
            if (flag == 1) {
                res.render("student", { studentdata: alldetail });
            }
            else {
                res.send('<script>alert("SORRY, WORNG ID AND PASSWORD")</script>');
            }
        }
    });
});


app.post("/adminchange", function (req, res) {
    var roll_number = req.body.roll;
    var p_fp = req.body.pf;
    var c_fp = req.body.cf;
    var m_fp = req.body.mf;
    var b_fp = req.body.bf;
    var t_fp = req.body.tf;
    Admission.find(function (err, admissions) {
        if (err) {
            console.log(err);
        }
        else {
            var flag = 0;
            admissions.forEach(function (admission) {
                if (roll_number == admission.rollNumber) {
                    flag = 1;
                    if (p_fp != 0) {
                        var p_fl = admission.feep - p_fp;
                        Admission.updateOne({ rollNumber: roll_number }, { physicsFee: p_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { feep: p_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (c_fp != 0) {
                        var c_fl = admission.feec - c_fp;
                        Admission.updateOne({ rollNumber: roll_number }, { chemistryFee: c_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { feec: c_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (m_fp != 0) {
                        var m_fl = admission.feem - m_fp;
                        Admission.updateOne({ rollNumber: roll_number }, { mathFee: m_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { feem: m_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (b_fp != 0) {
                        var b_fl = admission.feeb - b_fp;
                        Admission.updateOne({ rollNumber: roll_number }, { biologyFee: b_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { feeb: b_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (t_fp != 0) {
                        var t_fl = admission.feet - t_fp;
                        Admission.updateOne({ rollNumber: roll_number }, { targetFee: t_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        Admission.updateOne({ rollNumber: roll_number }, { feet: t_fl }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            });
            if (flag == 0) {
                res.send('<script>alert("sorry roll number not exist")</script>');
            }
            else {
                res.send('<script>alert("Successfully updated")</script>')
            }
        }
    });
});

app.post("/adminchangeatt", function (req, res) {
    var roll_number = req.body.roll;
    var ptd = req.body.ptd;
    var ctd = req.body.ctd;
    var mtd = req.body.mtd;
    var btd = req.body.btd;
    var pa = req.body.pa;
    var ca = req.body.ca;
    var ma = req.body.ma;
    var ba = req.body.ba;
    Admission.find(function (err, admissions) {
        if (err) {
            console.log(err);
        }
        else {
            admissions.forEach(function (admission) {
                if (roll_number == admission.rollNumber) {
                    if (ptd != 0) {
                        var p_td = Number(admission.totalDayPhysics) + Number(ptd);
                        Admission.updateOne({ rollNumber: roll_number }, { totalDayPhysics: p_td }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (ctd != 0) {
                        var c_td = Number(admission.totalDayChemistry) + Number(ctd);
                        Admission.updateOne({ rollNumber: roll_number }, { totalDayChemistry: c_td }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (mtd != 0) {
                        var m_td = Number(admission.totalDayMaths) + Number(mtd);
                        Admission.updateOne({ rollNumber: roll_number }, { totalDayMaths: m_td }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (btd != 0) {
                        var b_td = Number(admission.totalDayBiology) + Number(btd);
                        Admission.updateOne({ rollNumber: roll_number }, { totalDayBiology: b_td }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (pa != 0) {
                        var p_a = Number(admission.physicsAtt) + Number(pa);
                        Admission.updateOne({ rollNumber: roll_number }, { physicsAtt: p_a }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (ca != 0) {
                        var c_a = Number(admission.chemistryAtt) + Number(ca);
                        Admission.updateOne({ rollNumber: roll_number }, { chemistryAtt: c_a }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (ma != 0) {
                        var m_a = Number(admission.mathAtt) + Number(ma);
                        Admission.updateOne({ rollNumber: roll_number }, { mathAtt: m_a }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (ba != 0) {
                        var b_a = Number(admission.biologyAtt) + Number(ba);
                        Admission.updateOne({ rollNumber: roll_number }, { biologyAtt: b_a }, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    res.send('<script>alert("Success updated the Attendence")</script>')
                }
            });
        }
    });
});

app.post("/adminchangetestquestion", function (req, res) {
        Admission.find(function (err, admissions) {
        if (err) {
            console.log(err);
        }
        else {
            admissions.forEach(function (admission) {
                if (admission.yourName != "null") {
                    var val = admission.rollNumber;
                    var v = req.body.tq;
                    Admission.updateOne({ rollNumber: val }, { testQuestion: v }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
    });
    res.send('<script>alert("Success fully updated question")</script>');
});

app.post("/adminchangenotes", function (req, res) {
    Admission.find(function (err, admissions) {
        if (err) {
            console.log(err);
        }
        else {
            admissions.forEach(function (admission) {
                if (admission.yourName != "null") {
                    var val = admission.rollNumber;
                    var v = req.body.notes;
                    Admission.updateOne({ rollNumber: val }, { notes: v }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
    });
    res.send('<script>alert("Success fully updated notes")</script>')
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index1.html");
});

app.listen(port, function () {
    console.log("server started");
});