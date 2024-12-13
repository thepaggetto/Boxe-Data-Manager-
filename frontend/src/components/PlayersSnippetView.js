// frontend/src/components/PlayersSnippetView.js
import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { fetchCompetitions } from '../api';

function PlayersSnippetView() {
    const [snippet, setSnippet] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const competitions = await fetchCompetitions();
                const playerSet = new Set();

                competitions.forEach(c => {
                    if (c.nomePL1) playerSet.add(c.nomePL1.trim());
                    if (c.nomePL2) playerSet.add(c.nomePL2.trim());
                });

                const playersList = Array.from(playerSet).map(player => ({
                    id: player,
                    title: player
                }));

                const snippetText = JSON.stringify(playersList, null, 2);
                setSnippet(snippetText);
            } catch (error) {
                console.error("Errore nel recupero delle competizioni:", error);
                alert("Errore nel recupero dei giocatori.");
            }
        })();
    }, []);

    const handleCopy = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(snippet)
                .then(() => alert("Snippet copiato negli appunti!"))
                .catch(err => alert("Errore nel copia negli appunti:", err));
        } else {
            // Fallback per browser non supportati
            const textArea = document.createElement("textarea");
            textArea.value = snippet;
            // Evita di mostrare la textarea
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert("Snippet copiato negli appunti!");
            } catch (err) {
                alert("Errore nel copia negli appunti:", err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div style={{ marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>Lista Pugili</Typography>
            <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>
        {snippet}
      </pre>
            <Button variant="contained" onClick={handleCopy} style={{ marginTop: '10px' }}>
                Copia negli appunti
            </Button>
        </div>
    );
}

export default PlayersSnippetView;
