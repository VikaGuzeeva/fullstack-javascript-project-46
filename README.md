# Вычислитель отличий (JS)

[![hexlet-check](https://github.com/VikaGuzeeva/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/VikaGuzeeva/fullstack-javascript-project-46/actions)

Узнаете, как создавать cli приложения, парсить и форматировать данные в json, yaml. Научитесь проектировать архитектуру приложений. А также писать unit-тесты.

Учебный проект Хекслета: https://ru.hexlet.io/programs/fullstack-javascript
Как это должно работать: https://asciinema.org/a/Pe6QypnLEmFWssNAjCOJN1iii

## Стек

- JavaScript

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/VikaGuzeeva/fullstack-javascript-project-46.git
cd fullstack-javascript-project-46
```

2. Установите зависимости:
```bash
npm install
```

## Использование

Чтобы увидеть описание аргументов и опций, запустите:
```bash
gendiff -h
```

Для сравнения двух JSON-файлов выполните:
```bash
gendiff __fixtures__/file1.json __fixtures__/file2.json
```

Для сравнения двух YAML-файлов выполните:
```bash
gendiff __fixtures__/file1.yml __fixtures__/file2.yml
```

Результат работы программы выглядит так:
```text
{
    common: {
        + follow: false
        setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
            key5: value5
        }
        setting6: {
            key: value
            + ops: vops
            doge: {
                - wow: 
                + wow: so much
            }
        }
    }
    group1: {
        baz: bas
        foo: bar
        - nest: {
            key: value
        }
        + nest: str
    }
    - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
    + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

Демонстрация:
[asciinema](https://asciinema.org/a/AQjFb9xYKFDFbrNt)

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
