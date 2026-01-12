// import { FighterBoys, FighterGirls } from "../Pages/fighters/FighterList/FighterList";

// /**
//  * Возвращает случайную аватарку по полу
//  * @param {string} gender - Пол пользователя ("Virietis" или "Sieviete").
//  * @returns {string} - URL случайной аватарки.
//  */
// export const getRandomAvatar = (gender) => {
//     if (gender === 'Virietis') {
//       return FighterBoys[Math.floor(Math.random() * FighterBoys.length)].img;
//     } else if (gender === 'Sieviete') {
//       return FighterGirls[Math.floor(Math.random() * FighterGirls.length)].img;
//     }
//     return '/static/default-avatar.png';
//   };