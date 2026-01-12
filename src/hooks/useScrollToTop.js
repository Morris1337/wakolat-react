// src/hooks/useScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Если есть якорь (#section), сначала пробуем прокрутить к нему
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Иначе — просто наверх страницы
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // можно "auto" если без анимации
    });
  }, [pathname, hash]);
};

export default useScrollToTop;
