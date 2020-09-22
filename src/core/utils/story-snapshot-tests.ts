import renderer from 'react-test-renderer';
import { Story, Stories, mockKnobs } from './story-builder';

export const renderTree = (story: Story) =>
  renderer.create(story(mockKnobs)).toJSON();

const snapshotTests = (stories: Stories) => {
  Object.keys(stories).forEach((key: string) => {
    const story = stories[key];
    describe(key, () => {
      it('matches snapshot', () => {
        const tree = renderTree(story);
        expect(tree).toMatchSnapshot();
      });
    });
  });
};

export default snapshotTests;
