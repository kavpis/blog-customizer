declare module '*.svg' {
	import React = require('react');
	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	const src: string;

	// Экспорт значений модуля
	export { ReactComponent };
	export default src;
  }

  // Добавляем поддержку форматов и модулей
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.json';
  declare module '*.module.css';
  declare module '*.module.scss';
  declare module '*.module.sass';
