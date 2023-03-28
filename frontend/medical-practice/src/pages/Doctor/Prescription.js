import React,{ useState } from 'react';

const Consultation = () => {

    const [medicaments, setMedicaments] = useState(['']);

    const handleAddMedicament = () => {
        setMedicaments([...medicaments, '']); 
    };

    const handleMedicamentChange = (index, event) => {
        const newMedicaments = [...medicaments];
        newMedicaments[index] = event.target.value;
        setMedicaments(newMedicaments);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
    };

    return (
        <form onSubmit={handleSubmit}>
            {medicaments.map((medicament, index) => (
                <div key={index}>
                    <label htmlFor={`medicament-${index}`}>Médicament {index + 1} :</label>
                    <input
                        id={`medicament-${index}`}
                        type="text"
                        value={medicament}
                        onChange={(event) => handleMedicamentChange(index, event)}
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddMedicament}>+</button>
            <button type="submit">Enregistrer</button>
        </form>
    );
}

export default Consultation;