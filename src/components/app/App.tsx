import clsx from 'clsx';
import { useState, CSSProperties } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import styles from './App.module.scss';

export const App = () => {
	const [styleArticle, setStyleArticle] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--container-width': styleArticle.contentWidth.value,
					'--bg-color': styleArticle.backgroundColor.value,
					'--font-family': styleArticle.fontFamilyOption.value,
					'--font-size': styleArticle.fontSizeOption.value,
					'--font-color': styleArticle.fontColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={setStyleArticle} />
			<Article />
		</div>
	);
};