// frontend/src/api.js
const BASE_URL = 'http://localhost:5001/api/competitions';

export async function fetchCompetitions() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Errore nel recupero delle competizioni');
    }
    return response.json();
}

export async function createCompetition(data) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nella creazione della competizione');
    }
    return response.json();
}

export async function getCompetition(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Competizione non trovata');
    }
    return response.json();
}

export async function updateCompetition(id, data) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nell\'aggiornamento della competizione');
    }
    return response.json();
}

export async function deleteCompetition(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nell\'eliminazione della competizione');
    }
    return response.json();
}
