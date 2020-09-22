export const rootPath = 'repos';

const paths = {
  repos: () => ['repos'],
  repo: (fullName: string) => ['repos', fullName],
  loading: () => ['loading'],
  error: () => ['error'],
};

export default paths;
