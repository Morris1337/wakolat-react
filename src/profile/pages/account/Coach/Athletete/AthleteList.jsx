import React, { useState, useEffect, useContext } from "react";
import API from "../../../../utils/api"; // API-клиент
import { UserContext } from "../../../../Context/UserContext"; // Контекст пользователя
import "./AthleteList.scss"; // Стили

const ROLE_FILTERS = {
  all: () => true,
  kickbox: (athlete) => ["crocodile", "frog", "turtle"].includes(athlete.role),
  fitness: (athlete) => athlete.role === "fitnes",
  gym: (athlete) => athlete.role === "gym",
};

const AthleteList = () => {
  const [athletes, setAthletes] = useState([]);
  const { user } = useContext(UserContext); // Получаем данные о пользователе
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [payments, setPayments] = useState({}); // Оплаты пользователей

  useEffect(() => {
    const fetchAthletes = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("❌ Ошибка: нет токена авторизации");
        console.error("❌ Ошибка: нет токена в localStorage!");
        setLoading(false);
        return;
      }

      try {
        console.log("🔍 Отправляем запрос к API /users/");
        const response = await API.get("/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ [DEBUG] Ответ API /users/:", response.data);
        setAthletes(response.data);

        console.log("🔍 Отправляем запрос к API /users/payments/");
        const paymentsResponse = await API.get("/users/payments/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ [DEBUG] Ответ API /users/payments/:", paymentsResponse.data);

    // Фильтруем оплаты ТОЛЬКО за текущий месяц
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    const paymentMap = {};
    paymentsResponse.data.forEach((payment) => {
      if (payment.date.startsWith(currentMonth)) {
        paymentMap[payment.user_id] = payment.is_paid;
      }
    });

    setPayments(paymentMap);
  } catch (err) {
    setError(`❌ Ошибка API: ${err.response?.status} - ${err.response?.data?.message || err.message}`);
    console.error("❌ Ошибка API:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

    fetchAthletes();
  }, []);

  // Функция для изменения оплаты
  const handlePaymentChange = async (athlete) => {
    const newStatus = !payments[athlete.id]; // Переключаем оплату

    // Обновляем UI мгновенно
    setPayments((prevPayments) => ({
      ...prevPayments,
      [athlete.id]: newStatus,
    }));

    try {
      await API.post("/users/payments/", {
        user_id: athlete.id,
        first_name: athlete.first_name,
        last_name: athlete.last_name,
        role: athlete.role,
        date: new Date().toISOString().split("T")[0], // Текущая дата
        is_paid: newStatus,
      });

      console.log(`💰 Оплата для ${athlete.first_name} обновлена: ${newStatus}`);
    } catch (err) {
      console.error("❌ Ошибка при обновлении оплаты:", err);
      // Откатываем изменение, если запрос не удался
      setPayments((prevPayments) => ({
        ...prevPayments,
        [athlete.id]: !newStatus,
      }));
    }
  };

  if (!user || !["superadmin", "admin", "coach"].includes(user.role)) {
    return <p>🚫 У вас нет доступа к этой странице</p>;
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;

  const filteredAthletes = athletes.filter(ROLE_FILTERS[filter]);

  return (
    <div className="athlete-list">
      <h2>🏋️‍♂️ Список спортсменов</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>Все</button>
        <button onClick={() => setFilter("kickbox")} className={filter === "kickbox" ? "active" : ""}>Кик-бокс</button>
        <button onClick={() => setFilter("fitness")} className={filter === "fitness" ? "active" : ""}>Фитнес</button>
        <button onClick={() => setFilter("gym")} className={filter === "gym" ? "active" : ""}>Зал</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Дата рождения</th>
            <th>Пол</th>
            <th>Вес (кг)</th>
            <th>Роль</th>
            <th>Оплата</th>
          </tr>
        </thead>
        <tbody>
          {filteredAthletes.length > 0 ? (
            filteredAthletes.map((athlete) => (
              <tr key={athlete.id}>
                <td>{athlete.first_name}</td>
                <td>{athlete.last_name}</td>
                <td>{athlete.birth_date}</td>
                <td>{athlete.gender}</td>
                <td>{athlete.weight}</td>
                <td>{athlete.role}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!payments[athlete.id]}
                    onChange={() => handlePaymentChange(athlete)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">❌ Спортсмены не найдены</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteList;
