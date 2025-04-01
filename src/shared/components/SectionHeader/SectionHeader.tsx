import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
    title: string;
    id?: string;
}

export function SectionHeader({title, id}: SectionHeaderProps) {
    return (
        <div className={styles.h2__container}>
            <div className={styles.border}></div>
            <h2 className={styles.h2} id={id}>{title}</h2>
            <div className={styles.border}></div>
        </div>
    );
}
