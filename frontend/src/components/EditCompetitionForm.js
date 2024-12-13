// frontend/src/components/EditCompetitionForm.js
import { useEffect, useState } from 'react';
import { getCompetition, updateCompetition } from '../api';
import { TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import countries from '../countries';
import { useNavigate, useParams } from 'react-router-dom';

function padAndFormatWeight(value) {
    const num = Number(value);
    if (isNaN(num) || num < 0) return '000,000KG';
    const [intPart, decPart] = value.toFixed(3).split('.');
    const paddedInt = intPart.padStart(3, '0');
    const paddedDec = decPart.padEnd(3, '0');
    return `${paddedInt},${paddedDec}KG`;
}

function padAndFormatHeight(value) {
    const num = Number(value);
    if (isNaN(num) || num < 0) return '000,000cm';
    const [intPart, decPart] = value.toFixed(3).split('.');
    const paddedInt = intPart.padStart(3, '0');
    const paddedDec = decPart.padEnd(3, '0');
    return `${paddedInt},${paddedDec}cm`;
}

function EditCompetitionForm({ onUpdate }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const competition = await getCompetition(id);

                setForm({
                    ...competition,
                    pesoPL1: competition.pesoPL1 ? competition.pesoPL1.replace('KG', '').replace(',', '.') : '',
                    altezzaPL1: competition.altezzaPL1 ? competition.altezzaPL1.replace('cm', '').replace(',', '.') : '',
                    pesoPL2: competition.pesoPL2 ? competition.pesoPL2.replace('KG', '').replace(',', '.') : '',
                    altezzaPL2: competition.altezzaPL2 ? competition.altezzaPL2.replace('cm', '').replace(',', '.') : '',
                    nazionalitaPL1: competition.nazionalitaPL1 || '', // Imposta il codice
                    nazionalitaPL2: competition.nazionalitaPL2 || ''  // Imposta il codice
                });
            } catch (error) {
                alert(error.message);
                navigate('/');
            }
        })();
    }, [id, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNationChange = (player, code) => {
        const country = countries.find(c => c.code === code);
        if (!country) return;
        setForm(f => ({
            ...f,
            [`nazionalita${player}`]: country.code, // Memorizza il codice
            [`svg${player}`]: `https://flagcdn.com/${country.code}.svg`
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...form };

        // Formattazione dei campi peso e altezza
        data.pesoPL1 = data.pesoPL1 ? padAndFormatWeight(parseFloat(data.pesoPL1)) : '000,000KG';
        data.altezzaPL1 = data.altezzaPL1 ? padAndFormatHeight(parseFloat(data.altezzaPL1)) : '000,000cm';
        data.pesoPL2 = data.pesoPL2 ? padAndFormatWeight(parseFloat(data.pesoPL2)) : '000,000KG';
        data.altezzaPL2 = data.altezzaPL2 ? padAndFormatHeight(parseFloat(data.altezzaPL2)) : '000,000cm';

        try {
            const updatedCompetition = await updateCompetition(id, data);
            onUpdate(updatedCompetition);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    if (!form) return <div>Caricamento...</div>;

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '40px', marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>Modifica Gara: {form.nomeGara}</Typography>
            <Grid container spacing={2}>
                {/* Campi Principali */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nome Gara"
                        name="nomeGara"
                        value={form.nomeGara || ''}
                        onChange={handleChange}
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Tipo Gara"
                        name="tipoGara"
                        value={form.tipoGara || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nome Campionato"
                        name="nomeCampionato"
                        value={form.nomeCampionato || ''}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Pugile 1 */}
                <Grid item xs={12}>
                    <Typography variant="h5">Pugile 1</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Nome PL1"
                        name="nomePL1"
                        value={form.nomePL1 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Record PL1"
                        name="recordPL1"
                        value={form.recordPL1 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Città PL1"
                        name="cittaPL1"
                        value={form.cittaPL1 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Nazionalità PL1</InputLabel>
                        <Select
                            value={form.nazionalitaPL1 || ''}
                            label="Nazionalità PL1"
                            onChange={(e) => handleNationChange('PL1', e.target.value)}
                        >
                            {countries.map(c => (
                                <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Età PL1"
                        name="etàPL1"
                        value={form.etàPL1 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Peso PL1 (es: 75)"
                        name="pesoPL1"
                        value={form.pesoPL1}
                        onChange={handleChange}
                        inputProps={{ step: "0.001", min: "0" }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Altezza PL1 (es: 180)"
                        name="altezzaPL1"
                        value={form.altezzaPL1}
                        onChange={handleChange}
                        inputProps={{ step: "0.001", min: "0" }}
                    />
                </Grid>

                {/* Pugile 2 */}
                <Grid item xs={12}>
                    <Typography variant="h5">Pugile 2</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Nome PL2"
                        name="nomePL2"
                        value={form.nomePL2 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Record PL2"
                        name="recordPL2"
                        value={form.recordPL2 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Città PL2"
                        name="cittaPL2"
                        value={form.cittaPL2 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Nazionalità PL2</InputLabel>
                        <Select
                            value={form.nazionalitaPL2 || ''}
                            label="Nazionalità PL2"
                            onChange={(e) => handleNationChange('PL2', e.target.value)}
                        >
                            {countries.map(c => (
                                <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Età PL2"
                        name="etàPL2"
                        value={form.etàPL2 || ''}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Peso PL2 (es: 70)"
                        name="pesoPL2"
                        value={form.pesoPL2}
                        onChange={handleChange}
                        inputProps={{ step: "0.001", min: "0" }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Altezza PL2 (es: 175)"
                        name="altezzaPL2"
                        value={form.altezzaPL2}
                        onChange={handleChange}
                        inputProps={{ step: "0.001", min: "0" }}
                    />
                </Grid>

                {/* Pulsante di invio */}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">Salva Modifiche</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default EditCompetitionForm;
