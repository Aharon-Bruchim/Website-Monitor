import React from 'react';
import { Trash2, CheckCircle, XCircle, Globe, Clock, Calendar } from 'lucide-react';
import api from '../api/api';
import { Website } from '../types';
import toast from 'react-hot-toast';

interface WebsiteListProps {
  websites: Website[];
  onWebsiteDeleted: () => void;
}

export function WebsiteList({ websites, onWebsiteDeleted }: WebsiteListProps) {
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/${id}`);
      
      toast.success('Website removed');
      onWebsiteDeleted();
    } catch (error) {
      toast.error('Failed to remove website');
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {websites.length > 0 ? (
        websites.map((website) => (
          <div
            key={website.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div 
              className="h-2 w-full"
              style={{
                backgroundColor: website.is_online ? '#10B981' : '#EF4444'
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900">{website.name}</h3>
                  </div>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {website.url}
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(website.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                  title="Remove website"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  {website.is_online ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="font-medium text-green-500">Online</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500" size={20} />
                      <span className="font-medium text-red-500">Offline</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={20} />
                  <span>
                    Last checked: {new Date(website.last_checked).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={20} />
                  <span>
                    Added: {new Date(website.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Globe size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No websites added yet. Add your first website to start monitoring.</p>
        </div>
      )}
    </div>
  );
}