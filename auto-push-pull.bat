@echo off
cd /d "%~dp0"

:: Сначала получаем свежие изменения с сервера
git pull origin main
if %errorlevel% neq 0 (
    echo Ошибка при pull! Возможен конфликт. Решите его вручную.
    pause
    exit /b 1
)

:: Добавляем все изменения
git add .

:: Делаем коммит с текущей датой
git commit -m "Auto commit %date% %time%"

:: Отправляем изменения на GitHub
git push origin main
if %errorlevel% neq 0 (
    echo Ошибка при push! Проверьте подключение или права доступа.
    pause
    exit /b 1
)

echo Синхронизация успешно завершена!
pause