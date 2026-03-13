import { useState } from 'react';
import { Search, HelpCircle, Book, MessageSquare, Video, ExternalLink, ChevronRight, FileText } from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { question: "How is the Trust Score calculated?", answer: "The Trust Score is a composite metric derived from device behavior, patch level, configuration drift, and recent anomaly detections." },
    { question: "What does Quarantine Device do?", answer: "Quarantining a device isolates it on the network at the switch-level, preventing it from communicating with other resources until the isolation is lifted." },
    { question: "Can I export logs to my SIEM?", answer: "Yes. In the Settings page, you can configure Syslog or API forwarding to automatically send device alerts to Splunk, QRadar, or Sentinel." },
    { question: "How do I add a new IoT device?", answer: "Devices are discovered automatically using passive network monitoring. Ensure the device is connected to a monitored VLAN." },
  ];

  return (
    <div className="p-6 fade-in h-full flex flex-col overflow-y-auto max-w-5xl mx-auto w-full">
      
      {/* Hero Section */}
      <div className="glass-panel p-10 mb-8 text-center relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#8B5CF6] via-[#22D3EE] to-[#8B5CF6]"></div>
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#8B5CF6]/20 to-[#22D3EE]/20 flex items-center justify-center mb-6">
          <HelpCircle size={32} className="text-[#22D3EE]" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">How can we help you?</h1>
        <div className="relative w-full max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search for documentation, FAQs, or troubleshooting guides..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] outline-none shadow-lg transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Quick Links */}
        <div className="glass-panel p-6 hover:bg-black/20 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary group-hover:scale-110 transition-transform">
              <Book size={24} className="text-[#8B5CF6]" />
            </div>
            <h3 className="text-lg font-bold">Documentation</h3>
          </div>
          <p className="text-sm text-gray-400">Detailed guides on configuring and managing your DriftPulse dashboard.</p>
        </div>

        <div className="glass-panel p-6 hover:bg-black/20 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#22D3EE]/10 rounded-lg text-[#22D3EE] group-hover:scale-110 transition-transform">
              <Video size={24} />
            </div>
            <h3 className="text-lg font-bold">Video Tutorials</h3>
          </div>
          <p className="text-sm text-gray-400">Step-by-step visual guides on setting up advanced anomaly detection.</p>
        </div>

        <div className="glass-panel p-6 hover:bg-black/20 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#FACC15]/10 rounded-lg text-[#FACC15] group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold">Community Forum</h3>
          </div>
          <p className="text-sm text-gray-400">Connect with other security engineers, ask questions, and share custom rules.</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        
        {/* FAQs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <HelpCircle size={20} className="text-[#22D3EE]" />
              Frequently Asked Questions
            </h2>
            <button className="text-sm text-[#22D3EE] hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-panel p-5">
                <h4 className="font-bold text-white mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources & Support */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-brand-primary" />
              Popular Articles
            </h2>
            <div className="space-y-1">
              {['Configuring Custom Alert Thresholds', 'Understanding Anomaly Baselines', 'Integrating with Active Directory', 'Exporting Compliance Reports'].map((article, i) => (
                <a key={i} href="#" className="flex items-center justify-between p-3 rounded hover:bg-white/5 text-sm text-gray-300 transition-colors group">
                  <span>{article}</span>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 bg-linear-to-br from-[#1E1B4B]/80 to-transparent border-[#8B5CF6]/30 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Still need help?</h2>
              <p className="text-sm text-gray-300 mb-6">Our dedicated enterprise support team is available 24/7 to assist you with critical issues.</p>
              <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                <MessageSquare size={16} />
                Contact Support
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 text-[#8B5CF6] opacity-10">
              <HelpCircle size={150} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
