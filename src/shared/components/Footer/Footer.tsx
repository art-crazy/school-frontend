import styles from './Footer.module.scss';

export default function Footer() {
    const socialLinks = [
        {
            name: "Telegram",
            url: "https://t.me/art_crazy",
            icon: "/telegram.svg",
            className: styles.tg
        },
        {
            name: "VK",
            url: "https://vk.com/artcrazy",
            icon: "/vk.svg",
            className: styles.vk
        }
    ];

    return (
        <footer className={styles.footer}>

            <div className={styles.left}>

                <div className={styles.block}>
                    <div>ИНН 420544415156</div>
                    <div>ОГРН 324420500063173</div>
                    <div>ОГРНИП 324420500063173</div>
                    <div>@2025 ИП Аржанников Михаил Алексеевич</div>
                </div>

                <div className={styles.block}>
                    <a
                        className={styles.flex}
                        href={'/policy'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p>Политика конфиденциальности</p>
                    </a>
                    <a
                        className={styles.flex}
                        href={'/oferta'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p>Оферта</p>
                    </a>
                </div>


            </div>

            <div className={styles.block}>
                <div className={styles.contacts}>Для связи</div>
                <ul className={styles.block__list}>
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            className={styles.flex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>{link.name}</p>
                            <img className={link.className} src={link.icon} alt={link.name.toLowerCase()}/>
                        </a>
                    ))}
                </ul>

            </div>
        </footer>
    );
}
