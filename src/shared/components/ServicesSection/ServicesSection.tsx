import styles from './ServicesSection.module.scss';
import {SectionHeader} from "@/shared/components/SectionHeader/SectionHeader.tsx";

const ServicesSection = () => {


    const services = [
        {
            title: 'Плюсы',
            list: [
                {
                    title: 'Тариф с нуля',
                    content: '',
                    img: '',
                },
                {
                    title: 'Тариф с опытом до сеньора (повышение квалификации)',
                    content: '',
                    img: '',
                },
                {
                    title: '',
                    content: '',
                    img: '',
                },
            ],
        },
        {
            title: 'Минусы',
            list: [
                {
                    title: 'Не веду часовые консультации',
                    content: 'Потому что леня.',
                    img: '',
                },
                {
                    title: 'Не веду потоки',
                    content: 'Потому что ко мне не приходят учиться.',
                    img: '',
                },
            ],
        },

    ]

    return (
        <div className={`${styles.container} ${styles.gap}`}>

            <SectionHeader title={'Услуги'} id={'services'}/>

            <ul className={styles.list}>
                {services.map((obj, index) => (
                    <li key={index}
                        className={`${styles.block} ${styles.block__size__services}`}>
                        {obj.list.map((obj, index) => (
                            <div key={index}
                                 className={styles.services}>
                                <h3 className={styles.h3}>{obj.title}</h3>
                                <p className={styles.p__content}>{obj.content}</p>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesSection;
