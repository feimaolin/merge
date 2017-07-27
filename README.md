# Deep merge 
Recursively deep merge two or more objects.

```js
merge(Boolean isExtend, Function arrayMerge, Object firstObj, ... Object) => Object
```

Return the merged object.

 * If `isExtend` is true, the content of following objects are merged to the first object.
 * `arrayMerge` function determined how array is merged. By default, object value is merged and primative value is replaced  based on position.
 * `firstObj` - The first object to merge.
 * `{...Object}` - Object(s) to merge into the previous one.

 
