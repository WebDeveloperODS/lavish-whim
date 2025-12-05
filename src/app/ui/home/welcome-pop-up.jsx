'use client';
import { X } from "lucide-react";
import { useState } from "react";

export default function WelcomePopUp(){
    const [showPopUp, setShowPopUp] = useState(true);
    return  showPopUp && (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 relative">
                <X className="absolute top-2 right-2 bg-black p-1 rounded-md text-white stroke-[3px]"  onClick={() => setShowPopUp(false)} />
                <h1 className="text-2xl font-bold">Welcome to our website</h1>
            </div>
        </div>
    )
}