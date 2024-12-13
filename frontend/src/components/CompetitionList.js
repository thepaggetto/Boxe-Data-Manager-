// frontend/src/components/CompetitionList.js
import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteCompetition } from '../api';
import countries from '../countries';

/**
 * Ottiene il nome completo della nazionalità dato il codice.
 * @param {string} code - Il codice della nazionalità.
 * @returns {string} - Il nome completo della nazionalità.
 */
function getCountryLabel(code) {
    const country = countries.find(c => c.code === code.toLowerCase());
    return country ? country.label : code;
}

function CompetitionList({ competitions, onDeleted }) {

    const handleDelete = async (id) => {
        if (window.confirm("Sei sicuro di voler eliminare questa gara?")) {
            try {
                await deleteCompetition(id);
                onDeleted(id);
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div style={{ marginBottom: '40px' }}>
            <Typography variant="h4" gutterBottom>Lista Match</Typography>
            {competitions.length === 0 ? (
                <Typography>Nessun match disponibile.</Typography>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {competitions.map(c => (
                        <li key={c._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <Typography variant="h6">{c.nomeGara}</Typography>
                            <Typography variant="body1">Tipo Gara: {c.tipoGara}</Typography>
                            <Typography variant="body1">Campionato: {c.nomeCampionato}</Typography>
                            <Typography variant="subtitle1">Pugile 1:</Typography>
                            <Typography variant="body2">Nome: {c.nomePL1}</Typography>
                            <Typography variant="body2">Record: {c.recordPL1}</Typography>
                            <Typography variant="body2">Città: {c.cittaPL1}</Typography>
                            <Typography variant="body2">Nazionalità: {getCountryLabel(c.nazionalitaPL1)}</Typography>
                            <Typography variant="body2">Età: {c.etàPL1}</Typography>
                            <Typography variant="body2">Peso: {c.pesoPL1}</Typography>
                            <Typography variant="body2">Altezza: {c.altezzaPL1}</Typography>
                            <Typography variant="subtitle1">Pugile 2:</Typography>
                            <Typography variant="body2">Nome: {c.nomePL2}</Typography>
                            <Typography variant="body2">Record: {c.recordPL2}</Typography>
                            <Typography variant="body2">Città: {c.cittaPL2}</Typography>
                            <Typography variant="body2">Nazionalità: {getCountryLabel(c.nazionalitaPL2)}</Typography>
                            <Typography variant="body2">Età: {c.etàPL2}</Typography>
                            <Typography variant="body2">Peso: {c.pesoPL2}</Typography>
                            <Typography variant="body2">Altezza: {c.altezzaPL2}</Typography>
                            <div style={{ marginTop: '10px' }}>
                                <Button variant="outlined" color="primary" component={Link} to={`/edit/${c._id}`} style={{ marginRight: '10px' }}>
                                    Modifica
                                </Button>
                                <Button variant="outlined" color="error" onClick={() => handleDelete(c._id)}>
                                    Elimina
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CompetitionList;
