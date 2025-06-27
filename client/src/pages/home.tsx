import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Search, Bot, Shield, Zap, Brain } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { Toast, useToastNotification } from "@/components/toast-notification";
import { searchWithWebhook } from "@/lib/search-api";
import type { SearchResponse } from "@shared/schema";

export default function Home() {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [currentQuery, setCurrentQuery] = useState("");
  const { toast, showToast, hideToast } = useToastNotification();

  const searchMutation = useMutation({
    mutationFn: searchWithWebhook,
    onSuccess: (data) => {
      setResults(data);
      showToast("Research completed successfully!", "success");
    },
    onError: (error: Error) => {
      console.error("Search error:", error);
      let errorMessage = "Failed to connect to the research service.";
      
      if (error.message.includes("400")) {
        errorMessage = "Invalid search query. Please try again.";
      } else if (error.message.includes("500")) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your connection.";
      }
      
      showToast(errorMessage, "error");
    },
  });

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    searchMutation.mutate(query);
  };

  const handleRetry = () => {
    if (currentQuery) {
      searchMutation.mutate(currentQuery);
    }
  };

  const handleCopySuccess = () => {
    showToast("Results copied to clipboard!", "success");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Research Assistant</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Bot className="h-4 w-4" />
              <span>Powered by n8n</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchForm 
          onSearch={handleSearch} 
          isLoading={searchMutation.isPending}
        />

        <SearchResults
          results={results}
          query={currentQuery}
          isLoading={searchMutation.isPending}
          error={searchMutation.error?.message || null}
          onRetry={handleRetry}
          onCopySuccess={handleCopySuccess}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">Research Assistant powered by n8n workflow automation</p>
            <div className="flex items-center justify-center space-x-4">
              <span className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Secure</span>
              </span>
              <span className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>Fast</span>
              </span>
              <span className="flex items-center space-x-1">
                <Brain className="h-4 w-4" />
                <span>AI-Powered</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
