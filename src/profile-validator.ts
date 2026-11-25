// Typed profile validator.
// API responses often leave out optional fields. This reads them safely
// and reports false instead of crashing when something is missing.

type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

// One user with notifications set
const userWithNotifications: UserProfile = {
  id: 1,
  username: 'alice',
  settings: { notifications: true },
};

// One user with no settings at all
const userWithoutSettings: UserProfile = {
  id: 2,
  username: 'bob',
};

// One user with settings but no notifications field
const userWithEmptySettings: UserProfile = {
  id: 3,
  username: 'carol',
  settings: {},
};

// One user who turned notifications off on purpose
const userWithNotificationsOff: UserProfile = {
  id: 4,
  username: 'dave',
  settings: { notifications: false },
};

// ?. stops safely when settings is missing.
// ?? falls back to false when the value is undefined or null.
function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

const users: UserProfile[] = [
  userWithNotifications,
  userWithoutSettings,
  userWithEmptySettings,
  userWithNotificationsOff,
];

for (const user of users) {
  console.log(`User ${user.id} (${user.username}): notified = ${isNotified(user)}`);
}

export {};
