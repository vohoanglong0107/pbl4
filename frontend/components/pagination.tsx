import { Pagination } from "antd"
import styles from "../styles/Home.module.css"

const AppPagination = ({pageNumber, paginate}) => {
    
    return (
        <Pagination className={styles.pagination} defaultCurrent={1} size="small" total={pageNumber*10} onChange={(curPage) => paginate(curPage)}  />
    );
}
export default AppPagination