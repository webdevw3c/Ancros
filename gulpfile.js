// Импорт основного модуля
import gulp from "gulp";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";
// Импорт путей
import { path } from "./gulp/config/settings.js";

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	isWebP: !process.argv.includes('--nowebp'),
	isFontsReW: process.argv.includes('--rewrite'),
	gulp: gulp,
	path: path,
	plugins: plugins
}

// Импорт задач
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { css } from "./gulp/tasks/css.js";
import { js } from "./gulp/tasks/js.js";
import { jsDev } from "./gulp/tasks/js-dev.js";
import { images } from "./gulp/tasks/images.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { zip } from "./gulp/tasks/zip.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { otfToTtf, ttfToWoff, fonstStyle } from "./gulp/tasks/fonts.js";

// Последовательная обработака шрифтов
const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fonstStyle);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const devTasks = gulp.parallel(fonts);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const buildTasks = gulp.series(fonts, jsDev, js, gulp.parallel(html, css, images));

// Экспорт задач
export { html }
export { css }
export { js }
export { jsDev }
export { images }
export { fonts }
export { sprite }
export { ftp }
export { zip }

// Построение сценариев выполнения задач
const development = gulp.series(devTasks);
const build = gulp.series(buildTasks);
const deployFTP = gulp.series(buildTasks, ftp);
const deployZIP = gulp.series(buildTasks, zip);

// Экспорт сценариев
export { development }
export { build }
export { deployFTP }
export { deployZIP }

// Выполнение сценария по умолчанию
gulp.task('default', development);






