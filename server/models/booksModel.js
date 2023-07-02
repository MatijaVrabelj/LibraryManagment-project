//ovdje je predefiniran model izgleda knjige, odnosno sve što knjiga mora sadržavati,
//te vrijednosti su vidljive u formi, koja se nalazi u src/pages/profile/Books/BookForm
const mongoose = require("mongoose");//ovaj vrag se koristi samo za modele i NIGDJE DRUGDJE

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
    totalCopies: {
        type: Number,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("books", bookSchema);