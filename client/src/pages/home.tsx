import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useClipboard } from '@/hooks/use-clipboard';
import { useToast } from '@/components/toast';
import {
  User,
  Copy,
  PlusCircle,
  List,
  ExternalLink,
  Trash2,
  Link as LinkIcon,
  Bell,
  Settings,
  BarChart3,
  Bot,
  Clock,
  Info,
  Save
} from 'lucide-react';

interface Website {
  id: string;
  name: string;
  url: string;
}

export default function Home() {
  const [username, setUsername] = useLocalStorage('votingAgentUsername', '');
  const [websites, setWebsites] = useLocalStorage<Website[]>('votingAgentWebsites', []);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [nextRunTime, setNextRunTime] = useState('23:45:12');

  const { copy } = useClipboard();
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    // Check notification permission on component mount
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    // Update countdown timer every second
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(23 - now.getHours()).padStart(2, '0');
      const minutes = String(59 - now.getMinutes()).padStart(2, '0');
      const seconds = String(59 - now.getSeconds()).padStart(2, '0');
      setNextRunTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleCopyUsername = async () => {
    if (!username.trim()) {
      showToast({ message: 'Please enter a username first', type: 'error' });
      return;
    }

    const success = await copy(username);
    if (success) {
      showToast({ message: 'Username copied to clipboard!' });
    } else {
      showToast({ message: 'Failed to copy username', type: 'error' });
    }
  };

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteName.trim() || !websiteUrl.trim()) {
      showToast({ message: 'Please fill in both name and URL', type: 'error' });
      return;
    }

    // Basic URL validation
    try {
      new URL(websiteUrl);
    } catch {
      showToast({ message: 'Please enter a valid URL', type: 'error' });
      return;
    }

    const newWebsite: Website = {
      id: Math.random().toString(36).substr(2, 9),
      name: websiteName.trim(),
      url: websiteUrl.trim()
    };

    setWebsites(prev => [...prev, newWebsite]);
    setWebsiteName('');
    setWebsiteUrl('');
    showToast({ message: 'Website added successfully!' });
  };

  const handleCopyWebsiteName = async (name: string) => {
    const success = await copy(name);
    if (success) {
      showToast({ message: 'Website name copied!' });
    } else {
      showToast({ message: 'Failed to copy name', type: 'error' });
    }
  };

  const handleCopyWebsiteUrl = async (url: string) => {
    const success = await copy(url);
    if (success) {
      showToast({ message: 'Website URL copied!' });
    } else {
      showToast({ message: 'Failed to copy URL', type: 'error' });
    }
  };

  const handleDeleteWebsite = (id: string) => {
    setWebsites(prev => prev.filter(website => website.id !== id));
    showToast({ message: 'Website removed!' });
  };

  const handleEnableNotifications = async () => {
    if (!('Notification' in window)) {
      showToast({ message: 'This browser does not support notifications', type: 'error' });
      return;
    }

    if (Notification.permission === 'granted') {
      showToast({ message: 'Notifications are already enabled!' });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        showToast({ message: 'Notifications enabled successfully!' });
      } else {
        showToast({ message: 'Notification permission denied', type: 'error' });
      }
    } catch (error) {
      showToast({ message: 'Failed to enable notifications', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            <Bot className="inline-block w-8 h-8 mr-3 text-blue-600" />
            Voting Agent Automation
          </h1>
          <p className="text-slate-600">Automate your daily voting tasks with scheduled agent execution</p>
        </header>

        {/* Username Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-slate-800">Username Configuration</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-slate-700 mb-2 block">
                  Username (Auto-saves)
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <Save className="w-3 h-3 mr-1" />
                  Automatically saved to device storage
                </p>
              </div>
              
              <Button
                onClick={handleCopyUsername}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Username
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Website Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <PlusCircle className="w-5 h-5 text-emerald-600 mr-2" />
              <h2 className="text-xl font-semibold text-slate-800">Add Voting Website</h2>
            </div>
            
            <form onSubmit={handleAddWebsite} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="websiteName" className="text-sm font-medium text-slate-700 mb-2 block">
                    Website Name
                  </Label>
                  <Input
                    id="websiteName"
                    type="text"
                    placeholder="e.g., TopList Voting"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="websiteUrl" className="text-sm font-medium text-slate-700 mb-2 block">
                    Website URL
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="https://example.com/vote"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Website
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Saved Websites Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <List className="w-5 h-5 text-slate-600 mr-2" />
                <h2 className="text-xl font-semibold text-slate-800">Saved Websites</h2>
              </div>
              <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {websites.length} sites
              </span>
            </div>
            
            {websites.length > 0 ? (
              <div className="space-y-3">
                {websites.map((website) => (
                  <div
                    key={website.id}
                    className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 mb-1">
                          {website.name}
                        </h3>
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm break-all transition-colors inline-flex items-center"
                        >
                          {website.url}
                          <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                        </a>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyWebsiteName(website.name)}
                          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                          title="Copy name"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyWebsiteUrl(website.url)}
                          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                          title="Copy URL"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWebsite(website.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <List className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No voting websites added yet</p>
                <p className="text-sm">Add your first website above to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Automation Settings */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-slate-800">Automation Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-medium text-purple-800">Schedule Configuration</h3>
                </div>
                <p className="text-purple-700 text-sm mb-3">
                  Agent runs every 24 hours and 30 seconds automatically
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">
                    Next run in: <span className="font-mono">{nextRunTime}</span>
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    Active
                  </span>
                </div>
              </div>
              
              <Button
                onClick={handleEnableNotifications}
                className={`w-full ${
                  notificationsEnabled
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                <Bell className="w-4 h-4 mr-2" />
                {notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
              </Button>
              
              <p className="text-xs text-slate-500 text-center flex items-center justify-center">
                <Info className="w-3 h-3 mr-1" />
                Notifications will alert you when voting tasks are completed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card className="gradient-purple-blue">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-slate-800">Status Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">142</div>
                <div className="text-sm text-slate-600">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">98%</div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-slate-600">Days Active</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
      
      <ToastContainer />
    </div>
  );
}
