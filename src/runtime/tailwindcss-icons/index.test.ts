import { test, expect } from 'vitest'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import { getIconCollections, iconsPlugin } from '.'

test('main', () => {
  const result = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-tabler-plus"><i class="i-mdi-home"></i></span>',
            extension: 'html',
          },
        ],
        plugins: [
          iconsPlugin({
            collections: getIconCollections(['mdi', 'tabler']),
          }),
        ],
      },
    }),
  ]).process(`
@tailwind components;

.foo {
    @apply i-mdi-home;
}

.bar {
    @apply i-mdi-house;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    ".i-mdi-home {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\");

        vertical-align: middle
    }

    .i-tabler-plus {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 5v14m-7-7h14'/%3E%3C/svg%3E\\");

        vertical-align: middle
    }

    .foo {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\");

        vertical-align: middle
    }

    .bar {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\");

        vertical-align: middle
    }
    "
  `)
})

test('custom icon', () => {
  const result = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-foo-home"></span>',
            extension: 'html',
          },
        ],
        plugins: [
          iconsPlugin({
            collections: {
              foo: {
                icons: {
                  'arrow-left': {
                    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>',
                    width: 20,
                    height: 20,
                  },
                },
              },
            },
          }),
        ],
      },
    }),
  ]).process(`
.foo {
  @apply i-foo-arrow-left;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    "
    .foo {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E\\");
        vertical-align: middle
    }
    "
  `)
})

test('set collection automatically', () => {
  const processor = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '',
            extension: 'html',
          },
        ],
        plugins: [iconsPlugin()],
      },
    }),
  ])

  const result = processor.process(`
.foo {
  @apply i-heroicons-arrow-left;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    "
    .foo {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E\\");
        vertical-align: middle
    }
    "
  `)

  expect(() => {
    processor.process(`
  .foo {
    @apply i-ph-house;
  }
  `).css
  }).toThrowErrorMatchingInlineSnapshot(
    '"<css input>:3:5: The `i-ph-house` class does not exist. If `i-ph-house` is a custom class, make sure it is defined within a `@layer` directive."'
  )
})

test('load custom json', () => {
  const processor = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-custom-icon1"></span>',
            extension: 'html',
          },
        ],
        plugins: [
          iconsPlugin({
            customCollections: [
              '../../test/custom.json',
              {
                foo: {
                  icons: {
                    'arrow-left': {
                      body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>',
                      width: 20,
                      height: 20,
                    },
                  },
                },
              },
            ],
          }),
        ],
      },
    }),
  ])

  const result = processor.process(`
.foo {
  @apply i-custom-icon1;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    "
    .foo {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z' fill='black' /%3E%3C/svg%3E\\");
        vertical-align: middle
    }
    "
  `)

  const result2 = processor.process(`
.foo {
  @apply i-foo-arrow-left;
}
`)

  expect(result2.css).toMatchInlineSnapshot(`
    "
    .foo {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='20' height='20'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'/%3E%3C/svg%3E\\");
        vertical-align: middle
    }
    "
  `)
})

