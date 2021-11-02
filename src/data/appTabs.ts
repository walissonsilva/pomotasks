export type IAppTab = {
  title: string;
  url: string;
};

export const appTabs: IAppTab[] = [
  { title: "Today", url: "/" },
  { title: "History", url: "/history" },
];
