try {
  throw new Error('Something happened');
} catch (lexical) {
  // Ignore error
}