test('load custom json array', () => {
  const processor = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="i-custom-icon1"></span><div class="i-custom2-icon1"></div>',
            extension: 'html',
          },
        ],
        plugins: [
          iconsPlugin({
            customCollections: [
              '../../test/custom.json',
              '../../test/custom2.json',
            ],
          }),
        ],
      },
    }),
  ])

  const result = processor.process(`
.foo {
  @apply i-custom-icon1;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    "
    .foo {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z' fill='black' /%3E%3C/svg%3E\\");
        vertical-align: middle
    }
    "
  `)

  const result2 = processor.process(`
  .foo {
    @apply i-custom2-icon1;
  }
  `)

  expect(result2.css).toMatchInlineSnapshot(`
    "
      .foo {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M64 32c35.3 0 64 28.7 64 64v32H0V96c0-35.3 28.7-64 64-64zm64 192H0v-64h128v64zm-16 32a239.04 239.04 0 00-34.3 64H0v-64h112zM391.6 86.1l86.4 30.1 6.3 7.7c7.6 9.3 11.7 21 11.7 33 0 23.1-15.2 43.5-37.3 50.2l-27.1 8.1-78.2-41.7c-7.1-3.8-13-9.2-17.3-15.7-4.3 6.5-10.2 11.9-17.3 15.7l-78.2 41.7-27.1-8.1c-22.2-6.6-37.3-27-37.3-50.2 0-12 4.1-23.7 11.7-33l6.3-7.7 86.4-30.1c21.7-7.5 44 1.4 55.6 18.6 11.5-17.3 33.9-26.2 55.6-18.6zM312 232a24 24 0 1148 0 24 24 0 11-48 0zm-8-104a16 16 0 10-32 0 16 16 0 1032 0zm80 16a16 16 0 100-32 16 16 0 100 32z' class='fa-primary'/%3E%3Cpath fill='black' d='M290.7 10.9C304.5 3.8 320 0 336 0s31.5 3.8 45.3 10.9l44.1-9.8c3.2-.7 6.5-1.1 9.7-1.1h1.3c24 0 43.5 19.5 43.5 43.5 0 4.7-.8 9.3-2.2 13.8l-13.8 41.5 14.1 17.4-86.4-30.1c-21.7-7.5-44 1.4-55.6 18.6-11.5-17.3-33.9-26.2-55.6-18.6L194 116.2l14.1-17.3-13.9-41.6c-1.5-4.4-2.2-9.1-2.2-13.8 0-24 19.5-43.5 43.5-43.5h1.3c3.3 0 6.5.4 9.7 1.1l44.1 9.8zm62.7 162.6 78.2 41.7-8.7 2.6c-10.6 3.2-20.6 7.9-29.8 14l-18.8 12.6C362.9 252 349.6 256 336 256c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24c-13.6 0-26.9-4-38.2-11.6L279 231.9c-9.2-6.1-19.2-10.9-29.8-14l-8.7-2.6 78.2-41.7c7.1-3.8 13-9.2 17.3-15.7 4.3 6.5 10.2 11.9 17.3 15.7zm-94.6-137-19.1-4.2c-.9-.2-1.8-.3-2.8-.3h-1.3c-6.4 0-11.5 5.2-11.5 11.5 0 1.2.2 2.5.6 3.6l7.3 22.3L258.4 37l.3-.4zM440 69.4l7.4-22.2c.4-1.2.6-2.4.6-3.6 0-6.4-5.2-11.5-11.5-11.5h-1.3c-.9 0-1.9.1-2.8.3l-19.1 4.2.3.4L440 69.4zM96 400c0-70.6 35.2-133.1 89.1-170.7 5.9 3.5 12.3 6.4 19.1 8.4l35.8 10.8c7.5 2.3 14.7 5.6 21.3 10l18.8 12.6c16.6 11 36 16.9 55.9 16.9s39.4-5.9 55.9-16.9l18.8-12.6c5.8-3.9 12.1-7 18.7-9.2 11.7 9.3 18.5 23.4 18.5 38.3 0 15.4-7.2 29.9-19.5 39.1l-38.1 28.5c-7.1 5.3-8.5 15.3-3.2 22.4s15.3 8.5 22.4 3.2l6.5-4.8v72h16c26.4 0 47.8 21.3 48 47.6V512H352v-16c0-44.2-35.8-80-80-80h-32c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c26.5 0 48 21.5 48 48v16H112C50.1 512 0 461.9 0 400v-80h77.7C68.8 345 64 371.9 64 400c0 8.8 7.2 16 16 16s16-7.2 16-16zM0 256v-32h128v12.8c-5.7 6.1-11 12.5-16 19.2H0zm128-96H0v-32h128v32zm351.5 136.4c0-.4.1-.8.1-1.3l.3.9-.5.4zm-183.7 85.3c7.6 4.5 17.4 2.1 22-5.5s2.1-17.4-5.5-21.9l-80-48c-7.6-4.5-17.4-2.1-22 5.5s-2.1 17.4 5.5 22l80 48z' opacity='.4'/%3E%3C/svg%3E\\");
        vertical-align: middle
    }
      "
  `)
})

test('no prefix', () => {
  const result = postcss([
    tailwindcss({
      config: {
        content: [
          {
            raw: '<span class="tabler-home"><i class="mdi-home"></i></span>',
            extension: 'html',
          },
        ],
        plugins: [
          iconsPlugin({
            prefix: '',
            collections: getIconCollections(['mdi', 'tabler']),
          }),
        ],
      },
    }),
  ]).process(`
@tailwind components;

.foo {
    @apply mdi-home;
}

.bar {
    @apply mdi-house;
}
`)

  expect(result.css).toMatchInlineSnapshot(`
    ".mdi-home {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\");

        vertical-align: middle
    }

    .tabler-home {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cg fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6'/%3E%3C/g%3E%3C/svg%3E\\");

        vertical-align: middle
    }

    .foo {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\");

        vertical-align: middle
    }

    .bar {

        display: inline-block;

        width: 1em;

        height: 1em;

        background-color: currentColor;

        -webkit-mask-image: var(--svg);

        mask-image: var(--svg);

        -webkit-mask-repeat: no-repeat;

        mask-repeat: no-repeat;

        -webkit-mask-size: 100% 100%;

        mask-size: 100% 100%;

        --svg: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z'/%3E%3C/svg%3E\\");

        vertical-align: middle
    }
    "
  `)
})
