## start

```
npm i

npm start
```

the page runs properly;

## trigger the bug

open th app.config.js and alter it;

```js
{
  // before
  config.externals({
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  });

  // after
  config.externals({
    react: 'React',
    'react-dom': 'ReactDOM',
  });  
}
```

save it, and will find the page will not render, and open the debug, you will see:

```
TypeError: Cannot read properties of undefined (reading 'createContext');
```

I found when I use external, the react require way will change，but it is not a esmodule, so it broken；

I don't know the reason why it work on webpack4, but not work on work5
