// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
// import { db } from '../../../../../firebaseConfig'; // Ваш конфиг Firebase
// import TrendingAreaTop from './TrendingAreaTop';
// import TrendingAreaBottom from './TrendingAreaBottom';

// const SeparationPosts = () => {
//     const [latestPost, setLatestPost] = useState(null);
//     const [otherPosts, setOtherPosts] = useState([]);
  
//     useEffect(() => {
//       const fetchPosts = async () => {
//         try {
//           const postsCollection = collection(db, 'posts');
//           console.log("Запрос к коллекции posts");
  
//           // Получаем последний пост
//           const latestPostsSnapshot = await getDocs(
//             query(postsCollection, orderBy('date', 'desc'), limit(1))
//           );
          
//           if (latestPostsSnapshot.empty) {
//             console.log("Нет последних постов в базе данных");
//             return;
//           }
  
//           const latestPosts = latestPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           console.log("Загружен последний пост:", latestPosts[0]);
//           setLatestPost(latestPosts[0]);
  
//           // Получаем все остальные посты
//           const allPostsSnapshot = await getDocs(
//             query(postsCollection, orderBy('date', 'desc'))
//           );
  
//           if (allPostsSnapshot.empty) {
//             console.log("Нет других постов в базе данных");
//             return;
//           }
  
//           const allPosts = allPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           console.log("Загружены все посты:", allPosts);
  
//           // Фильтруем, чтобы убрать последний пост из списка
//           const remainingPosts = allPosts.filter(post => post.id !== latestPosts[0]?.id);
//           setOtherPosts(remainingPosts);
  
//         } catch (error) {
//           console.error("Ошибка загрузки публикаций:", error);
//         }
//       };
  
//       fetchPosts();
//     }, []);
  
//     // Проверка на загруженные данные
//     console.log("Состояние latestPost:", latestPost);
//     console.log("Состояние otherPosts:", otherPosts);
  
//     return (
//       <div>
//         {latestPost ? (
//           <TrendingAreaTop post={latestPost} />
//         ) : (
//           <p>Загрузка последнего поста...</p>
//         )}
//         {otherPosts.length > 0 ? (
//           <TrendingAreaBottom posts={otherPosts} />
//         ) : (
//           <p>Загрузка остальных постов...</p>
//         )}
//       </div>
//     );
//   };
  
//   export default SeparationPosts;