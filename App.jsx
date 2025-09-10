import React, { useState, useEffect } from 'react';

// --- Helper Components ---

const Header = () => (
    <header className="text-center mb-8">
        <h1 className="pacifico text-5xl text-indigo-600">StoryWeaver AI</h1>
        <p className="text-gray-600 mt-2 text-lg">Bring your child's imagination to life!</p>
    </header>
);

const Card = ({ children }) => (
    <div className="card bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-300 ease-in-out">
        {children}
    </div>
);

const Button = ({ onClick, children, className = '', disabled = false }) => (
    <button onClick={onClick} className={`btn py-3 px-6 rounded-xl font-semibold transition-all duration-200 ease-in-out shadow-lg ${className}`} disabled={disabled}>
        {children}
    </button>
);

const PrimaryButton = (props) => (
    <Button {...props} className={`btn-primary bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`} />
);

const SecondaryButton = (props) => (
    <Button {...props} className={`bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 ${props.className}`} />
);

// --- Step Components ---

const StoryForm = ({ setStoryInputs, onComplete }) => {
    const [formData, setFormData] = useState({
        childName: '',
        mainCharacter: '',
        storyIdea: '',
        artStyle: 'Whimsical Watercolor',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.childName && formData.mainCharacter && formData.storyIdea) {
            setStoryInputs(formData);
            onComplete();
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">1. Create Your Story</h2>
            <p className="text-gray-500 mb-6">Tell us a little about the story you want to create.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="childName" className="font-semibold text-gray-700 block mb-2">Child's First Name</label>
                        <input type="text" id="childName" value={formData.childName} onChange={handleChange} className="form-input w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" placeholder="e.g., Lily" required />
                    </div>
                    <div>
                        <label htmlFor="mainCharacter" className="font-semibold text-gray-700 block mb-2">Main Character</label>
                        <input type="text" id="mainCharacter" value={formData.mainCharacter} onChange={handleChange} className="form-input w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" placeholder="e.g., A brave little squirrel" required />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="storyIdea" className="font-semibold text-gray-700 block mb-2">Story Idea</label>
                        <textarea id="storyIdea" value={formData.storyIdea} onChange={handleChange} className="form-input w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" rows="3" placeholder="e.g., Who is looking for a magical, glowing acorn" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="artStyle" className="font-semibold text-gray-700 block mb-2">Art Style</label>
                        <select id="artStyle" value={formData.artStyle} onChange={handleChange} className="form-input w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition">
                            <option>Whimsical Watercolor</option>
                            <option>Colorful Cartoon</option>
                            <option>Cute Anime</option>
                            <option>Storybook Classic</option>
                        </select>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <PrimaryButton type="submit" className="w-full md:w-auto">
                        Create My Magical Story! &rarr;
                    </PrimaryButton>
                </div>
            </form>
        </Card>
    );
};

const LoadingIndicator = () => (
    <Card>
        <div className="p-12 text-center">
            <div className="flex justify-center items-center">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-6">Weaving Magic...</h2>
            <p className="text-gray-500 mt-2">Our AI is writing the story and painting the pictures. This might take a moment!</p>
        </div>
    </Card>
);

const StoryPreview = ({ storyData, storyInputs, onComplete }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const changePage = (newIndex) => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentPage(newIndex);
            setIsFading(false);
        }, 300);
    };

    const handleNext = () => {
        if (currentPage < storyData.length - 1) {
            changePage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            changePage(currentPage - 1);
        }
    };
    
    const page = storyData[currentPage];
    const artStyle = storyInputs.artStyle.replace(/\s+/g, '+');
    const imgSrc = `https://placehold.co/600x600/E0E7FF/4F46E5?text=${encodeURIComponent(page.imgPrompt)}\n\nArt+Style:\n${artStyle}`;

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">2. Preview Your Storybook</h2>
            <p className="text-gray-500 mb-6 text-center">Here is the story for <span className="font-bold text-indigo-600">{storyInputs.childName}</span>. Click the arrows to turn the pages.</p>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                    <div className="storybook-page shadow-inner bg-gray-50 rounded-2xl">
                        <img src={imgSrc} alt="Storybook illustration" className={`max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`} />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="storybook-page bg-white justify-start">
                        <p className={`text-gray-700 text-lg leading-relaxed transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>{page.text}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <SecondaryButton onClick={handlePrev} disabled={currentPage === 0}>&larr; Previous</SecondaryButton>
                <div className="text-gray-600 font-semibold">
                    Page <span>{currentPage + 1}</span> of <span>{storyData.length}</span>
                </div>
                <SecondaryButton onClick={handleNext} disabled={currentPage === storyData.length - 1}>Next &rarr;</SecondaryButton>
            </div>

            <div className="text-center mt-10">
                <PrimaryButton onClick={onComplete} className="w-full md:w-auto">Looks Perfect! Let's Choose a Cover</PrimaryButton>
            </div>
        </Card>
    );
};

const CoverSelection = ({ storyTitle, onComplete }) => {
    const [selectedCover, setSelectedCover] = useState(null);
    const covers = [
        { bg: 'bg-blue-500', text: 'text-white', name: 'Deep Blue' },
        { bg: 'bg-pink-400', text: 'text-white', name: 'Playful Pink' },
        { bg: 'bg-green-500', text: 'text-white', name: 'Forest Green' }
    ];

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">3. Choose Your Cover</h2>
            <p className="text-gray-500 mb-8 text-center">Select a beautiful hardcover design for your book.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {covers.map((cover, index) => (
                    <div key={index} className="text-center cursor-pointer" onClick={() => setSelectedCover(index)}>
                        <div className={`cover-option h-48 md:h-64 flex flex-col justify-center items-center p-4 shadow-lg rounded-xl border-4 transition-all duration-200 ${selectedCover === index ? 'border-indigo-500 scale-105 shadow-xl' : 'border-transparent'} ${cover.bg} ${cover.text}`}>
                            <h3 className="pacifico text-2xl text-center">{storyTitle}</h3>
                            <p className="mt-2">by StoryWeaver AI</p>
                        </div>
                        <p className="mt-2 font-semibold text-gray-700">{cover.name}</p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10">
                <PrimaryButton onClick={onComplete} disabled={selectedCover === null} className="w-full md:w-auto">Proceed to Checkout</PrimaryButton>
            </div>
        </Card>
    );
};

const Confirmation = ({ storyTitle, onStartOver }) => (
    <Card>
        <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-6">Thank You!</h2>
            <p className="text-gray-600 mt-2 text-lg">Your order has been placed successfully.</p>
            <p className="text-gray-500 mt-4">Your one-of-a-kind storybook, "<span className="font-semibold">{storyTitle}</span>", is being printed and will be shipped to you soon. Check your email for confirmation and tracking details.</p>
            <SecondaryButton onClick={onStartOver} className="mt-8">Create Another Story</SecondaryButton>
        </div>
    </Card>
);

// --- Main App Component ---

export default function App() {
    // --- STATE MANAGEMENT ---
    const [step, setStep] = useState('form'); // 'form', 'loading', 'preview', 'cover', 'confirm'
    const [storyInputs, setStoryInputs] = useState({});
    const [storyData, setStoryData] = useState([]);
    const [storyTitle, setStoryTitle] = useState('');

    // --- LOGIC ---
    const generateStory = ({ childName, mainCharacter }) => {
        const title = `${mainCharacter}'s Magical Adventure`;
        setStoryTitle(title);
        setStoryData([
            { text: `In a cozy, sun-dappled forest, lived a ${mainCharacter} named Squeaky. Squeaky was known for his fluffy tail and his love for adventure.`, imgPrompt: "A cute, brave squirrel in a whimsical watercolor style, in a sun-dappled forest." },
            { text: `One day, Squeaky heard whispers of a magical, glowing acorn that could make flowers bloom even in winter. \"I must find it for my friend ${childName}!\" he chirped.`, imgPrompt: "The squirrel looking determined, with a thought bubble of a glowing acorn and flowers." },
            { text: `His journey began at the Babbling Brook. With a leap of faith, he crossed a rickety rope bridge, his heart thumping with excitement.`, imgPrompt: "The squirrel carefully crossing a rope bridge over a sparkling stream. Whimsical watercolor." },
            { text: `Deep in the Whispering Woods, he met a wise old owl who gave him a clue. \"The acorn rests where the moonlight touches the oldest tree,\" hooted the owl.`, imgPrompt: "A wise, friendly owl on a branch talking to the small squirrel at night. Watercolor style." },
            { text: `Finally, Squeaky found it! In a clearing, bathed in moonlight, the magical acorn glowed softly. It was more beautiful than he ever imagined.`, imgPrompt: "The squirrel looking in awe at a single, glowing acorn at the base of a huge, ancient tree. Moonlight." },
            { text: `He brought the acorn back and showed ${childName}. As they planted it, the clearing filled with glowing flowers, and the forest celebrated Squeaky's brave heart.`, imgPrompt: `The squirrel and a happy child (${childName}) watching colorful, glowing flowers bloom around them. Magical watercolor.` }
        ]);
    };
    
    const handleFormComplete = () => {
        setStep('loading');
        setTimeout(() => {
            generateStory(storyInputs);
            setStep('preview');
        }, 3500);
    };
    
    const handleStartOver = () => {
        setStoryInputs({});
        setStoryData([]);
        setStoryTitle('');
        setStep('form');
    };

    // --- RENDER LOGIC ---
    const renderStep = () => {
        switch (step) {
            case 'form':
                return <StoryForm setStoryInputs={setStoryInputs} onComplete={handleFormComplete} />;
            case 'loading':
                return <LoadingIndicator />;
            case 'preview':
                return <StoryPreview storyData={storyData} storyInputs={storyInputs} onComplete={() => setStep('cover')} />;
            case 'cover':
                return <CoverSelection storyTitle={storyTitle} onComplete={() => setStep('confirm')} />;
            case 'confirm':
                return <Confirmation storyTitle={storyTitle} onStartOver={handleStartOver} />;
            default:
                return <StoryForm setStoryInputs={setStoryInputs} onComplete={handleFormComplete} />;
        }
    };

    return (
        <>
            <style>{`
                body { font-family: 'Inter', sans-serif; background-color: #f7fafc; }
                .pacifico { font-family: 'Pacifico', cursive; }
                .storybook-page {
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 1rem;
                }
            `}</style>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <Header />
                    {renderStep()}
                </div>
            </div>
        </>
    );
}

