// backend/routes/competitions.js
import { Router } from 'express';
import db from '../db.js';
import { nanoid } from 'nanoid';

// Inizializza il router
const router = Router();

// Funzioni di validazione

/**
 * Valida il formato del peso.
 * Deve essere nel formato '000,000KG'.
 * @param {string} weight - Il peso da validare.
 * @returns {boolean} - Restituisce true se valido, altrimenti false.
 */
function validateWeight(weight) {
    return /^(\d{3}),(\d{3})KG$/.test(weight);
}

/**
 * Valida il formato dell'altezza.
 * Deve essere nel formato '000,000cm'.
 * @param {string} height - L'altezza da validare.
 * @returns {boolean} - Restituisce true se valido, altrimenti false.
 */
function validateHeight(height) {
    return /^(\d{3}),(\d{3})cm$/.test(height);
}

/**
 * Valida il codice della nazionalità.
 * Deve essere uno dei codici validi.
 * @param {string} code - Il codice della nazionalità da validare.
 * @returns {boolean} - Restituisce true se valido, altrimenti false.
 */
function validateNationality(code) {
    const validCodes = ["it", "hr", "gr", "fr", "de", "es", "gb", "us"];
    return validCodes.includes(code.toLowerCase());
}

// Rotte

/**
 * Creazione di una nuova gara.
 * Endpoint: POST /api/competitions
 */
router.post('/', async (req, res) => {
    const {
        nomeGara,
        tipoGara,
        nomeCampionato,
        nomePL1,
        recordPL1,
        cittaPL1,
        nazionalitaPL1,
        svgPL1,
        etàPL1,
        pesoPL1,
        altezzaPL1,
        nomePL2,
        recordPL2,
        cittaPL2,
        nazionalitaPL2,
        svgPL2,
        etàPL2,
        pesoPL2,
        altezzaPL2
    } = req.body;

    // Validazione dei campi peso e altezza
    if (
        !validateWeight(pesoPL1) ||
        !validateHeight(altezzaPL1) ||
        !validateWeight(pesoPL2) ||
        !validateHeight(altezzaPL2)
    ) {
        return res.status(400).json({
            error: 'Formato peso o altezza non valido. Deve essere 000,000KG o 000,000cm.'
        });
    }

    // Validazione delle nazionalità
    if (
        !validateNationality(nazionalitaPL1) ||
        !validateNationality(nazionalitaPL2)
    ) {
        return res.status(400).json({
            error: 'Codice nazionalità non valido.'
        });
    }

    // Creazione della nuova competizione
    const newCompetition = {
        _id: nanoid(),
        nomeGara,
        tipoGara,
        nomeCampionato,
        nomePL1,
        recordPL1,
        cittaPL1,
        nazionalitaPL1,
        svgPL1,
        etàPL1,
        pesoPL1,
        altezzaPL1,
        nomePL2,
        recordPL2,
        cittaPL2,
        nazionalitaPL2,
        svgPL2,
        etàPL2,
        pesoPL2,
        altezzaPL2
    };

    // Aggiungi la competizione al database
    db.data.competitions.push(newCompetition);
    await db.write();

    // Risposta con la nuova competizione creata
    res.status(201).json(newCompetition);
});

/**
 * Ottenere tutte le gare.
 * Endpoint: GET /api/competitions
 */
router.get('/', (req, res) => {
    res.json(db.data.competitions);
});

/**
 * Ottenere una singola gara per ID.
 * Endpoint: GET /api/competitions/:id
 */
router.get('/:id', (req, res) => {
    const competition = db.data.competitions.find(c => c._id === req.params.id);
    if (!competition) {
        return res.status(404).json({ error: 'Competition not found' });
    }
    res.json(competition);
});

/**
 * Aggiornare una gara esistente per ID.
 * Endpoint: PUT /api/competitions/:id
 */
router.put('/:id', async (req, res) => {
    const idx = db.data.competitions.findIndex(c => c._id === req.params.id);
    if (idx === -1) {
        return res.status(404).json({ error: 'Competition not found' });
    }

    const {
        nomeGara,
        tipoGara,
        nomeCampionato,
        nomePL1,
        recordPL1,
        cittaPL1,
        nazionalitaPL1,
        svgPL1,
        etàPL1,
        pesoPL1,
        altezzaPL1,
        nomePL2,
        recordPL2,
        cittaPL2,
        nazionalitaPL2,
        svgPL2,
        etàPL2,
        pesoPL2,
        altezzaPL2
    } = req.body;

    // Validazione dei campi peso e altezza
    if (
        !validateWeight(pesoPL1) ||
        !validateHeight(altezzaPL1) ||
        !validateWeight(pesoPL2) ||
        !validateHeight(altezzaPL2)
    ) {
        return res.status(400).json({
            error: 'Formato peso o altezza non valido. Deve essere 000,000KG o 000,000cm.'
        });
    }

    // Validazione delle nazionalità
    if (
        !validateNationality(nazionalitaPL1) ||
        !validateNationality(nazionalitaPL2)
    ) {
        return res.status(400).json({
            error: 'Codice nazionalità non valido.'
        });
    }

    // Aggiornamento della competizione
    db.data.competitions[idx] = {
        ...db.data.competitions[idx],
        nomeGara,
        tipoGara,
        nomeCampionato,
        nomePL1,
        recordPL1,
        cittaPL1,
        nazionalitaPL1,
        svgPL1,
        etàPL1,
        pesoPL1,
        altezzaPL1,
        nomePL2,
        recordPL2,
        cittaPL2,
        nazionalitaPL2,
        svgPL2,
        etàPL2,
        pesoPL2,
        altezzaPL2
    };

    await db.write();

    // Risposta con la competizione aggiornata
    res.json(db.data.competitions[idx]);
});

/**
 * Eliminare una gara per ID.
 * Endpoint: DELETE /api/competitions/:id
 */
router.delete('/:id', async (req, res) => {
    const idx = db.data.competitions.findIndex(c => c._id === req.params.id);
    if (idx === -1) {
        return res.status(404).json({ error: 'Competition not found' });
    }

    // Rimuovi la competizione dal database
    db.data.competitions.splice(idx, 1);
    await db.write();

    // Risposta di conferma
    res.json({ message: 'Competition deleted successfully' });
});

export default router;
