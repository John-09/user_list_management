interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const filterUsers = (users: User[], searchText: string) => {
  const lowerSearch = searchText.toLowerCase();
  return users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(lowerSearch) ||
      u.last_name.toLowerCase().includes(lowerSearch) ||
      u.email.toLowerCase().includes(lowerSearch)
  );
};
