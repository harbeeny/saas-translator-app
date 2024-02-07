"use client"

import { db } from "@/firebase-db/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function CheckoutButton() {
    const {data: session} = useSession();
    const [loading, setLoading] = useState(false);

    const createCheckoutSession = async () => {
        if (!session?.user.id) return;

        // push a document into firestore db
        setLoading(true)

        const docRef = await addDoc(collection(db, "customers", session.user.id, 'checkout_sessions'), 
        {
            price: "price_1OXtN5DKIGtA8Yrgzo7OYr0p",
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })
        // stripe extension on firebase will create a checkout session
        return onSnapshot(docRef, snap => {
            const data = snap.data();
            const url = data?.url;
            const error = data?.error;

            if(error) {
                // Show an error to your customer and inspect your cloud function logs in Firebase console.
                alert(`An error occurred: ${error.message}`);
                setLoading(false);
            }

            if(url) {
                // We have a Stripe checkout URL, lets redirect.
                window.location.assign(url);
                setLoading(false);
            }
        })

        // redirect user to checkout page
    }

  return (
    <div className="flex flex-col space-y-2">
        {/* If subscribed show me the user is subscribed */ }
        <button onClick={() => createCheckoutSession()} className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
            {loading ? <LoadingSpinner /> : 'Sign Up!'}
        </button>
    </div>
  );
}

export default CheckoutButton