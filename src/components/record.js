import styles from "../styles/components/record.module.scss";

const Record = ({ label, handleClick1, handleClick2 }) => {
  return (
    <label>
      {label}:{" "}
      <div className={styles.data__buttonNewWorker}>
        <button
          className={styles.buttonNewWorker__buton1}
          onClick={handleClick1}
        >
          Nuevo Retiro
        </button>
        <button
          className={styles.buttonNewWorker__buton2}
          onClick={handleClick2}
        >
          Nuevo Ingreso
        </button>
      </div>
    </label>
  );
};

export default Record;
