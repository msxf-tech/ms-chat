import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['core', 'vue', 'react', 'global']],
    'scope-empty': [2, 'never'],
  },
};

export default Configuration;
