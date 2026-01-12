// src/Pages/admin/AccessMatrix.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import API from '../../../utils/api'; // было "../../../utils/api" — путь неверный для src/Pages/admin  :contentReference[oaicite:2]{index=2}

export default function AccessMatrix() {
  // data
  const [roles, setRoles] = useState([]);
  const [perms, setPerms] = useState([]);
  const [classes, setClasses] = useState([]);

  // selection
  const [selectedRole, setSelectedRole] = useState('');
  const [mode, setMode] = useState('role'); // 'role' | 'roleClass'
  const [classCode, setClassCode] = useState('');

  // role admin
  const [newRole, setNewRole] = useState('');
  const [renameTo, setRenameTo] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [extraRole, setExtraRole] = useState('');

  // --- permissions admin ---
const [permCode, setPermCode] = useState('');
const [permTitle, setPermTitle] = useState('');
const [permGroup, setPermGroup] = useState('');
const [permRenameFrom, setPermRenameFrom] = useState(''); // код, который переименовываем
const [permRenameTo, setPermRenameTo] = useState('');


  // summary (для подсветки Allow/Deny)
  const [summary, setSummary] = useState(null);

  // auth helper — нужен до useEffect (раньше вызывался до объявления)  :contentReference[oaicite:3]{index=3}
  const auth = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });

  // загрузка справочников (роли, права, классы)
  const loadAll = useCallback(async () => {
    const [r, p, c] = await Promise.all([
      API.get('/users/acl/roles', auth()),
      API.get('/users/acl/permissions', auth()),
      API.get('/users/acl/classes', auth()),
    ]);
    setRoles(r.data);
    setPerms(p.data);

    const classesArr = Array.isArray(c.data) ? c.data : (c.data?.classes || []);
    setClasses(classesArr); // раньше было setClasses(c.data.classes) — это ломало при объекте  :contentReference[oaicite:4]{index=4}

    if (r.data.length) setSelectedRole(prev => prev || r.data[0].name);
    if (classesArr.length) setClassCode(prev => prev || classesArr[0]);
  }, []);

  // загружаем один раз
  useEffect(() => { loadAll(); }, [loadAll]);

  // инспектор роли (для подсветки)
  const loadSummary = useCallback(async (roleName = selectedRole) => {
    if (!roleName) return;
    const s = await API.get(`/users/acl/roles/${encodeURIComponent(roleName)}/summary`, auth());
    setSummary(s.data);
  }, [selectedRole]);

  // обновлять свод при смене роли/режима/класса
  useEffect(() => { if (selectedRole) loadSummary(selectedRole); }, [selectedRole, mode, classCode, loadSummary]);

  // быстрые множества для подсветки текущих значений
  const { allowSet, denySet } = useMemo(() => {
    const a = new Set();
    const d = new Set();
    if (!summary) return { allowSet: a, denySet: d };

    if (mode === 'role') {
      (summary.role?.allow || []).forEach(p => a.add(p));
      (summary.role?.deny || []).forEach(p => d.add(p));
    } else {
      const cls = summary.classes?.[classCode];
      (cls?.allow || []).forEach(p => a.add(p));
      (cls?.deny || []).forEach(p => d.add(p));
    }
    return { allowSet: a, denySet: d };
  }, [summary, mode, classCode]);

  // ===== действия =====
  const setAllow = async (permission, allow) => {
    if (!selectedRole) return;
    if (mode === 'role') {
      await API.put('/users/acl/role-permission', { role: selectedRole, permission, allow }, auth());
    } else {
      await API.put('/users/acl/role-class-permission', { role: selectedRole, classCode, permission, allow }, auth());
    }
    await loadSummary(selectedRole);
  };

  const neutralize = async (permission) => {
    if (!selectedRole) return;
    if (mode === 'role') {
      await API.delete('/users/acl/role-permission', { ...auth(), data: { role: selectedRole, permission } });
    } else {
      await API.delete('/users/acl/role-class-permission', { ...auth(), data: { role: selectedRole, classCode, permission } });
    }
    await loadSummary(selectedRole);
  };

  // роли
  const createRole = async () => {
    if (!newRole.trim()) return;
    await API.post('/users/acl/roles', { name: newRole.trim() }, auth());
    setNewRole('');
    await loadAll();
  };

  const renameRole = async () => {
    if (!selectedRole || !renameTo.trim()) return;
    await API.patch(`/users/acl/roles/${encodeURIComponent(selectedRole)}`, { newName: renameTo.trim() }, auth());
    setRenameTo('');
    setSelectedRole(renameTo.trim());
    await loadAll();
  };

  const deleteRole = async () => {
    if (!selectedRole) return;
    await API.delete(`/users/acl/roles/${encodeURIComponent(selectedRole)}`, auth());
    await loadAll();
    setSelectedRole(prev => roles.find(r => r.name !== prev)?.name || '');
  };

  // назначения пользователям
  const setPrimaryRole = async () => {
    if (!targetUserId || !selectedRole) return;
    await API.put(`/users/acl/user/${targetUserId}/role`, { role: selectedRole }, auth());
  };

  const addExtraRole = async () => {
    if (!targetUserId || !extraRole.trim()) return;
    await API.post(`/users/acl/user/${targetUserId}/extra-role`, { role: extraRole.trim() }, auth());
    setExtraRole('');
  };

  const removeExtraRole = async () => {
    if (!targetUserId || !extraRole.trim()) return;
    await API.delete(`/users/acl/user/${targetUserId}/extra-role`, { ...auth(), data: { role: extraRole.trim() } });
    setExtraRole('');
  };

  const reloadPerms = async () => {
  const p = await API.get('/users/acl/permissions', auth());
  setPerms(p.data);
  await loadSummary(selectedRole);
};

