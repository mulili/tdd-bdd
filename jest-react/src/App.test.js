import React from 'react';
// import { render } from '@testing-library/react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

test('renders hello world', () => {
  // const { getByText } = render(<App />);
  // const content = getByText(/hello,world/i);
  // expect(content).toBeInTheDocument();

  // shallow 只渲染<App/>组件本身，不关心<App/>的子组件
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toExist();
});
