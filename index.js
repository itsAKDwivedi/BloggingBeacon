import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogsArray = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs", {
        blogsArray: blogsArray
    });
});

app.get("/create", (req, res)=>{
    res.render("create.ejs");
});

app.get('/viewBlog', (req, res)=>{
    let idx = req.query.index;
    res.render("content.ejs", {
        blog: blogsArray[idx]
    });
});

app.get('/deleted', (req, res)=>{
    let idx = req.query.index;
    blogsArray.splice(idx, 1);
    res.render("index.ejs", {
        blogsArray: blogsArray
    });
});

app.get('/edit', (req, res)=>{
    let idx = req.query.index;
    res.render("edit.ejs", {
        blogsArray: blogsArray[idx],
        idx: idx
    });
})

app.post('/', (req, res)=>{
    blogsArray.push({
        author: req.body['blogAuthor'],
        title: req.body['blogTitle'],
        intro: req.body['blogIntro'],
        content: req.body['blogContent'],
        creationDate: new Date().toUTCString().slice(5, 16)
    });
    res.render("index.ejs",{
        blogsArray: blogsArray
    });
});

app.post('/edit', (req, res)=>{
    let idx = req.query.index;
    blogsArray[idx] = {
        author: req.body['blogAuthor'],
        title: req.body['blogTitle'],
        intro: req.body['blogIntro'],
        content: req.body['blogContent'],
        creationDate: new Date().toUTCString().slice(5, 16)
    }

    res.render("index.ejs", {
        blogsArray: blogsArray
    });
});

app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`);
});
