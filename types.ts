import { User } from "next-auth";
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
