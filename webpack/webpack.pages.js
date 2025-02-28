// Подключаем необходимые плагины и модули для настройки вебпака
const path = require('path'); // Модуль для работы с путями файловой системы
const webpack = require('webpack');
const HTMLWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Определяем режим сборки приложения
const production = process.env.NODE_ENV === 'pages';

// Экспортируем конфигурацию вебпака
module.exports = {
  mode: 'production', // Режим сборки
  devtool: false, // Отключение sourcemaps для оптимизации производительности
  entry: path.resolve(__dirname, '..', './src/index.tsx'), // Точка входа приложения
  output: {
    path: path.resolve(__dirname, '..', './dist'), // Директория вывода результатов сборки
    filename: production ? '[name].[contenthash].js' : '[name].js', // Имя выходного файла
    publicPath: '', // Базовый путь для ресурсов
  },
  module: {
    rules: [
      // Настройка обработки TypeScript/JSX файлов
      {
        test: /\.[tj]sx?$/, // Регулярное выражение для поиска файлов .ts, .tsx, .js, .jsx
        use: [{ loader: 'ts-loader' }], // Используем ts-loader для транспиляции
        exclude: /node_modules/, // Исключаем директорию node_modules
      },
      // Обработка изображений
      {
        test: /\.(png|jpg|gif|webp)$/, // Файлы изображений
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]', // Путь сохранения изображений
        },
      },
      // Обработка шрифтов
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/, // Файлы шрифтов
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]', // Путь сохранения шрифтов
        },
      },
      // Обработка SVG-изображений
      {
        test: /\.svg$/i, // SVG-файлы
        issuer: /\.[jt]sx?$/, // Применяется только к компонентам JSX/TSX
        use: ['@svgr/webpack', 'url-loader'], // Используемые загрузчики
      },
      // Настройка обработки CSS/SCSS/SASS файлов
      {
        test: /\.(sa|sc|c)ss$/, // Файлы стилей
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader', // Выбор загрузчика в зависимости от режима
          {
            loader: 'css-loader', // Загрузчик CSS
            options: {
              modules: {
                mode: 'local', // Локальный режим модулей
                localIdentName: '[name]__[local]__[hash:base64:5]', // Правило генерации классов
                auto: /\.module\.\w+$/i, // Автоматическое применение модулей
              },
              importLoaders: 2, // Количество дополнительных загрузчиков перед css-loader
            },
          },
          'postcss-loader', // Загрузчик PostCSS
          {
            loader: 'sass-loader', // Загрузчик SASS/SCSS
            options: {
              sourceMap: true, // Включение карты источников
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'], // Расширения файлов для автоматического разрешения
    alias: {
      fonts: path.resolve(__dirname, '..', './src/fonts'), // Алиас для директории шрифтов
      src: path.resolve(__dirname, '..', './src'), // Алиас для корневой директории исходного кода
      components: path.resolve(__dirname, '..', './src/components'), // Алиас для компонентов
    },
  },
  plugins: [
    // Генерация HTML-файла на основе шаблона
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, '..', './public/index.html'), // Путь к шаблону HTML
    }),
    // Очистка выходной директории перед сборкой
    new CleanWebpackPlugin(),
    // Извлечение CSS в отдельные файлы
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].css', // Имя выходного файла CSS
    }),
    // Настройка переменных окружения
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // Значение по умолчанию для NODE_ENV
    }),
  ],
};