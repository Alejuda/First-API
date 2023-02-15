const { Router } = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');

const tasks = require('../tasks.json');


router.get('/', (req,res)=>{
    res.render(path.join(__dirname, '../views/pages/tasks'), {tasks});
});


router.post('/', (req, res)=>{
    const { title, description} = req.body;

    if (title && description){
        const id = tasks.length + 1;
        const newTask = {...req.body, id } 
        tasks.push(newTask);
        fs.writeFileSync('./src/tasks.json',JSON.stringify(tasks));
        res.render(path.join(__dirname, '../views/pages/tasks'), {tasks});
        
    } else {
    res.status(500).json({error:'Wrong request'});
    }
});


router.delete('/:id', (req, res)=>{
    let found = false;
    tasks.forEach((task, idx)=>{
        if (task.id == req.params.id) {
            tasks.splice(idx, 1); 
            found = true;
            fs.writeFileSync('./src/tasks.json',JSON.stringify(tasks));
        }
    });
    if (found) {
        res.json(tasks);
    } else {
        res.status(500).json({error: "id not found"})
    }
    
});


router.put('/:id', (req, res)=>{
    const {id} = req.params
    const { title, description} = req.body;

    if (title && description){
        tasks.forEach((task, idx)=>{
            if (task.id == id) {
                task.title = title;
                task.description = description;
                
            }
        });
        fs.writeFileSync('./src/tasks.json',JSON.stringify(tasks));
        res.json(tasks);
    } else {
    res.status(500).json({error:'Wrong request'});
    }

});



module.exports = router;