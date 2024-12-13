// frontend/src/components/SnippetView.js
import { Typography, Button } from '@mui/material';
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

function SnippetView({ competitions }) {

    const generateSnippet = (competitions) => {
        const table = {};
        competitions.forEach(c => {
            table[c.nomeGara] = {
                tipoGara: c.tipoGara,
                nomeCampionato: c.nomeCampionato,
                nomePL1: c.nomePL1,
                recordPL1: c.recordPL1,
                cittaPL1: c.cittaPL1,
                nazionalitaPL1: getCountryLabel(c.nazionalitaPL1),
                svgPL1: c.svgPL1,
                "etàPL1": c.etàPL1,
                pesoPL1: c.pesoPL1,
                altezzaPL1: c.altezzaPL1,
                nomePL2: c.nomePL2,
                recordPL2: c.recordPL2,
                cittaPL2: c.cittaPL2,
                nazionalitaPL2: getCountryLabel(c.nazionalitaPL2),
                svgPL2: c.svgPL2,
                "etàPL2": c.etàPL2,
                pesoPL2: c.pesoPL2,
                altezzaPL2: c.altezzaPL2
            };
        });

        return `const CompetitionsLookupTable = ${JSON.stringify(table, null, 2)};`;
    };

    const snippet = generateSnippet(competitions);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet);
        alert("Snippet copiato negli appunti!");
    };

    return (
        <div style={{ marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>Anteprima Snippet</Typography>
            <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>
        {snippet}
      </pre>
            <Button variant="contained" onClick={handleCopy} style={{ marginTop: '10px' }}>
                Copia negli appunti
            </Button>
        </div>
    );
}

export default SnippetView;
