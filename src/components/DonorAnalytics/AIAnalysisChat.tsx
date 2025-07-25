import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, TrendingUp, BarChart3, Brain } from 'lucide-react';
import { DonorData } from '../../types';
import { formatCurrency } from '../../utils/helpers';

interface AIAnalysisChatProps {
  donorData: DonorData[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  analysis?: {
    data: any[];
    insights: string[];
    recommendations: string[];
  };
}

export const AIAnalysisChat: React.FC<AIAnalysisChatProps> = ({ donorData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI analytics assistant. I can help you analyze your donor data in ways you might not have considered. Try asking me questions like:\n\n• 'How do our donations correlate with local economic conditions?'\n• 'What patterns do you see in our major gift timing?'\n• 'Compare our donor retention with industry benchmarks'\n• 'Analyze seasonal giving patterns and suggest optimal campaign timing'",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI analysis - in production, this would call your AI service
      const aiResponse = await simulateAIAnalysis(inputValue, donorData);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        analysis: aiResponse.analysis
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I encountered an error while analyzing your data. Please try rephrasing your question or contact support if the issue persists.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Analyze our donor retention patterns",
    "Compare giving with economic indicators",
    "Identify optimal campaign timing",
    "Find patterns in major gift donors",
    "Suggest donor segmentation strategies"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Analytics Assistant</h3>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Beta</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Ask me anything about your donor data - I can analyze patterns, correlate with external data, and provide insights.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl rounded-lg p-3 ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && <Bot className="w-4 h-4 mt-0.5 text-blue-600" />}
                {message.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Analysis Results */}
                  {message.analysis && (
                    <div className="mt-3 space-y-3">
                      {message.analysis.insights.length > 0 && (
                        <div className="bg-white rounded-lg p-3 border border-blue-200">
                          <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Key Insights
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {message.analysis.insights.map((insight, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {message.analysis.recommendations.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Recommendations
                          </h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            {message.analysis.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-600 mr-2">→</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-blue-600" />
                <Loader className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">Analyzing your data...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Try these questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(question)}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to analyze your donor data..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Simulate AI analysis - replace with actual AI service call
async function simulateAIAnalysis(query: string, donorData: DonorData[]) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const totalDonors = donorData.length;
  const totalAmount = donorData.reduce((sum, donor) => sum + donor.totalAmount, 0);
  const avgDonation = totalAmount / donorData.reduce((sum, donor) => sum + donor.donationCount, 0);

  // Simple pattern matching for demo - replace with actual AI
  if (query.toLowerCase().includes('retention')) {
    return {
      content: `Based on your donor data analysis, I've identified several key retention patterns:`,
      analysis: {
        data: [],
        insights: [
          `Your donor retention rate is approximately ${((donorData.filter(d => d.donationCount > 1).length / totalDonors) * 100).toFixed(1)}%`,
          `${donorData.filter(d => d.donationFrequency === 'frequent').length} donors (${((donorData.filter(d => d.donationFrequency === 'frequent').length / totalDonors) * 100).toFixed(1)}%) are frequent givers`,
          `Average donor lifetime value is ${formatCurrency(avgDonation * 2.3)}`,
          `Peak retention occurs among donors who give ${formatCurrency(avgDonation * 1.5)} or more per gift`
        ],
        recommendations: [
          'Focus retention efforts on donors who have given 2-3 times (highest conversion potential)',
          'Implement a stewardship program for donors giving above average amounts',
          'Create targeted campaigns for one-time donors within 90 days of their first gift',
          'Develop a major donor cultivation track for frequent givers'
        ]
      }
    };
  }

  if (query.toLowerCase().includes('economic') || query.toLowerCase().includes('correlation')) {
    return {
      content: `I've analyzed your donation patterns against economic indicators and found interesting correlations:`,
      analysis: {
        data: [],
        insights: [
          'Donations show a 0.73 correlation with consumer confidence index',
          'Major gifts (>$1000) increase by 15% during stock market uptrends',
          'Monthly giving drops by 8% during unemployment rate increases',
          'Year-end giving is 23% higher during positive GDP growth quarters'
        ],
        recommendations: [
          'Time major gift campaigns during periods of high consumer confidence',
          'Increase digital outreach during economic uncertainty periods',
          'Plan capital campaigns to coincide with positive economic indicators',
          'Develop recession-proof giving programs focusing on smaller, regular donations'
        ]
      }
    };
  }

  if (query.toLowerCase().includes('timing') || query.toLowerCase().includes('campaign')) {
    return {
      content: `Based on your historical data and external factors, here's my campaign timing analysis:`,
      analysis: {
        data: [],
        insights: [
          'December accounts for 31% of annual donations',
          'Tuesday emails have 18% higher open rates than other days',
          'Campaigns launched during the first week of the month perform 12% better',
          'Spring campaigns (March-May) show highest donor acquisition rates'
        ],
        recommendations: [
          'Launch major campaigns on the first Tuesday of each month',
          'Plan year-end campaigns to start in early November',
          'Focus acquisition campaigns in spring months',
          'Use summer months for donor stewardship and engagement'
        ]
      }
    };
  }

  // Default response
  return {
    content: `I've analyzed your request about "${query}". Here's what I found in your donor data:`,
    analysis: {
      data: [],
      insights: [
        `You have ${totalDonors} total donors with ${formatCurrency(totalAmount)} in total donations`,
        `Average donation amount is ${formatCurrency(avgDonation)}`,
        `${donorData.filter(d => d.donationCount > 1).length} donors have given multiple times`,
        `Your largest donor has contributed ${formatCurrency(Math.max(...donorData.map(d => d.totalAmount)))}`
      ],
      recommendations: [
        'Consider segmenting donors by giving capacity for targeted campaigns',
        'Develop specific retention strategies for multi-gift donors',
        'Create a major donor stewardship program',
        'Implement regular data analysis to track trends over time'
      ]
    }
  };
}