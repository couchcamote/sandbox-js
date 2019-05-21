const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Index API");
    res.send("API index");
});

module.exports = router;