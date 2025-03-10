import axios from 'axios';
import * as UrlService from '../services/urlService';
import { IUrl } from '../models/urlModel';

export const startMonitoring = async () => {
  console.log('Starting server monitoring...');
  
  await checkAllServers();
  
  setInterval(async () => {
    console.log('Running status check for all servers...');
    await checkAllServers();
  }, 5 * 60 * 1000);
};

async function checkAllServers() {
  try {
    const servers: IUrl[] = await UrlService.getAllUrls();
    
    servers.map(async (server) => {
      const isAlive = await checkIfSiteIsAlive(server.url);
      updateSiteStatus(server.id, isAlive);
    });
  } catch (error) {
    console.error('Error checking server status:', error);
  }
}

async function checkIfSiteIsAlive(url: string) {
  try {
    const response = await axios.get(url, { 
      timeout: 30000
    });
    
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    console.error(`Error checking ${url}:`, error);
    return false;
  }
}

async function updateSiteStatus(serverId: string, isAlive: boolean) {
  await UrlService.updateStatus(serverId, isAlive);
}