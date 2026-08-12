import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;

if (!projectId) {
    console.warn("FIREBASE_PROJECT_ID is not set. Google login will not work.");
}

const adminApp = initializeApp({ projectId });

export const verifyGoogleIdToken = async (idToken) => {
    return getAuth(adminApp).verifyIdToken(idToken);
};

export default adminApp;
