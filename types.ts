export interface Features {
  title: string;
  description: string;
  icon?: JSX.Element;
}

export interface Session {
  user?: User;
  expires?: string;
  referenceId?: number;
}
export interface FolderType {
  name: string;
  links: LinkType[];
  icon: string;
  selected: boolean;
  createdToday: boolean;
  pinned: boolean;
  _id: number;
  createdAt: number;
}
export interface LinkType {
  _id: number;
  url: string;
  name: string;
  pinned: boolean;
  selected: boolean;
  createdToday: boolean;
  createdAt: number;
}
export interface User {
  links: LinkType[];
  folders: FolderType[];
}
