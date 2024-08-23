import { getFirestore, collection } from "firebase/firestore";
import app from "./config";

const db = getFirestore(app);

export const productsCollection = collection(db, "products");

export const ordersCollection = collection(db, "orders");
export default db;
