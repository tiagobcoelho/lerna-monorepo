import React from 'react';
import { Story, Meta } from '@storybook/react'

import { Text, TextProps } from './src/index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default ((): Meta => ({
  title: 'Components/Text',
  component: Text,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}))();



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<TextProps> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  text: "primary"
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "secondary"
};


