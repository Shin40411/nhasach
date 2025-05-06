import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

import { ProductShopDetailsView } from 'src/sections/detailsbook/view/product-shop-details-view';
import { useGetBook } from 'src/actions/book';

// ----------------------------------------------------------------------

const metadata = { title: `Chi tiết - ${CONFIG.appName}` };

export default function Page() {
  const { name = '', idBook = '' } = useParams();
  const { book, bookLoading, bookError } = useGetBook(idBook);
  return (
    <>
      <title>{metadata.title}</title>

      <ProductShopDetailsView product={book} loading={bookLoading} error={bookError} />
    </>
  );
}
