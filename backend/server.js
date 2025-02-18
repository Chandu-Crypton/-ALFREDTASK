const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://srikakulamchandu:Schandu1%23@cluster0.jt3x9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const FlashcardSchema = new mongoose.Schema({
    question: String,
    answer: String,
    box: { type: Number, default: 1 },
    nextReview: Date,
});

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

app.get("/api/flashcards", async (req, res) => {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
});

app.post("/api/flashcards", async (req, res) => {
    const { question, answer } = req.body;


    const reviewIntervals = [1, 3, 7];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + reviewIntervals[0]);

    const newFlashcard = new Flashcard({
        question,
        answer,
        box: 1,
        nextReview,
    });

    await newFlashcard.save();
    res.status(201).json(newFlashcard);
});

app.put("/api/flashcards/:id", async (req, res) => {
    const { id } = req.params;
    const { question, answer, box, nextReviewDate } = req.body;

    try {
        const updatedFlashcard = await Flashcard.findByIdAndUpdate(
            id,
            { question, answer, box, nextReview: nextReviewDate },
            { new: true }
        );

        if (!updatedFlashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        res.json(updatedFlashcard);
    } catch (error) {
        res.status(500).json({ message: "Error updating flashcard", error });
    }
});



app.delete("/api/flashcards/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

        if (!deletedFlashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        res.json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting flashcard", error });
    }
});


app.listen(5000, () => console.log("Server running on port 5000"));


