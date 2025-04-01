import styles from './OfferAgreement.module.scss';

export default function OfferAgreement() {
    return (
        <div className={styles.offerAgreement}>
            <h1 className={styles.title}>Договор публичной оферты</h1>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Общие положения</h2>
                <p className={styles.sectionContent}>
                    1.1. Настоящий Договор является официальным предложением (публичной офертой) ИП Аржанников Михаил Алексеевич (далее — Исполнитель) заключить договор на оказание услуг на условиях, изложенных ниже.
                    <br />
                    1.2. В соответствии с пунктом 2 статьи 437 Гражданского кодекса РФ, в случае принятия изложенных ниже условий и оплаты услуг, физическое или юридическое лицо, производящее акцепт этой оферты, становится Заказчиком.
                    <br />
                    1.3. Акцептом оферты считается совершение Заказчиком действий, направленных на оплату услуг Исполнителя, а также регистрация на сайте https://mentor-hub.ru/ и использование его функционала.
                </p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Предмет договора</h2>
                <p className={styles.sectionContent}>
                    2.1. Исполнитель обязуется оказать Заказчику услуги, связанные с [краткое описание услуг], а Заказчик обязуется оплатить эти услуги на условиях, указанных в настоящем Договоре.
                </p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Реквизиты Исполнителя</h2>
                <p className={styles.sectionContent}>
                    ИП Аржанников Михаил Алексеевич
                    <br />
                    ИНН: 420544415156
                    <br />
                    ОГРНИП: 324420500063173
                    <br />
                    Электронная почта: <a href="mailto:artcrazy.mail@gmail.com" className={styles.link}>artcrazy.mail@gmail.com</a>
                    <br />
                    Сайт: <a href="https://mentor-hub.ru/" className={styles.link}>https://mentor-hub.ru/</a>
                </p>
            </div>
        </div>
    );
};
