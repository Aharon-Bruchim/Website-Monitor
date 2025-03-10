export interface Website {
  id: string;
  url: string;
  name: string;
  is_online: boolean;
  last_checked: string;
  created_at: string;
  check_interval: number;
}