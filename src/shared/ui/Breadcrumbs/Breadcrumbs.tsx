import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
    title: string;
    paths?: Array<{
        title: string;
        url: string;
    }>;
}

export function Breadcrumbs({ title, paths }: BreadcrumbsProps) {
    return (
        <nav aria-label="Хлебные крошки">
            <div className={styles.container}>
                <Link className={styles.breadcrumbs} to="/">
                    Главная
                </Link>
                <span> / </span>
                {paths?.map((path, index) => (
                    <React.Fragment key={index}>
                        <Link className={styles.breadcrumbs} to={path.url}>
                            {path.title}
                        </Link>
                        <span> / </span>
                    </React.Fragment>
                ))}
                <span className={styles.title} aria-current="page">
                    {title}
                </span>
            </div>
        </nav>
    );
}
