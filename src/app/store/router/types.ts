export interface RouterState {
  location: {
    pathname: string;
    search: string;
    hash: string;
    key: string;
    query: { [key: string]: string };
  };
  action: string;
}
