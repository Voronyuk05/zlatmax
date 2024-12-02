import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IProduct } from '@/types/apiTypes/products.types';
import { ProductsList } from '../ProductsList/ProductsList';
import styles from './ProductsPagination.module.scss'

interface IPaginationEvent extends React.MouseEvent {
  selected: number
}

export function ProductsPaginatedItems({ itemsPerPage, data }: {itemsPerPage: number, data: IProduct[]}) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const dataLength = data?.length
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = dataLength ? Math.ceil(dataLength / itemsPerPage) : 1

  useEffect(() => {

  })

  const handlePageClick = (event: IPaginationEvent) => {
    const newOffset = dataLength ? (event.selected * itemsPerPage) % dataLength : 1
    setItemOffset(newOffset);
  };
  
  if (currentItems) 
  return (
    <div className={styles.paginated_products}>
      <ProductsList data={currentItems} />
      <ReactPaginate
        className={`${data.length <= 12 ? styles.hidden : ''} ${styles.pagintaion}`}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        disabledClassName={styles.disabled}
        activeLinkClassName={styles.active}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
