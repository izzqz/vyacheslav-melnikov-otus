class Counter {
  static files = 0;
  static directories = 0;

  static plusDirectory() {
    Counter.directories++;
  }

  static plusFile() {
    Counter.files++;
  }
}

module.exports = Counter;