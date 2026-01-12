// utils/authUtils.js
export const hasPermission = (permissions, requiredPermission) => {
    console.log("🔍 [DEBUG] Проверка разрешения:", requiredPermission, permissions.includes(requiredPermission));
    return permissions.includes(requiredPermission);
  };
  
  export const hasRole = (user, requiredRole) => {
    console.log("🔍 [DEBUG] Проверка роли:", requiredRole, user?.role === requiredRole);
    return user?.role === requiredRole;
  };
  
  export const hasClass = (user, requiredClass) => {
    console.log("🔍 [DEBUG] Проверка класса:", requiredClass, user?.class === requiredClass);
    return user?.class === requiredClass;
  };
  