const Cat = require("../models/cat")
const express = require('express');
const router = express.Router();
// INDEX: GET
// /cats
// Gives a page displaying all the cats
router.get('/', async (req, res)=>{
    if(!req.session.visits){
        req.session.visits = 1;
    }else{
        req.session.visits += 1
    }
    const cats = await Cat.find();
    // Demo that res.locals is the same as the object passed to render
    res.locals.visits = req.session.visits;
    res.locals.cats = cats;
    res.render('cats/index.ejs')
})
// NEW: GET
// /cats/new
// Shows a form to create a new cat
router.get('/new', (req, res)=>{
    res.render('cats/new.ejs')
})

// SHOW: GET
// /cats/:id
// Shows a page displaying one cat
router.get('/:id', async (req, res)=>{
    const cat = await Cat.findById(req.params.id).populate('user')
    res.render("cats/show.ejs", {
        cat: cat
    })
})

// CREATE: POST
// /cats
// Creates an actual cat, then...?
router.post('/', async (req, res)=>{
    req.body.user = req.session.userId
    const newCat = await Cat.create(req.body);
    console.log(newCat)
    res.redirect('/cats')
})

// EDIT: GET
// /cats/:id/edit
// SHOW THE FORM TO EDIT A CAT
router.get('/:id/edit', async (req, res)=>{
    try{
        const cat = await Cat.findById(req.params.id)
        res.render('cats/edit.ejs', {
            cat: cat
        })
    }catch(err){
        res.sendStatus(500)
    }
})

// UPDATE: PUT
// /cats/:id
// UPDATE THE CAT WITH THE SPECIFIC ID
router.put('/:id', async (req, res)=>{
   try{
        await Cat.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/cats/${req.params.id}`)
   }catch(err){
        res.sendStatus(500)
   }
})
// DELETE: DELETE
// /cats/:id
// DELETE THE CAT WITH THE SPECIFIC ID
router.delete('/:id', async (req, res)=>{
    try{
        await Cat.findByIdAndDelete(req.params.id)
        res.redirect('/cats')
    }catch(err){
        res.sendStatus(500)
    }
})

module.exports = router;