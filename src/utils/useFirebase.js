import { initializeApp } from "firebase/app";
import {
  getDatabase,
  set,
  ref as dbRef,
  child,
  push,
  update,
  get,
} from "firebase/database";
import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import firebaseConfig from './constants';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const useFireBase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [secrets, setSecrets] = useState({});
  const [user, setUser] = useState({});

  const storage = getStorage();
  const auth = getAuth();

  let imageUrl = ''

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth, isLoading])

  const signIn = async (email, password) => {
    await setIsLoading(true);
    return await signInWithEmailAndPassword(auth, email, password).catch((e) => {
      console.log(e);
      return false;
    }).finally(async () => {
      await setIsLoading(false)
    });
  };

  const signUp = async (email, password, name) => {
    await setIsLoading(true);
    let isSucess = true;
    await createUserWithEmailAndPassword(auth, email, password).catch(async (e) => {
      await setIsLoading(false);
      isSucess = false;
    }).then(() => {
      updateProfile(getAuth().currentUser, { displayName: name }).catch(async (e) => {
        console.log(e);
        isSucess = false
      }).finally(async () => {
        await setIsLoading(false);
      })
    });

    return isSucess;
  };

  const writeUserData = (description, mediaUrl) => {
    if (!auth.currentUser && mediaUrl) {
      console.log('Please Login First');
      return;
    }
    const userId = auth?.currentUser?.uid;
    set(dbRef(db, 'usersPost/' + userId), {
      name: auth?.currentUser?.displayName,
      description,
      post_media: mediaUrl
    });
  }

  const uploadMedia = async (imageUpload) => {
    const imageRef = storageRef(storage, `products/${uuid()}`);

    await uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            imageUrl = url;
            console.log(url);
          })
          .catch(async (error) => {
            console.log(error.message);
            await setIsLoading(false);
          });
      })
      .catch(async (error) => {
        console.log(error.message);
        await setIsLoading(false);
      });

    return imageUrl;
  }

  const writeNewPost = async (description, title) => {
    if (!auth.currentUser) {
      alert('Please Login First');
      return;
    }
    await setIsLoading(true);
    const uid = auth?.currentUser?.uid;

    // Get a key for a new Post.
    const newPostKey = await push(child(dbRef(db), 'usersPosts')).key;

    // A post entry.
    const postData = {
      puid: newPostKey,
      title,
      displayName: auth?.currentUser?.displayName || 'User',
      description,
      post_media: imageUrl,
      createdDate: new Date(),
      likes: 0,
      Comments: {},
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/usersPosts/' + uid + '/' + newPostKey] = postData;

    return await update(dbRef(db), updates).then(async ()=> await getAllPost()).then(async () => {
      await setIsLoading(false);
    });
  }

  const getAllPost = async () => {
    const uid = '';
    await setIsLoading(true);
    const dbread = dbRef(getDatabase());

    const posts = [];

    await get(child(dbread, `usersPosts/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val()) {
          if (snapshot.val().Secrets) {
            setSecrets(snapshot.val().Secrets);
          }
          Object.keys(snapshot.val()).map(key =>
            Object.keys(snapshot.val()[key]).map((keys =>
              posts.push(snapshot.val()[key][keys]))));
        }
        setAllPosts(posts)
      } else {
        console.log("No data available");
      }
    }).catch(async (error) => {
      console.error(error);
      await setIsLoading(false);
    });

    await setIsLoading(false);
    return posts;

  }

  const signOutUser = async () => {
    await setIsLoading(true);

    return await signOut(auth).then(async () => {
      await setIsLoading(false);
    })
  }
  return {
    user,
    isLoading,
    allPosts,
    secrets,
    signIn,
    signUp,
    writeNewPost,
    getAllPost,
    writeUserData,
    signOutUser,
    uploadMedia,
  }
};
