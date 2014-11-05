function hello() {
  var lexical = 'hello';
  let block = 'world';

  return {
    lexical: lexical,
    block: block
  };
}
