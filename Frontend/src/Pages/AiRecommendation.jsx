import React, { useState } from 'react';


const steps = [
    { name: "genre", label: "What's your favorite genre?", options: ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"] },
    { name: "mood", label: "What is your current mood?", options: ["Excited", "Relaxed", "Thoughtful", "Inspired", "Scared"] },
    { name: "decade", label: "Preferred decade?", options: ["1980s", "1990s", "2000s", "2010s", "2020s"] },
    { name: "language", label: "Preferred language?", options: ["English", "Spanish", "French", "Japanese", "Korean"] },
    { name: "length", label: "Preferred movie length?", options: ["Short (< 90 min)", "Standard (90-120 min)", "Long (> 120 min)"] }
];

const AIRecommendations = () => {
    const initialState = steps.reduce((acc, step) => {
        acc[step.name] = "";
        return acc;
    }, {});

    const [input, setInput] = useState(initialState);
    const [step, setStep] = useState(0); // Tracks current question 
    const [recommendations, setRecommendations] = useState([]); // Stores final movie titles
    const [isLoading, setIsLoading] = useState(false);

    // questionnaire logic
    const handleOption = (value) => {
        setInput({ ...input, [steps[step].name]: value });
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            generateRecommendations(); // Trigger AI on the final step
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const generateRecommendations = async () => {
        setIsLoading(true);




    };

    // Display Recommendations
    if (recommendations.length > 0) {
        return (
            <div className="w-full max-w-7xl mx-auto px-8 mt-2">
                <h2 className="text-2xl font-bold text-white text-center mb-4">AI Recommended Movies</h2>
                <RecommendedMovies movieTitles={recommendations} /> [18]
            </div>
        );
    }

    //Multi-step Questionnaire 
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181818] via-[#232323] to-[#181818] relative overflow-hidden">
            <img src="/background_banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[2px]" alt="BG" />

            <div className="relative w-full max-w-md mx-auto bg-[#181818] bg-opacity-90 rounded-2xl shadow-2xl border border-[#333] px-8 py-10 flex flex-col items-center min-h-[480px]">
                <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">AI Recommendation</h2>

                {/* Dynamic Progress Bar*/}
                <div className="w-full flex items-center mb-8">
                    <div className="flex-1 h-2 bg-[#232323] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#E50914] transition-all duration-300"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                    <span className="ml-4 text-white text-sm font-semibold">{step + 1} / {steps.length}</span>
                </div>

                {/* Current Question and Options  */}
                <div className="w-full flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-white text-center mb-6">{steps[step].label} </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {steps[step].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOption(option)}
                                className={`w-full py-3 rounded-xl border-2 transition duration-150 active:scale-95 ${input[steps[step].name] === option
                                        ? "bg-[#E50914] border-[#E50914] text-white shadow-lg"
                                        : "bg-[#232323] border-[#444] text-white hover:bg-[#E50914] hover:border-[#E50914]"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="w-full flex justify-between items-center mt-6">
                    <button
                        disabled={step === 0}
                        onClick={handleBack}
                        className="px-6 py-2 rounded-lg border-2 border-[#444] text-white font-semibold hover:bg-[#232323] disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        disabled={!input[steps[step].name] || isLoading}
                        onClick={handleNext}
                        className="px-6 py-2 rounded-lg bg-[#E50914] text-white font-semibold hover:bg-[#B0600F]"
                    >
                        {isLoading ? "Thinking..." : (step === steps.length - 1 ? "Finish" : "Next")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIRecommendations;