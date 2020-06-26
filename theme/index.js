const { path, logger } = require('@vuepress/shared-utils'),
    moment = require('moment');

moment.locale('zh-cn')

/**
 * Theme API.
 *
 * @param  {Object} options .vuepress/config.js -> themeConfig
 * @param  {Object} ctx     https://vuepress.vuejs.org/zh/plugin/context-api.html#ctx-isprod
 * @return {Object}         [description]
 */
module.exports = (options, ctx) => {
    const { themeConfig, siteConfig } = ctx

    return {
        alias() {
            // resolve algolia
            return {
                '@SearchBox': path.resolve(__dirname, 'components/SearchBox/index.vue')
            }
        },
        // 使用到的插件
        plugins: [
            '@vuepress/active-header-links',
            '@vuepress/search',
            // ['vuepress-plugin-yuque', {
            //     html:true,
            //     authToken: 'A4of6TlXsYRw6oOZm0iwTc1CN4XDOqqd81qxzwBR',
            //     repoUrl: 'https://www.yuque.com/roylau/blog',
            //   }],
            '@vuepress/plugin-nprogress',
            [
                '@vuepress/last-updated',
                { transformer: (timestamp, lang) => { return moment(timestamp).format("YYYY MMMM Do, a h:mm:ss") } }
            ],
            // path.resolve(__dirname, 'plugins/pagination/index.js'),
            ['container', { type: 'tip' }],
            ['container', { type: 'warning' }],
            ['container', { type: 'danger' }],
            ['container', {
                type: 'details',
                before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
                after: () => '</details>\n'
            }],
        ],
        // 修改 $page 对象。每个页面都会执行一次
        extendPageData($page) {
            const {
                _filePath, // 源文件的绝对路径
                _computed, // 在构建期访问全局的计算属性，如：_computed.$localePath.
                _content, // 源文件的原始内容字符串
                _strippedContent, // 源文件剔除掉 frontmatter 的内容字符串
                key, // 页面唯一的 hash key
                lastUpdated, // 最后更新时间，需要 last-updated 插件
                frontmatter, // 页面的 frontmatter 对象
                regularPath, // 当前页面遵循文件层次结构的默认链接
                path, // 当前页面的实际链接（在 permalink 不存在时，使用 regularPath ）
                title
            } = $page
            // logger.info($page)

            // 格式化文章 date
            $page.frontmatter.date = frontmatter.date && moment(frontmatter.date).format("YYYY MMMM Do, a h:mm:ss")

        },
        ready() {
            // const { themeConfig, siteConfig, pages } = ctx
            // console.log(pages)
        },
        chainMarkdown(config) {
            // config
            //     // reference: https://www.npmjs.com/package/markdown-it-checkbox
            //     .plugin('checkbox')
            //     .use(require('markdown-it-checkbox'))
            //     // Move up one level, like .end() in jQuery.
            //     .end()
        }
    }
}