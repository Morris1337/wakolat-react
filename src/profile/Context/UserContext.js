import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState([]); // ✅ Добавили permissions
    const [forceUpdate, setForceUpdate] = useState(false); // Флаг для перерисовки

    useEffect(() => {
        (async () => {
        const id = localStorage.getItem("userId");
        const role = localStorage.getItem("role");           // ⚠️ читаем тот ключ, который и сохраняем
        const username = localStorage.getItem("username") || "Неизвестный";
        const token = localStorage.getItem("accessToken");
        if (id && token) {
        setUser({ id, role, username, token });
        try {
            const res = await API.get('/users/minecraft-uuid', { headers: { Authorization: `Bearer ${token}` } });
            setUser(prev => ({ ...prev, minecraft_uuid: res.data.minecraft_uuid }));
        } catch (e) {
            // if (e.response?.status === 401) { localStorage.clear(); setUser(null); }
        }
        }
        setLoading(false);
    })();

    }, []);

    useEffect(() => {
        if (!user?.id) return;

        const fetchPermissions = async () => {
            try {
                const response = await API.get('/users/permissions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                });

                console.log("🔍 [DEBUG] Полученные разрешения с API:", response.data.permissions);
                setPermissions(response.data.permissions);
            } catch (error) {
                console.error('Ошибка загрузки разрешений:', error);
            }
        };

        fetchPermissions();
    }, [user?.id]); // ✅ permissions обновляются при изменении пользователя

    const loginUser = (id, role, token, minecraft_uuid, username) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username || '');
        localStorage.setItem('minecraft_uuid', minecraft_uuid); // ✅ добавлено


        setUser({ id, role, token, minecraft_uuid, username }); // ✅ Обновляем состояние, чтобы не перезагружать страницу
    };

    const logoutUser = () => {
        localStorage.clear();
        setUser(null);
        setPermissions([]); // ✅ Очищаем permissions при выходе

    };

    const switchUser = (newUserId, newRole, newToken, newUsername) => {
        console.log("Переключение на пользователя:", newUserId, newRole, newUsername);

        // ✅ Фикс: проверяем `username`, если `undefined`, берем из `localStorage`
        const finalUsername = newUsername || localStorage.getItem("username") || "Неизвестный";

        localStorage.setItem("userId", newUserId);
        localStorage.setItem("role", newRole);
        localStorage.setItem("username", finalUsername);
        if (newToken) {
            localStorage.setItem("accessToken", newToken);
        } else {
            newToken = localStorage.getItem("accessToken"); // ✅ Берем старый токен, если нового нет
        }

        setUser({ id: newUserId, role: newRole, username: finalUsername, token: newToken });


        // 🔥 Форсируем обновление всех компонентов
        setForceUpdate((prev) => !prev);
    };

    return (
        <UserContext.Provider value={{ user, loading, setUser, switchUser, permissions, forceUpdate, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
