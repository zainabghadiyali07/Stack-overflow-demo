import { Vortex } from "react-loader-spinner";
import styles from './Loader.module.css'

const Loader = ({isLoading}) => {

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </div>
  )
}

export default Loader;
