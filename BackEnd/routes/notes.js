const express = require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchuser");
const Notes = require("../models/Notes");

// Get all notes of the user by: GET "/api/notes/getAllNotes". Login required
router.get("/getAllNotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });   // find all notes of the user with the help of user id
        res.status(200).json({ success: true, notes: notes });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error");

    }
});

// Add a new note of the user by: POST "/api/notes/addNote". Login required
router.post("/addNote", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        if (title.length < 3) {
            res.status(400).json({ success: false, error: "Length of title must be greater than 2" });
            return;
        }
        if (description.length < 3) {
            res.status(400).json({ success: false, error: "Length of description must be greater than 2" });
            return;
        }
        const newNote = new Notes({ title, description, tag, user: req.user.id });
        const saveNote = await newNote.save();
        res.status(201).json({ success: true, note: saveNote });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error");
    }
});

// Update an existing note of the user, corresponing to given id by: PUT "/api/notes/updateNote". Login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newNode = {};       // create a new node to update the note
        if (title) {
            if (title.length < 3) {
                res.status(400).json({ success: false, error: "Length of title must be greater than 2" });
                return;
            }
            newNode.title = title;
        }
        if (description) {
            if (description.length < 3) {
                res.status(400).json({ success: false, error: "Length of description must be greater than 2" });
                return;
            }
            newNode.description = description;
        }
        if (tag) {
            newNode.tag = tag;
        }

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, error: "Note not Found" });
        }
        if (note.user.toString() !== req.user.id) {  // Login user (i.e. note.user) and user who want to update the note (i.e. req.user.id) are not same.
            return res.status(401).json({ success: false, error: "Not allowed" });
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNode }, { new: true });  // update the note in mongoDB
        res.status(200).json({ success: true, note: note });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

// Delete an existing note of the user, corresponing to given id by: DELETE "/api/notes/deleteNote". Login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    try {

        let note = await Notes.findById(req.params.id);

        if (!note) {     // check whether note exists or not
            return res.status(404).json({ success: false, error: "Note not Found" });
        }
        if (note.user.toString() !== req.user.id) {   // Login user (i.e. note.user) and user who want to delete the note (i.e. req.user.id) are not same.
            return res.status(401).json({ success: false, error: "Not allowed" });
        }
        note = await Notes.findByIdAndDelete(req.params.id);  // delete the note from mongoDB
        res.status(200).json({ success: true, note: note });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router; 