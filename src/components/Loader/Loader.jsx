import { ThreeDots } from 'react-loader-spinner';
import style from './loader.module.scss';

const Loader = () => {
  return (
    <div className={style.loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
