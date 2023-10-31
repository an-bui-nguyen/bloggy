import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path, { dirname } from "path";
import url, { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var contentArray = [];
var headerArray = [];
var dateArray = [];

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("homepage.ejs", {dateArray:dateArray, contentArray:contentArray, headerArray:headerArray});
})

app.get("/homepage", (req,res) => {
    res.render("homepage.ejs", {dateArray:dateArray, contentArray:contentArray, headerArray:headerArray});
})

app.get("/add", (req, res) => {
    res.render("add.ejs");
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})



app.post("/edit", (req, res) => {
    console.log(req.body);
    const postIndex = parseInt(getKeyByValue(req.body, "Edit post"));
    const returnContent = contentArray[postIndex];
    const returnHeader = headerArray[postIndex];
    console.log(returnContent);
    console.log(returnHeader);
    res.redirect(url.format({
        pathname:"/edit",
        query:{
            "blogContent":contentArray[postIndex],
            "blogHeader":headerArray[postIndex],
            "postIndex": postIndex
        }
    }));
});

app.get("/edit", (req,res) => {
    console.log(req.query);
    const blogContent = req.query["blogContent"];
    const blogHeader = req.query["blogHeader"];
    const postIndex = req.query["postIndex"]
    res.render("edit.ejs", {blogContent:blogContent, blogHeader:blogHeader, postIndex:postIndex});
})

app.post("/after-edit", (req, res) => {
    var currentdate = new Date(); 
    var datetime = currentdate.toLocaleDateString('en-GB') + " " + currentdate.toLocaleTimeString('en-GB');
    const indexPost = parseInt(getKeyByValue(req.body, "Submit"));
    headerArray.splice(indexPost, 1);
    contentArray.splice(indexPost, 1);
    dateArray.splice(indexPost, 1)
    headerArray.unshift(req.body["blog-header"]);
    contentArray.unshift(req.body["blog-content"]);
    dateArray.unshift(datetime);
    res.redirect("/");
});

app.post("/delete", (req, res, event) => {
    console.log(req.body);
    const indexPost = parseInt(getKeyByValue(req.body, "Delete post"));
    headerArray.splice(indexPost, 1);
    contentArray.splice(indexPost, 1);
    dateArray.splice(indexPost, 1)
    res.redirect("/");
});

app.post("/homepage", (req, res) => {
    var currentdate = new Date(); 
    var datetime = currentdate.toLocaleDateString('en-GB') + " " + currentdate.toLocaleTimeString('en-GB'); 
    dateArray.push(datetime);
    const blogContent = req.body["blog-content"];
    const blogHeader = req.body["blog-header"];
    dateArray.unshift(datetime);
    contentArray.unshift(blogContent)
    headerArray.unshift(blogHeader);
    res.redirect("/");
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})