
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyA-E-4AlEmuMfhluxqozhQlANcY_2rn1sM",
//   authDomain: "wakolat-53803.firebaseapp.com",
//   projectId: "wakolat-53803",
//   storageBucket: "wakolat-53803.appspot.com",
//   messagingSenderId: "113908656152",
//   appId: "1:113908656152:web:e5146d77fb0745b5833b6d",
//   measurementId: "G-6S0Z9Z9PMR"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const db = getFirestore(app);

// useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postsCollection = collection(db, 'posts');
//         console.log("Запрос к коллекции posts");
  
//         const latestPostsSnapshot = await getDocs(
//           query(postsCollection, orderBy('date', 'desc'), limit(1))
//         );
//         if (latestPostsSnapshot.empty) {
//           console.log("Нет последних постов в базе данных");
//           return;
//         }
  
//         const latestPosts = latestPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         console.log("Загружен последний пост:", latestPosts[0]);
//         setLatestPost(latestPosts[0]);
  
//         const allPostsSnapshot = await getDocs(
//           query(postsCollection, orderBy('date', 'desc'))
//         );
//         if (allPostsSnapshot.empty) {
//           console.log("Нет других постов в базе данных");
//           return;
//         }
  
//         const allPosts = allPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         console.log("Загружены все посты:", allPosts);
//         const remainingPosts = allPosts.filter(post => post.id !== latestPosts[0]?.id);
//         setOtherPosts(remainingPosts);
  
//       } catch (error) {
//         console.error("Ошибка загрузки публикаций:", error);
//       }
//     };
  
//     fetchPosts();
//   }, []);

// export { db };