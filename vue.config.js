const { defineConfig } = require('@vue/cli-service');
module.exports = {
    ...defineConfig({
        transpileDependencies: true,
    }),
    pages: {
        index: {
            title: '桜羽ありす - Alice Sakura',
        },
    },
};
