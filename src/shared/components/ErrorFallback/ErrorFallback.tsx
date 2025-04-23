import Button from "../Button";
import styles from "./ErrorFallback.module.scss";

export default function ErrorFallback() {
  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Упс... Что-то пошло не так! Попробуйте перезагрузить страницу!
      </p>
      <Button text="Обновить страницу" onClick={handleRefreshPage} />
    </div>
  );
}
