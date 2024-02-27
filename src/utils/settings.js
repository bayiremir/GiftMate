import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const BOTTOM_TAB_MENU_EXTRA_WIDTH = 20;
export const TAB_COUNT = 5;

export const settings = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
  BUTTON_HEIGHT: Dimensions.get('window').height / 15,
  BOTTOM_TAB_HEIGHT: SCREEN_HEIGHT * 0.05,
  BOTTOM_TAB_WIDTH: SCREEN_WIDTH / 5,
  BOTTOM_TAB_DEC: BOTTOM_TAB_MENU_EXTRA_WIDTH / (TAB_COUNT - 1),
};
