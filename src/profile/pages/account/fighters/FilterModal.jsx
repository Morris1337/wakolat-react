import React from 'react';
// import './filterModal.scss';

const disciplines = ['Kick-boxing', 'Boxing', 'Taekwondo', 'Fitness', 'Gym'];

export default function FilterModal({
  onClose,
  selectedDisciplines,
  setSelectedDisciplines,
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
  applyFilters,
}) {
  const handleDisciplineChange = (discipline) => {
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter(item => item !== discipline));
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
  };

  const handleApply = () => {
    console.log("🎯 Выбранные дисциплины:", selectedDisciplines);
    applyFilters();
    onClose();
};

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <h2>Фильтр</h2>

        <div className="filter-section">
          <h3>Дисциплины</h3>
          {disciplines.map((discipline) => (
            <label key={discipline}>
              <input
                type="checkbox"
                checked={selectedDisciplines.includes(discipline)}
                onChange={() => handleDisciplineChange(discipline)}
              />
              {discipline}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3>Вес</h3>
          <input
            type="number"
            placeholder="Минимальный вес"
            value={minWeight}
            onChange={(e) => setMinWeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Максимальный вес"
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <button onClick={handleApply}>Применить</button>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}
