import React, { useState } from 'react';

const Todoliste = () => {
  // État pour gérer le texte de l'entrée
  const [text, setText] = useState('');

  // État pour gérer la liste des tâches (todos)
  const [todos, setTodos] = useState([]);

  // État pour gérer l'édition d'une tâche
  const [modifier, setModifier] = useState(null);

  // Fonction pour mettre à jour le texte de l'entrée
  const handleInput = (e) => {
    setText(e.target.value);
  };

  // Fonction pour ajouter une nouvelle tâche
  const handleAjouter = () => {
    if (text.trim() !== '') {
      setText(''); // Réinitialise le texte de l'entrée
      setTodos([
          {
              id: todos.length, // Identifiant unique basé sur la longueur de la liste
              text: text, // Texte de la tâche
            },
            ...todos, // Ajoute les tâches existantes
      ]);
    }
  };

  // Fonction pour supprimer une tâche
  const handleDeleteTodo = (id) => {
    const deleteTodos = todos.filter((item) => item.id !== id); // Filtrer la liste pour exclure la tâche supprimée
    setTodos(deleteTodos); // Met à jour la liste des tâches
  };

  // Fonction pour éditer une tâche
  const handleEditTodo = (id) => {
    const EditTodos = todos.find((item) => item.id === id); // Trouve la tâche à éditer
    setText(EditTodos.text); // Met à jour le texte de l'entrée avec le texte de la tâche
    setModifier(id); // Met à jour le mode d'édition avec l'ID de la tâche
  };

  // Fonction pour mettre à jour une tâche existante
  const handleTout = () => {
    if (text.trim() !== '') {
      const Tout = todos.map((item) =>
        item.id === modifier ? {
            ...item, // Garde les autres propriétés inchangées
            text: text, // Met à jour le texte de la tâche
        } : item
      );
      setTodos(Tout); // Met à jour la liste des tâches
      setText(''); // Réinitialise le texte de l'entrée
      setModifier(null); // Réinitialise le mode d'édition
    }
  };

  return (
    <div className='bg-gray-300 max-w-5xl m-auto my-3'>
      <form>
        {/* Entrée de texte */}
        <input className=' ml-96 px-10 border-2  border-blue-500 rounded-md my-3 py-1' type='text' name='text' value={text}  onChange={handleInput}/>
        {/* Bouton pour ajouter ou modifier une tâche en fonction du mode */}
        {modifier === null ? (
          <button className='ml-5 shadow-lg bg-green-600 rounded-md p-2 font-serif font-bold text-white hover:bg-green-500' type='button' onClick={handleAjouter}>Ajouter</button>
        ) : (
          <button className='ml-5 shadow-lg bg-green-600 rounded-md p-2 font-serif font-bold text-white hover:bg-green-500' type='button' onClick={handleTout}>Modifier</button>
        )}
      </form>
      {/* Liste de tâches */}
      {todos.map((item) => (
        <ul className='mx-4'>
          <li  className='border border-blue-500 my-3'key={item.id}>
            {item.text} {/* Texte de la tâche */}
            {/* Bouton pour supprimer une tâche */}
            <button className='ml-7 bg-red-700 rounded-md shadow-md font-bold hover:bg-red-600 text-white p-px' onClick={() => handleDeleteTodo(item.id)}>Supprimer</button>
            {/* Bouton pour éditer une tâche */}
             <button className='mx-4 bg-yellow-600 rounded-md shadow-md font-bold hover:bg-yellow-500 text-white p-px' onClick={() => handleEditTodo(item.id)}>Modifier</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Todoliste;