const createPerm = async () => {
  if (!permCode.trim()) return;
  await API.post('/users/acl/permissions', {
    code: permCode.trim(),
    title: permTitle || null,
    group_name: permGroup || null,
  }, auth());
  setPermCode(''); setPermTitle(''); setPermGroup('');
  await reloadPerms();
};

const renamePerm = async () => {
  if (!permRenameFrom.trim() || !permRenameTo.trim()) return;
  await API.patch(`/users/acl/permissions/${encodeURIComponent(permRenameFrom.trim())}`, {
    newCode: permRenameTo.trim(),
  }, auth());
  setPermRenameFrom(''); setPermRenameTo('');
  await reloadPerms();
};

const deletePerm = async (code) => {
  if (!window.confirm(`Удалить permission "${code}" ?`)) return;
  await API.delete(`/users/acl/permissions/${encodeURIComponent(code)}`, auth());
  await reloadPerms();
};


  return (
    <div className="access-matrix" style={{maxWidth: 960, margin: '0 auto', padding: 16}}>
        {/* Панель управления разрешениями */}
<div className="perm-admin" style={{display:'grid', gap:8, margin:'12px 0'}}>
  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
    <input value={permCode} onChange={e=>setPermCode(e.target.value)} placeholder="code: напр. topring.manage_activities" style={{minWidth:260}} />
    <input value={permTitle} onChange={e=>setPermTitle(e.target.value)} placeholder="title: Человеческое имя" />
    <input value={permGroup} onChange={e=>setPermGroup(e.target.value)} placeholder="group (опц.)" style={{width:140}} />
    <button onClick={createPerm}>+ Создать разрешение</button>
  </div>
  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
    <input value={permRenameFrom} onChange={e=>setPermRenameFrom(e.target.value)} placeholder="переименовать: старый code" style={{minWidth:260}} />
    <input value={permRenameTo} onChange={e=>setPermRenameTo(e.target.value)} placeholder="→ новый code" style={{minWidth:200}} />
    <button onClick={renamePerm}>↔ Переименовать разрешение</button>
  </div>
</div>
<td>
  {/* <button onClick={() => neutralize(p.code)} title="Neutral (remove rule)">◻️</button> */}
  {/* <button onClick={() => deletePerm(p.code)} title="Удалить разрешение целиком">🗑</button> */}
</td>
      <h2 style={{textAlign:'center', marginBottom: 16}}>Доступы</h2>

      {/* Панель управления ролями */}
      <div className="role-admin" style={{display:'grid', gap:8, marginBottom:16}}>
        <div>
          <input value={newRole} onChange={e=>setNewRole(e.target.value)} placeholder="Новая роль" />
          <button onClick={createRole} style={{marginLeft:8}}>+ Создать</button>
        </div>
        <div>
          <input value={renameTo} onChange={e=>setRenameTo(e.target.value)} placeholder={`Переименовать ${selectedRole || 'роль'} →`} />
          <button onClick={renameRole} style={{marginLeft:8}}>↔ Переименовать</button>
          <button onClick={deleteRole} style={{marginLeft:8}}>🗑 Удалить</button>
        </div>
        <div>
          <input value={targetUserId} onChange={e=>setTargetUserId(e.target.value)} placeholder="userId" style={{width:110}} />
          <button onClick={setPrimaryRole} style={{marginLeft:8}}>Назначить основную роль</button>
        </div>
        <div>
          <input value={extraRole} onChange={e=>setExtraRole(e.target.value)} placeholder="доп. роль" />
          <button onClick={addExtraRole} style={{marginLeft:8}}>+ Extra</button>
          <button onClick={removeExtraRole} style={{marginLeft:8}}>- Extra</button>
        </div>
      </div>

      {/* Фильтры */}
      <div className="toolbar" style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
        <label>
          Роль:&nbsp;
          <select value={selectedRole} onChange={e=>setSelectedRole(e.target.value)}>
            {roles.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </label>

        <label>
          Режим:&nbsp;
          <select value={mode} onChange={e=>setMode(e.target.value)}>
            <option value="role">Роль (общий)</option>
            <option value="roleClass">Роль + Класс</option>
          </select>
        </label>

        {mode === 'roleClass' && (
          <label>
            Класс:&nbsp;
            <select value={classCode} onChange={e=>setClassCode(e.target.value)}>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        )}

        <button onClick={() => loadSummary(selectedRole)} style={{marginLeft:'auto'}}>Показать назначения роли</button>
      </div>

      {/* Таблица прав */}
      <table className="matrix" style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th style={{textAlign:'left', padding:'6px 4px'}}>Permission</th>
            <th>Allow</th>
            <th>Deny</th>
            <th>Neutral</th>
          </tr>
        </thead>
        <tbody>
          {perms.map(p => {
            const isAllow = allowSet.has(p.code);
            const isDeny  = denySet.has(p.code);
            return (
              <tr key={p.code}>
                <td style={{padding:'6px 4px'}}>
                  <code style={{fontWeight:600}}>{p.code}</code>
                  {p.title ? <div style={{opacity:.75, fontSize:12}}>{p.title}</div> : null}
                </td>
                <td>
                  <button
                    onClick={() => setAllow(p.code, true)}
                    style={{background: isAllow ? '#30c060' : undefined}}
                    title="Allow"
                  >✅</button>
                </td>
                <td>
                  <button
                    onClick={() => setAllow(p.code, false)}
                    style={{background: isDeny ? '#e05a5a' : undefined}}
                    title="Deny"
                  >⛔</button>
                </td>
                <td>
                  {/* <button onClick={() => neutralize(p.code)} title="Neutral (remove rule)">◻️</button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Отладочная сводка (по кнопке) */}
      {summary && (
        <div style={{marginTop:12}}>
          <pre style={{textAlign:'left', background:'#00000022', padding:8, borderRadius:6}}>
            {JSON.stringify(summary, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
