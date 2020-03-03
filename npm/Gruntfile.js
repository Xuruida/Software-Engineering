// eslint-disable-next-line no-undef
module.exports = function (grunt) {
  grunt.initConfig({
    htmllint: {
      lab1: {
        options: {
          force: false,
          plugins: [],
          /* htmllint options go here */
        },
        src: [
          '../projects/lab1/PB17000209/index.html'
        ]
      },
      lab2: {
        options: {
          force: false,
          plugins: [],
          /* htmllint options go here */
        },
        src: [
          '../projects/lab2/PB17000209/index.html'
        ]
      },
    }
  });

  grunt.loadNpmTasks('grunt-htmllint');
  grunt.registerTask('lab1', ['htmllint:lab1']);
  grunt.registerTask('lab2', ['htmllint:lab2']);
};