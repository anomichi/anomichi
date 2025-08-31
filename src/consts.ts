// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'あの日走った道の名前を僕達はまだ知らない。';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const TAGS = ['pentax-kf', 'iphone13mini', 'nc750x'] as const;
export const TAG_MAP: {[key in typeof TAGS[number]]: string} = {
  'pentax-kf': 'PENTAX KF',
  'iphone13mini': 'iPhone 13 Mini',
  'nc750x': 'NC750X',
} as const;
