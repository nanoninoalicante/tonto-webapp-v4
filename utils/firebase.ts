import firebaseApp from "./configFirebase";
import { getFirestore, doc, getDoc, collection, getDocs, limit, query, where, Query, DocumentData, orderBy, startAfter, DocumentSnapshot } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function getPostFirestore(postId: string) {
    try {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
            return postSnap.data();
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}