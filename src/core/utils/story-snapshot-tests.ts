import renderer from 'react-test-renderer';
import { Story, Stories, mockKnobs } from './story-builder';

export const renderTree = (story: Story, classesWithRefs?: string[]) =>
  renderer
    .create(story(mockKnobs), {
      createNodeMock: (element) => {
        // optional workaround for known bug with react-test-renderer and refs
        if (classesWithRefs?.includes(element.props.className)) {
          return {
            scrollWidth: 0,
          };
        }
        return null;
      },
    })
    .toJSON();

const snapshotTests = (stories: Stories, classesWithRefs?: string[]) => {
  Object.keys(stories).forEach((key: string) => {
    const story = stories[key];
    describe(`${key} story`, () => {
      it('matches snapshot', () => {
        const tree = renderTree(story, classesWithRefs);
        expect(tree).toMatchSnapshot();
      });
    });
  });
};

export default snapshotTests;
