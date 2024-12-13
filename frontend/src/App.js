// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CompetitionForm from './components/CompetitionForm';
import CompetitionList from './components/CompetitionList';
import EditCompetitionForm from './components/EditCompetitionForm';
import SnippetView from './components/SnippetView';
import PlayersSnippetView from './components/PlayersSnippetView'; // Import del nuovo componente
import { fetchCompetitions } from './api';

function App() {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchCompetitions();
                setCompetitions(data);
            } catch (error) {
                console.error("Errore nel recupero delle competizioni:", error);
                alert("Errore nel recupero delle competizioni.");
            }
        })();
    }, []);

    const handleAdd = (newCompetition) => {
        setCompetitions([...competitions, newCompetition]);
    };

    const handleDelete = (id) => {
        setCompetitions(competitions.filter(c => c._id !== id));
    };

    const handleUpdate = (updatedCompetition) => {
        setCompetitions(competitions.map(c => c._id === updatedCompetition._id ? updatedCompetition : c));
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Boxe Data Manager | ArtiumViz
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Lista Match</Button>
                    <Button color="inherit" component={Link} to="/add">Aggiungi Match</Button>
                    <Button color="inherit" component={Link} to="/players">Lista Pugili</Button> {/* Nuovo pulsante */}
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: '20px' }}>
                <Routes>
                    <Route path="/" element={
                        <>
                            <CompetitionList competitions={competitions} onDeleted={handleDelete} />
                            <SnippetView competitions={competitions} />
                        </>
                    } />
                    <Route path="/add" element={<CompetitionForm onAdd={handleAdd} />} />
                    <Route path="/edit/:id" element={<EditCompetitionForm onUpdate={handleUpdate} />} />
                    <Route path="/players" element={<PlayersSnippetView />} /> {/* Nuova rotta */}
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
