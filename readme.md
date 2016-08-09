# Инструкция

Необходимо установить зависимости композера и npm

Инструкция по развертыванию:
grunt dev:
 - соберет все tpl файлы c папки папки resources/assets/templates в javascript template (templates.js) в виде commonjs модуля и поместит в resources/assets/js/app
 - соберет все js файлы с папки resources/assets/js/app в бандл и поместит в public/js
 - сконкатенирует все css файлы в папке resources/assets/css и поместит в public/css
 - запустится таск watch


grunt stage: grunt dev, но без запуска таска watch

grunt prod:
 - соберет все tpl файлы c папки папки resources/assets/templates в javascript template (templates.js) в виде commonjs модуля и поместит в resources/assets/js/app
 - соберет все js файлы с папки resources/assets/js/app в бандл, минимизирует его и поместит в public/js
 - сконкатенирует все css файлы в папке resources/assets/css в один файл, минимизирует его и поместит в public/css