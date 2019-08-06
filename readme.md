git commit -a --amend
Ключ --amend (улучшить, в переводе с английского) позволяет добавить к последнему коммиту новые изменения.

maps:
DuneHack_Rebuild_r80b
http://romhacking.ru/news/dunehack_rebuild_r80b_smd/2015-07-26-3122

# problems:
- при переходе с вкладки игры на другую и обратно, возникает ошибка steps > 10
  в функции update() в файле main.js
    возможные решения:
    1. заставить браузер обсчитывать цикл, когда переходишь на другую вкладку
    2. перезагружать страницу при возвращении с другой вкладки
    3. когда ставлю на паузу перед переходом на другую вкладку "enter" ошибка не возникает, значит можно автоматически ставить игру на паузу!
    
- иногда в консоли видна ошибка загрузки gameMap


# TODO:

- load binary files(map files)
- render map, camera class
- camera (x, y) must be in pixels
- json mast loaded earlier than images because json.parse can throw error
