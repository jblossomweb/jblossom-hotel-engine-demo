import './enzyme-adapter';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { Stories, mockKnobs } from './story-builder';

export interface MountedStory {
  wrapper: ReactWrapper;
  component: ReactWrapper;
  props: any;
  elements: { [key: string]: ReactWrapper };
}

const storyMounter = (
  stories: Stories,
  mainComponent: React.Component<any> | React.FC<any>,
  getElements?: (component: ReactWrapper) => MountedStory['elements'],
  mountShallow?: boolean
) => {
  const mountedStories: { [key: string]: MountedStory } = {};
  // tslint:disable-next-line: ban-types
  const mounter: Function = mountShallow ? shallow : mount;
  Object.keys(stories).forEach((key: string) => {
    const story = stories[key];
    const wrapper: ReactWrapper = mounter(story(mockKnobs));
    const component: ReactWrapper = wrapper.find(mainComponent);
    const props = component.props();
    const elements = getElements ? getElements(component) : {};
    mountedStories[key] = {
      wrapper,
      component,
      props,
      elements,
    };
  });
  return mountedStories;
};

export default storyMounter;
