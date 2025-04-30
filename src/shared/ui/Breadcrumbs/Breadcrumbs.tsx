import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import styles from './Breadcrumbs.module.scss';

interface Path {
    title: string;
    url: string;
}

interface BreadcrumbsProps {
    title: string;
    paths: Path[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ title, paths }) => {
    return (
        <div className={styles.breadcrumbs}>
            <div className={styles.paths}>
                <Link to="/" className={styles.homeLink}>
                    <Home size={16} />
                </Link>
                <ChevronRight className={styles.separator} size={16} />
                {paths.map((path, index) => (
                    <React.Fragment key={path.url}>
                        <Link to={path.url} className={styles.path}>
                            {path.title}
                        </Link>
                        {index < paths.length - 1 && (
                            <ChevronRight className={styles.separator} size={16} />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <h1 className={styles.title}>{title}</h1>
        </div>
    );
};
