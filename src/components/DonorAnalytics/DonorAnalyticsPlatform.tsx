import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { Dashboard } from './AIDonorDashboard';
import { SecurityInfo } from './SecurityInfo';
import { EconomicIndicators } from './EconomicIndicators';
import { DataManagement } from './DataManagement';
import { AllDonorsDirectory } from './AllDonorsDirectory';
import { DataStorage } from '../../utils/dataStorage';
import { DonorAnalytics } from '../../utils/analytics';
import { DonorData, AnalysisResult } from '../../types';
import { DonorDataSyncService } from '../../Services/donorDataSyncService';
import { BarChart3, Shield, TrendingUp, Upload, Database, Users } from 'lucide-react';

function DonorAnalyticsPlatform() {
  const [donorData, setDonorData] = useState<DonorData[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard' | 'security' | 'economic' | 'data' | 'donors'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Load existing data on component mount
  React.useEffect(() => {
    loadAndSyncData();
  }, []);

  const loadAndSyncData = async () => {
    setIsLoading(true);
    setSyncStatus('Loading existing data...');
    
    // Load existing data from local storage
    const existingData = DataStorage.loadData();
    
    // Check for new donor data documents to sync
    setSyncStatus('Checking for new donor data documents...');
    const syncResult = await DonorDataSyncService.syncDonorDataFromDocuments();
    
    if (syncResult.success && syncResult.processedCount > 0) {
      setSyncStatus(`Synced ${syncResult.processedCount} new document(s) with ${syncResult.totalDonorsAdded} donor records`);
      
      // Reload data after sync
      const updatedData = DataStorage.loadData();
      setDonorData(updatedData);
      
      if (updatedData.length > 0) {
        const analysisResult = DonorAnalytics.analyzeData(updatedData);
        setAnalysis(analysisResult);
        setActiveTab('dashboard');
      }
    } else if (syncResult.error) {
      setSyncStatus(`Sync error: ${syncResult.error}`);
      // Still load existing data even if sync failed
      setDonorData(existingData);
      if (existingData.length > 0) {
        const analysisResult = DonorAnalytics.analyzeData(existingData);
        setAnalysis(analysisResult);
        setActiveTab('dashboard');
      }
    } else {
      setSyncStatus(null);
      setDonorData(existingData);
      if (existingData.length > 0) {
        const analysisResult = DonorAnalytics.analyzeData(existingData);
        setAnalysis(analysisResult);
        setActiveTab('dashboard');
      }
    }
    
    setIsLoading(false);
    
    // Clear sync status after 5 seconds
    if (syncResult.success && syncResult.processedCount > 0) {
      setTimeout(() => setSyncStatus(null), 5000);
    }
  };

  const handleManualSync = async () => {
    setIsLoading(true);
    setSyncStatus('Manually syncing donor data...');
    
    const syncResult = await DonorDataSyncService.syncDonorDataFromDocuments();
    
    if (syncResult.success) {
      if (syncResult.processedCount > 0) {
        setSyncStatus(`Successfully synced ${syncResult.processedCount} document(s) with ${syncResult.totalDonorsAdded} new donor records`);
        
        // Reload data
        const updatedData = DataStorage.loadData();
        setDonorData(updatedData);
        const analysisResult = DonorAnalytics.analyzeData(updatedData);
        setAnalysis(analysisResult);
      } else {
        setSyncStatus('No new donor data documents found to sync');
      }
    } else {
      setSyncStatus(`Sync failed: ${syncResult.error}`);
    }
    
    setIsLoading(false);
    setTimeout(() => setSyncStatus(null), 5000);
  };
  const handleDataLoaded = (data: DonorData[]) => {
    setIsLoading(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      // Merge new data with existing data
      const existingData = DataStorage.loadData();
      const mergedData = DataStorage.mergeNewData(existingData, data);
      
      // Save merged data
      DataStorage.saveData(mergedData);
      DataStorage.saveUploadHistory(data.length, mergedData.length);
      
      // Update state
      setDonorData(mergedData);
      const analysisResult = DonorAnalytics.analyzeData(mergedData);
      setAnalysis(analysisResult);
      setActiveTab('dashboard');
      setIsLoading(false);
    }, 1000);
  };

  const handleDataCleared = () => {
    setDonorData([]);
    setAnalysis(null);
    setActiveTab('upload');
  };

  const tabs = [
    { id: 'upload', label: 'Upload Data', icon: <Upload className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'donors', label: 'All Donors', icon: <Users className="w-4 h-4" /> },
    { id: 'data', label: 'Data Management', icon: <Database className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'economic', label: 'Economic Insights', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Sync Status Banner */}
        {syncStatus && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-600" />
              <p className="text-blue-800 font-medium">{syncStatus}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-lg text-gray-600">
              {syncStatus || 'Analyzing donor data...'}
            </span>
          </div>
        )}

        {!isLoading && (
          <>
            {activeTab === 'upload' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {donorData.length > 0 ? 'Add More Donor Data' : 'Upload Your Donor Data'}
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {donorData.length > 0 
                      ? `Add new donation records to your existing database of ${donorData.length} donors. New data will be merged with existing records.`
                      : 'Import your donor database to unlock powerful insights about giving patterns, retention rates, and future fundraising opportunities. You can also upload donor data through the main document center using the "Donor Data" category.'
                    }
                  </p>
                </div>
                <FileUpload onDataLoaded={handleDataLoaded} isLoading={isLoading} />
                
                {donorData.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-green-800 text-center">
                      {donorData.length} donors with {donorData.reduce((sum, donor) => sum + donor.donationCount, 0)} total donations
                    </p>
                  </div>
                )}
                
                {/* Sync from Document Center */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Sync from Document Center</h3>
                      <p className="text-sm text-gray-600">
                        Import donor data files uploaded through Adminizer's main document center
                      </p>
                    </div>
                    <button
                      onClick={handleManualSync}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <Database className="w-4 h-4" />
                      <span>Sync Now</span>
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Upload className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">How it works:</h4>
                        <ul className="mt-1 text-sm text-blue-800 space-y-1">
                          <li>• Upload CSV files through the main document center with category "Donor Data"</li>
                          <li>• Files are automatically detected and processed for analytics</li>
                          <li>• Data is merged with your existing donor database</li>
                          <li>• Click "Sync Now" to manually check for new uploads</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )}

            {activeTab === 'dashboard' && analysis && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Donor Analytics Dashboard
                  </h2>
                  <p className="text-gray-600">
                    Comprehensive insights from {donorData.length} donor records
                  </p>
                </div>
                <Dashboard analysis={analysis} donorData={donorData} />
              </div>
            )}

            {activeTab === 'donors' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    All Donors Directory
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Complete directory of all {donorData.length} donors, organized by total giving amount. 
                    View detailed donor profiles and giving history.
                  </p>
                </div>
                <AllDonorsDirectory donors={donorData} />
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Data Management
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Manage your donor database, view upload history, and export data for backup or analysis.
                  </p>
                </div>
                <DataManagement donorData={donorData} onDataCleared={handleDataCleared} />
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Security & Compliance
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Essential security measures and compliance requirements for protecting 
                    sensitive donor information.
                  </p>
                </div>
                <SecurityInfo />
              </div>
            )}

            {activeTab === 'economic' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Economic Market Insights
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Leverage economic indicators to optimize fundraising timing and 
                    improve donation forecasting accuracy.
                  </p>
                </div>
                <EconomicIndicators />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default DonorAnalyticsPlatform;