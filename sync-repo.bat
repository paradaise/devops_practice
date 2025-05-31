@echo off
cd /d "%~dp0"

:: Проверяем, есть ли изменения в удаленном репозитории
git fetch origin

:: Проверяем, нужен ли pull
git remote update
git status -uno | findstr "behind" > nul
if %errorlevel% == 0 (
    echo Обнаружены новые изменения на сервере. Выполняем pull...
    git pull origin main --rebase
    if %errorlevel% neq 0 (
        echo Ошибка при pull! Возможен конфликт. Решите его вручную.
        pause
        exit /b 1
    )
)

:: Проверяем, есть ли локальные изменения
git diff --quiet
if %errorlevel% == 1 (
    echo Обнаружены локальные изменения. Выполняем коммит...
    git add .
    git commit -m "Auto commit %date% %time%"
    
    :: Пытаемся отправить изменения
    echo Отправляем изменения на сервер...
    git push origin main
    if %errorlevel% neq 0 (
        echo Ошибка при push! Попытка выполнить pull с rebase...
        git pull --rebase origin main
        git push origin main
        if %errorlevel% neq 0 (
            echo Не удалось отправить изменения. Решите конфликты вручную.
            pause
            exit /b 1
        )
    )
) else (
    echo Нет локальных изменений для коммита.
)

echo Синхронизация успешно завершена!
pause