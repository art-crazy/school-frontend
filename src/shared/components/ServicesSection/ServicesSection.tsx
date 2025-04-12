import styles from './ServicesSection.module.scss';
import { SectionHeader } from "@/shared/components/SectionHeader/SectionHeader.tsx";
import {
    FaAdjust,
    FaBullseye,
    FaChartLine,
    FaClock,
    FaUsers,
    FaUserTie,
    FaInfoCircle,
    FaPlusCircle,
    FaMinusCircle
} from "react-icons/fa";

const ServicesSection = () => {
    const pros = [
        {
            title: 'Тариф с нуля',
            content: 'Полный путь от основ до уверенного владения React/Next.js',
            icon: null,
            price: {
                upfront: '15 000₽',
                offer: '120% от первой зарплаты',
                offerTooltip: 'Оплачивается после фактического получения заработной платы.'
            },
            points: [
                { icon: <FaChartLine className={styles.smallIcon} />, text: 'Пошаговое обучение' },
                { icon: <FaAdjust className={styles.smallIcon} />, text: 'Фундаментальные знания' },
                { icon: <FaBullseye className={styles.smallIcon} />, text: 'Гарантированное трудоустройство' }
            ],
            img: '',
        },
        {
            title: 'Тариф с опытом',
            content: 'Продвинутые техники и архитектурные решения',
            icon: null,
            price: {
                upfront: '15 000₽',
                offer: '100% от первой зарплаты',
                offerTooltip: 'Оплачивается после фактического получения заработной платы.'
            },
            points: [
                { icon: <FaUserTie className={styles.smallIcon} />, text: 'Профразвитие' },
                { icon: <FaBullseye className={styles.smallIcon} />, text: 'Решение сложных задач' },
                { icon: <FaChartLine className={styles.smallIcon} />, text: 'Подготовка к senior-позиции' }
            ],
            img: '',
        },
    ];

    const cons = [
        {
            title: 'Не веду часовые консультации',
            icon: <FaClock className={styles.icon} />,
            content: 'Мой подход - это последовательное погружение с практической отработкой.',
            points: [
                {
                    icon: <FaChartLine className={styles.smallIcon} />,
                    text: 'Нет поверхностного разбора'
                },
                {
                    icon: <FaAdjust className={styles.smallIcon} />,
                    text: 'Невозможно глубоко проработать сложные вопросы за час'
                }
            ],
            img: '',
        },
        {
            title: 'Не веду потоки',
            icon: <FaUsers className={styles.icon} />,
            content: 'Индивидуальный подход эффективнее группового обучения',
            points: [
                {
                    icon: <FaUserTie className={styles.smallIcon} />,
                    text: 'Нет шаблонных решений "для всех"'
                },
                {
                    icon: <FaBullseye className={styles.smallIcon} />,
                    text: 'Не будет "усредненной" программы без учета твоего уровня'
                }
            ],
            img: '',
        },
    ];

    return (
        <div className={styles.container}>
            <SectionHeader title={'Услуги'} id={'services'}/>

            <div className={styles.content}>
                {/* Блок Плюсов */}
                <div className={`${styles.block} ${styles.prosBlock}`}>
                    <div className={styles.sectionHeader}>
                        <FaPlusCircle className={styles.sectionIcon} />
                    </div>
                    <div className={styles.itemsContainer}>
                        {pros.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                                <p className={styles.itemContent}>{item.content}</p>

                                {item.price && (
                                    <div className={styles.priceBlock}>
                                        <div className={styles.priceRow}>
                                            <span>Предоплата:</span>
                                            <strong>{item.price.upfront}</strong>
                                        </div>
                                        <div className={styles.priceRow}>
                                            <span>После трудоустройства:</span>
                                            <div className={styles.offer}>
                                                <strong>{item.price.offer}</strong>
                                                {item.price.offerTooltip && (
                                                    <div className={styles.tooltip}>
                                                        <FaInfoCircle />
                                                        <span className={styles.tooltipText}>{item.price.offerTooltip}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <ul className={styles.pointsList}>
                                    {item.points.map((point, i) => (
                                        <li key={i} className={styles.point}>
                                            {point.icon}
                                            <span>{point.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Блок Минусов */}
                <div className={`${styles.block} ${styles.consBlock}`}>
                    <div className={styles.sectionHeader}>
                        <FaMinusCircle className={styles.sectionIcon} />
                    </div>
                    <div className={styles.itemsContainer}>
                        {cons.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    {item.icon}
                                    <h3 className={styles.itemTitle}>{item.title}</h3>
                                </div>
                                <p className={styles.itemContent}>{item.content}</p>
                                <ul className={styles.pointsList}>
                                    {item.points.map((point, i) => (
                                        <li key={i} className={styles.point}>
                                            {point.icon}
                                            <span>{point.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
