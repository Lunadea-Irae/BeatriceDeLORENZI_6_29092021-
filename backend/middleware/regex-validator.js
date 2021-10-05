const fs = require('fs');

module.exports = (req, res, next) => {
    let source = req.body.sauce;
    if (source === undefined) {
        source = req.body;
    } else { source = JSON.parse(source); }
    try {
        const text = Object.values(source).join('');
        if (/[^A-z0-9À-ž\s\.\,\!\-]/.test(text)) { //Vérifie que les caractères sont autorisés
            const filename = req.file.filename;
            fs.unlink(`images/${filename}`, () => { console.log("image supprimée") }); //supprime l'image qui vient d'être up
            res.status(401).json({ message: "Caractères non autorisés !" });
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête invalide !')
        });
    }

};