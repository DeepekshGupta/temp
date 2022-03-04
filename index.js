const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()
var fs = require('fs');
const { stringify } = require("querystring");

// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
	
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it

var fname = "";
upload_folder = "uploads"

var storage = multer.diskStorage({
	destination: function (req, file, cb) {

		// Uploads is the Upload_folder_name
		cb(null, upload_folder)
	},
	filename: function (req, file, cb) {
		fname = file.fieldname + "-" + Date.now()+file.originalname;
	cb(null, file.fieldname + "-" + Date.now()+file.originalname)
	}
})
	

	
var upload = multer({storage: storage}).single("mypic");	

app.get("/",function(req,res){
	res.render("Signup");
})
	
app.post("/uploadProfilePicture",function (req, res, next) {
		
	// Error MiddleWare for multer file upload, so if any
	// error occurs, the image would not be uploaded!
	upload(req,res,function(err) {

		if(err) {

			// ERROR occured (here it can be occured due
			// to uploading image of size greater than
			// 1MB or uploading different file type)
			res.send(err)
		}
		else {

			// SUCCESS, image successfully uploaded
			fname = __dirname + "\\" + upload_folder + "\\" + fname;

			res.redirect("/complete")
		}
	})
})
	
function delete_file(path){
	console.log(fs.readdirSync(__dirname + "\\" + upload_folder + "\\")); 
	var filePath = path;
    fs.unlinkSync(filePath);
}

app.get("/complete",function(req,res){
	// delete_file(fname);
	console.log(typeof(fs.readdirSync(__dirname + "\\" + upload_folder + "\\"))); 
	var x = fs.readdirSync(__dirname + "\\" + upload_folder + "\\"); 
	var y = fname
	var z = [y, x]
	console.log(x.toString()); 
	delete_file(fname);
    res.send(z.toString())
    // res.render("Signup");
})


// Take any port number of your choice which
// is not taken by any other process
app.listen(process.env.PORT || 3000, function(){
    console.log("server is running @ 3000");

})