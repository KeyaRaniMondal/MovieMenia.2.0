import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";

const faqs = [
  {
    question: "How do I search for a movie or TV show?",
    answer: "Use the search bar in the top navigation to find any movie or TV show instantly.",
  },
  {
    question: "How do I get AI movie recommendations?",
    answer: "Click the \"Get AI Movie Picks\" button in the navbar and answer a few questions to get personalized recommendations.",
  },
  {
    question: "Why is a movie not loading?",
    answer: "Movie data is provided by TMDB. If something fails to load, refresh the page or try again later.",
  },
  {
    question: "How do I log out?",
    answer: "Click your profile avatar in the navbar and select \"Log out\".",
  },
];

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--ink)] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-10 h-10 text-[#e50914]" />
          <h1 className="text-3xl font-bold">Help Center</h1>
        </div>

        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-10">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)]">
              <h3 className="font-semibold text-[var(--ink)] mb-2">{faq.question}</h3>
              <p className="text-[var(--muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)] flex flex-col items-center text-center gap-2">
            <MessageCircle className="w-8 h-8 text-[#e50914]" />
            <p className="font-semibold">Live Chat</p>
            <p className="text-[var(--muted)] text-sm">Available 24/7</p>
          </div>
          <div className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)] flex flex-col items-center text-center gap-2">
            <Mail className="w-8 h-8 text-[#e50914]" />
            <p className="font-semibold">Email</p>
            <p className="text-[var(--muted)] text-sm">support@moviemenia.com</p>
          </div>
          <div className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)] flex flex-col items-center text-center gap-2">
            <Phone className="w-8 h-8 text-[#e50914]" />
            <p className="font-semibold">Phone</p>
            <p className="text-[var(--muted)] text-sm">1-800-MOVIES</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
