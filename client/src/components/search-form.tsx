import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  "Future of renewable energy",
  "Impact of AI on healthcare", 
  "Blockchain technology trends"
];

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <section className="text-center mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Deep Research Assistant</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enter your research query and let our AI-powered workflow provide comprehensive insights and analysis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask me anything... (e.g., 'Latest developments in quantum computing')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            required
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          <span className="text-gray-500">Try:</span>
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </section>
  );
}
