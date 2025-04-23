import styles from "./ExampleCode.module.scss";
import React from "react";

export default function ExampleCode({code}: {code: string}) {
    return (
        <div className={styles.codeSection}>
            <div className={styles.codeContainer}>
                <h3 className={styles.codeHeader}>Реализация</h3>
                <pre className={styles.codeBlock}>
                        <code>{code}</code>
                    </pre>
            </div>
        </div>
    )
}
