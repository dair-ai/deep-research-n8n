import { useState } from "react";
import { Clock, Eye, Code, Copy, Download, Share, AlertTriangle, RotateCcw, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SearchResponse } from "@shared/schema";

interface SearchResultsProps {
  results: SearchResponse | null;
  query: string;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onCopySuccess: () => void;
}

export function SearchResults({ 
  results, 
  query, 
  isLoading, 
  error, 
  onRetry,
  onCopySuccess
}: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState("formatted");

  if (isLoading) {
    return (
      <section className="mt-12">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Settings className="h-8 w-8 text-blue-600 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Researching your query...</h3>
          <p className="text-gray-600">This may take a few moments while we gather comprehensive insights.</p>
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-12">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  const result = results[0];
  const timestamp = new Date().toLocaleString();

  const handleCopy = async () => {
    try {
      const content = activeTab === "formatted" 
        ? result.output_html || result.output
        : result.output;
      
      await navigator.clipboard.writeText(content);
      onCopySuccess();
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <section className="mt-12 animate-fade-in">
      {/* Query Display */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Search className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Research Query</span>
        </div>
        <p className="text-blue-900 font-medium">{query}</p>
      </div>

      {/* Results Container */}
      <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <CardHeader className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Research Results</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{timestamp}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="h-auto p-0 bg-transparent rounded-none w-full justify-start">
                <TabsTrigger 
                  value="formatted" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none py-4 px-6"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Formatted View
                </TabsTrigger>
                <TabsTrigger 
                  value="raw"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none py-4 px-6"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Raw Output
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="formatted" className="m-0">
                <div 
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: result.output_html || result.output }}
                />
              </TabsContent>

              <TabsContent value="raw" className="m-0">
                <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
                  {result.output}
                </pre>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Button 
          variant="outline" 
          onClick={handleCopy}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Results
        </Button>
        <Button 
          variant="outline"
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <Button 
          variant="outline"
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <Share className="h-4 w-4 mr-2" />
          Share Results
        </Button>
      </div>
    </section>
  );
}
