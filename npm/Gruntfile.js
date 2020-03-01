module.exports = function (grunt) {
    grunt.initConfig({
        htmllint: {
            your_target: {
                options: {
                    force: false,
                    plugins: [],
                    /* htmllint options go here */
                },
                src: [
                    '../projects/lab2/PB17000209/index.html'
                ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-htmllint');
    grunt.registerTask('default', ['htmllint']);
}